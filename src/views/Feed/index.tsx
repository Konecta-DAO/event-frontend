import { ArrowBackIosNew, ArrowForwardIos, Search } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material'
import FeedCard from 'components/FeedCard'
import Filters from 'components/Modals/Filters'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EventCategory,
  FeedTabs,
  FeedTabsConfig,
  FeedTabsSubCategories,
  FeedTabsType,
} from 'utils/values'

import {
  FeedResponsePayload,
  PaginatedScanCursor,
} from 'candid/ts/konecta.did'
import FilterEventCreateButtonGroup from 'components/FilterCreateEventButtonGroup'
import Spinner from 'components/Spinner'
import _ from 'lodash'
import {
  setFeedSearchText,
  setFeedSelectedTab,
  triggerFeedSearch,
} from 'reduxStore/event/eventAction'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import { RootState } from 'reduxStore/store'
import konectaActorServiceInstance, {
  FEED_TYPE,
} from 'services/konectaService'
import styles from './style.module.css'
import ledgerActorServiceInstance from 'services/ledgerService'
import { setWalletArr } from 'reduxStore/auth/authAction'
import { Principal } from '@dfinity/principal'

interface TabPanelProps {
  children?: React.ReactNode
  isVisible: boolean
  value: number
  index: number
}

interface SubCategoryEventsProps {
  subCategoryValue: FeedTabsSubCategories
  tabValue: FeedTabsType
  isLast: boolean
  feedType: FEED_TYPE
}

interface FeedSearchInputProps {
  selectedTab: FeedTabsType
}

const selectedCategoriesSelector = (state: RootState): EventCategory[] =>
  state.event.selectedCategories
const userProfileSelector = (state: RootState) => state.user.userProfile
const searchTextSelector = (state: RootState) => state.event.feedSearchText
const batchSize = 6

// --- UPDATED COMPONENT START ---

const SubCategoryEvents = (props: SubCategoryEventsProps) => {
  const { subCategoryValue, tabValue, isLast, feedType } = props
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const [allEvents, setAllEvents] = useState<FeedResponsePayload[] | undefined>(
    undefined,
  )
  const [visibleEventsStartIndex, setVisibleEventsStartIndex] =
    useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [nextCursor, setNextCursor] = useState<PaginatedScanCursor | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const categories = useAppSelector(selectedCategoriesSelector)
  const userProfile = useAppSelector(userProfileSelector)
  const feedSearchText = useAppSelector(searchTextSelector)
  const feedSearchTrigger = useAppSelector(
    (state) => state.event.feedSearchTrigger,
  )
  const navigate = useNavigate()

  const tabConfig = FeedTabsConfig[tabValue]
  const subCategory = tabConfig.subcategories.find(
    (sc) => sc.value === subCategoryValue,
  )!

  const getPayloadConfig = useCallback(() => {
    const baseConfig = {
      isFuture: true,
      eventType: null as string | null,
      status: 'Created' as string | null,
      userId: null as Principal | null,
    }

    switch (feedType) {
      case 'FUTURE_OFFERS':
        return { ...baseConfig, eventType: 'Offer' }
      case 'PAST_OFFERS':
        return { ...baseConfig, isFuture: false, eventType: 'Offer' }
      case 'FUTURE_REQUESTS':
        return { ...baseConfig, eventType: 'Request' }
      case 'PAST_REQUESTS':
        return { ...baseConfig, isFuture: false, eventType: 'Request' }
      // case 'MY_SERVICE_OFFERS':
      //   return { ...baseConfig, eventType: 'Offer', userId: Principal.fromText(userProfile.principalId) }
      default:
        return baseConfig
    }
  }, [feedType])

  const fetchEvents = useCallback(async (cursor: PaginatedScanCursor | null) => {
    setIsLoading(true)
    if (!cursor) {
      setAllEvents(undefined)
    }

    const config = getPayloadConfig()
    const categoryStrings: string[] = categories.map((cat) => cat)

    const payload: any = {
      currentTimestamp: BigInt(Date.now() * 1_000_000),
      isFuture: config.isFuture,
      limit: BigInt(batchSize),
      recordingType: [],
      status: config.status ? [config.status] : [],
      userId: config.userId ? [config.userId] : [],
      categories: categoryStrings.length > 0 ? [categoryStrings] : [],
      cursor: cursor ? [cursor] : [],
      eventType: [],
    }

    if (config.eventType === 'Offer') {
      payload.eventType = ['Offer']
    } else if (config.eventType === 'Request') {
      payload.eventType = ['Request']
    }

    try {
      const response = await konectaActorServiceInstance.getPaginatedFeed(
        payload,
      )

      if ('ok' in response) {
        if (cursor) {
          setAllEvents((prev) =>
            _.uniqBy([...(prev ?? []), ...response.ok.items], 'event_id'),
          )
        } else {
          setAllEvents(response.ok.items)
        }
        setHasMore(response.ok.hasMore)
        setNextCursor(response.ok.nextCursor[0] ?? null)
      } else {
        console.error('Failed to fetch events:', response.err)
        setAllEvents([])
        setHasMore(false)
      }
    } catch (error) {
      console.error('An exception occurred while fetching events:', error)
      setAllEvents([])
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [getPayloadConfig, categories])

  useEffect(() => {
    const enrichEventsWithUserData = async () => {
      if (!allEvents || allEvents.length === 0) {
        return
      }

      // 1. Find events where userData is incomplete (e.g., firstname is missing)
      const eventsToEnrich = allEvents.filter(event => !event.userData.firstname);
      if (eventsToEnrich.length === 0) {
        return; // All events are already enriched, no need to fetch.
      }

      // 2. Get a list of unique principal IDs to fetch
      const uniquePrincipalIds = _.uniq(eventsToEnrich.map(event => event.user_id));

      try {
        // 3. Fetch all required user profiles concurrently
        const userProfilePromises = uniquePrincipalIds.map(pid =>
          konectaActorServiceInstance.getUserDetailsByCompositeQuery(pid)
        );
        const userProfiles = await Promise.all(userProfilePromises);

        // 4. Create a map for easy lookup (principal_id -> full user profile)
        const userProfileMap = _.keyBy(userProfiles.filter(Boolean), 'principal_id');

        // 5. Update the state with the enriched event data
        if (Object.keys(userProfileMap).length > 0) {
          setAllEvents(currentEvents =>
            currentEvents?.map(event =>
              userProfileMap[event.user_id]
                ? { ...event, userData: userProfileMap[event.user_id] }
                : event
            )
          );
        }
      } catch (error) {
        console.error("Failed to enrich events with user data:", error);
      }
    };

    enrichEventsWithUserData();
  }, [allEvents]); // This effect runs whenever the list of events changes.

  useEffect(() => {
    if (userProfile) {
      fetchEvents(null)
    }
  }, [userProfile, fetchEvents, feedSearchText, feedSearchTrigger])

  const handleLoadNextPage = useCallback(() => {
    if (!isLoading && hasMore && nextCursor) {
      fetchEvents(nextCursor)
    }
  }, [isLoading, hasMore, nextCursor, fetchEvents])

  if (!userProfile) {
    return (
      <div className="relative flex justify-center items-center h-[160px]">
        <Spinner size="small" />
      </div>
    );
  }

  if (typeof allEvents === 'undefined') {
    return (
      <div
        className={
          !isLast ? 'border-b-[1.5px] border-b-[#FFFFFF1A]' : undefined
        }
      >
        <div className="flex justify-between mb-[24px]">
          <h1 className="font-[500] text-[28px] text-white max-md:text-[20px]">
            {subCategory.label}
          </h1>
        </div>
        <div className="relative flex justify-center items-center h-[160px]">
          <Spinner size="small" />
        </div>
      </div>
    )
  }

  const visibleEvents = isonTabletOrMobile
    ? allEvents
    : _.slice(
      allEvents,
      visibleEventsStartIndex,
      visibleEventsStartIndex + batchSize,
    )

  const isCurrentlyOnLastPage =
    visibleEventsStartIndex + batchSize >= allEvents.length

  const onNextPress = async () => {
    if (isCurrentlyOnLastPage && hasMore) {
      await handleLoadNextPage()
    }
    setVisibleEventsStartIndex((prev) => prev + batchSize)
  }

  const onPrevPress = () => {
    setVisibleEventsStartIndex((prev) => Math.max(0, prev - batchSize))
  }

  const isPrevDisabled = visibleEventsStartIndex === 0
  const isNextDisabled = !hasMore && isCurrentlyOnLastPage

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement
    const rightEdge =
      Math.abs(target.scrollWidth - target.scrollLeft - target.offsetWidth) < 56

    if (rightEdge && !isLoading && hasMore) {
      handleLoadNextPage()
    }
  }

  return (
    <div
      className={!isLast ? 'border-b-[1.5px] border-b-[#FFFFFF1A]' : undefined}
    >
      <div className="flex justify-between mb-[24px]">
        <h1 className="font-[500] text-[28px] text-white max-md:text-[20px]">
          {subCategory.label}
        </h1>
        {visibleEvents.length > 0 && !isonTabletOrMobile ? (
          <div className="flex justify-between gap-[10px] text-white">
            <div className="flex gap-[8px]">
              <button
                className="btn-icon btn-secondary"
                onClick={onPrevPress}
                disabled={isPrevDisabled}
              >
                <ArrowBackIosNew />
              </button>
              <button
                className="btn-icon btn-secondary"
                onClick={onNextPress}
                disabled={isNextDisabled || isLoading}
              >
                {isLoading && isCurrentlyOnLastPage ? (
                  <Spinner size="small" />
                ) : (
                  <ArrowForwardIos />
                )}
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {allEvents.length === 0 ? (
        <div className="w-full h-[120px] text-[16px] text-center text-white md:text-[20px] align-middle">
          No Events
        </div>
      ) : (
        <div
          className={
            isonTabletOrMobile
              ? 'flex-row flex overflow-x-scroll gap-[20px] pb-[40px] md:pb-[68px]'
              : 'grid gap-[24px] grid-cols-[repeat(auto-fit,420px)] pb-[40px] md:pb-[68px]'
          }
          onScroll={isonTabletOrMobile ? handleScroll : undefined}
        >
          {visibleEvents.map((event, index) => (
            <FeedCard
              key={`${event.event_id}-${index}`}
              onClick={() => navigate(`/event/${event.event_id}`)}
              event={event}
            />
          ))}
          {isonTabletOrMobile && isLoading && (
            <div className="flex justify-center items-center min-w-[100px]">
              <Spinner size="small" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, isVisible, ...other } = props
  const tabConfig = FeedTabs[value]

  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isVisible && (
        <div className="flex flex-col gap-[20px] md:gap-[40px] mt-[20px] md:mt-[40px]">
          {tabConfig.subcategories.map((subCategory, index) => {
            const isLast = tabConfig.subcategories.length - 1 === index

            return (
              <SubCategoryEvents
                key={`tab:${tabConfig.value}:category:${subCategory.value}`}
                subCategoryValue={subCategory.value}
                tabValue={tabConfig.value}
                isLast={isLast}
                feedType={subCategory.feedType}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

function a11yProps(idx: number) {
  return {
    id: `simple-tab-${idx}`,
    'aria-controls': `simple-tabpanel-${idx}`,
  }
}

const FeedSearchInput = (props: FeedSearchInputProps) => {
  const feedSearchText = useAppSelector(searchTextSelector)
  const dispatch = useAppDispatch()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setFeedSearchText(e.target.value))
  }

  const triggerSearch = () => {
    dispatch(triggerFeedSearch())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerSearch()
    }
  }

  return (
    <Input
      id="input-with-icon-adornment"
      startAdornment={
        <InputAdornment position="start" className="!text-white">
          <IconButton onClick={triggerSearch}>
            <Search
              sx={{
                width: { xs: '20px' },
                height: { xs: '20px' },
                color: 'white',
              }}
            />
          </IconButton>
        </InputAdornment>
      }
      className="bg-[#FFFFFF0F] p-[12px] rounded-[8px] w-full !text-white text-[16px] max-md:!text-[12px] outline-none"
      placeholder="Search"
      value={feedSearchText}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

const useSetWallerArr = () => {
  const principalId = useAppSelector((state) => state.auth.pid)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadWalletArr = async () => {
      if (principalId) {
        const walletArr = await ledgerActorServiceInstance.getAllAccountBalance(
          principalId,
        )
        dispatch(setWalletArr(walletArr))
      }
    }
    loadWalletArr()
  }, [dispatch, principalId])

  return null
}

export default function Feed() {
  const [filtersShow, setFiltersShow] = useState(false)
  const selectedTab = useAppSelector((state) => {
    return state.event.feedSelectedTab
  })

  const tabs = FeedTabs.map((tb) => tb.value)
  const [value, setValue] = useState<number>(0)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const dispatch = useAppDispatch()

  useSetWallerArr()

  const handleFiltersClose = () => {
    setFiltersShow(false)
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    dispatch(
      setFeedSelectedTab(newValue === 0 ? 'SERVICE_REQUEST' : 'SERVICE_OFFERS'),
    )
  }

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <div className="flex max-md:flex-col flex-1 gap-[32px] max-md:gap-[4px] w-[520px] max-md:w-full">
          <h1 className="font-[700] text-[36px] text-white max-md:text-[20px]">
            Feed
          </h1>
          <FeedSearchInput selectedTab={selectedTab} />
        </div>
        {!isonTabletOrMobile && <FilterEventCreateButtonGroup />}
      </div>
      {!isonTabletOrMobile && (
        <div className="bg-[#363548] mx-[-32px] mb-[40px] h-[1.5px]"></div>
      )}
      <div className="flex flex-col">
        <Box sx={{ borderBottom: 1, borderColor: '#363548' }}>
          <Tabs
            value={selectedTab === 'SERVICE_REQUEST' ? 0 : 1}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ fontSize: { xs: '14px' } }}
          >
            {tabs.map((tabItem, idx) => (
              <Tab
                label={FeedTabsConfig[tabItem].label}
                {...a11yProps(idx)}
                className="!text-[#A6A5AE]"
                key={tabItem}
              />
            ))}
          </Tabs>
        </Box>
        {tabs.map((tabItem, idx) => (
          <CustomTabPanel
            value={value}
            isVisible={idx === value}
            index={idx}
            key={idx}
          />
        ))}
      </div>
      <Filters isOpen={filtersShow} handleClose={handleFiltersClose} />
    </div>
  )
}