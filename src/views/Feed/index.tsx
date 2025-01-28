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
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FeedTabs,
  FeedTabsConfig,
  FeedTabsSubCategories,
  FeedTabsType,
} from 'utils/values'

import { FeedResponsePayload } from 'candid/ts/konecta.did'
import FilterEventCreateButtonGroup from 'components/FilterCreateEventButtonGroup'
import Spinner from 'components/Spinner'
import _ from 'lodash'
import { setIsAppLoading } from 'reduxStore/appState/appStateAction'
import {
  setFeedSearchText,
  setFeedSelectedTab,
} from 'reduxStore/event/eventAction'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import { RootState } from 'reduxStore/store'
import konectaActorServiceInstance, {
  FEED_TYPE,
  LoadMoreEventFeedCallback,
} from 'services/konectaService'
import styles from './style.module.css'
import ledgerActorServiceInstance from 'services/ledgerService'
import { setWalletArr } from 'reduxStore/auth/authAction'
import { UserPayload } from 'entity/UserModel'

interface TabPanelProps {
  children?: React.ReactNode
  isVisible: boolean
  value: number
  index: number
  // allEvents: undefined | FeedResponsePayload[]
  // setAllEvents: React.Dispatch<
  //   React.SetStateAction<undefined | FeedResponsePayload[]>
  // >
}

interface SubCategoryEventsProps {
  subCategoryValue: FeedTabsSubCategories
  tabValue: FeedTabsType
  isLast: boolean
  feedType: FEED_TYPE
  // allEvents: undefined | FeedResponsePayload[]
  // setAllEvents: React.Dispatch<
  //   React.SetStateAction<undefined | FeedResponsePayload[]>
  // >
}

interface FeedSearchInputProps {
  selectedTab: FeedTabsType
  setAllEvents: React.Dispatch<
    React.SetStateAction<undefined | FeedResponsePayload[]>
  >
}

const selectedCategoriesSelector = (state: RootState) =>
  state.event.selectedCategories

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const userProfileSelector = (state: RootState) => state.user.userProfile!
const searchTextSelector = (state: RootState) => state.event.feedSearchText
const batchSize = 6

const SubCategoryEvents = (props: SubCategoryEventsProps) => {
  const { subCategoryValue, tabValue, isLast, feedType } = props
  // console.log('SubCategoryEvents - props', props)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const [allEvents, setAllEvents] = useState<undefined | FeedResponsePayload[]>(
    undefined,
  )
  const [visibleEventsStartIndex, setVisibleEventsStartIndex] =
    useState<number>(0)

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const loadMoreCallBackRef = useRef<undefined | LoadMoreEventFeedCallback>()

  const dispatch = useAppDispatch()

  const categories = useAppSelector(selectedCategoriesSelector)
  const userProfile: UserPayload = useAppSelector(userProfileSelector)
  const feedSearchText = useAppSelector(searchTextSelector)

  const navigate = useNavigate()

  const tabConfig = FeedTabsConfig[tabValue]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const subCategory = tabConfig.subcategories.find(
    (sc) => sc.value === subCategoryValue,
  )!

  const loadEvents = async () => {
    console.log('Feed - loadEvents - feedSearchText', feedSearchText)
    const response = await konectaActorServiceInstance.getEventPaginatedFeed(
      feedType,
      BigInt(0),
      BigInt(batchSize),
      categories,
      userProfile,
      feedSearchText,
    )
    if (!response) {
      return
    }

    const { events, loadAllEvents, loadNextPage, totalRecords } = response
    loadMoreCallBackRef.current = loadNextPage
    setAllEvents(events)
  }

  useEffect(() => {
    loadEvents()
  }, [feedType, batchSize, categories])

  const handleLoadNextPage = async () => {
    try {
      dispatch(setIsAppLoading(true))
      setIsLoadingMore(true)
      const response = await loadMoreCallBackRef.current?.()
      if (!response) {
        throw new Error('response undefined for load more')
      }
      loadMoreCallBackRef.current = response.loadNextPage
      setAllEvents((prev) =>
        _.uniqBy([...(prev ?? []), ...response.events], 'event_id'),
      )
      setIsLoadingMore(false)
      dispatch(setIsAppLoading(false))
    } catch (e) {
      setIsLoadingMore(false)
      dispatch(setIsAppLoading(false))
      console.log('Error loading more event for feedType', feedType, e)
    }
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
    if (isCurrentlyOnLastPage) {
      await handleLoadNextPage()
    }
    setVisibleEventsStartIndex((prev) => prev + batchSize)
  }

  const onPrevPress = async () => {
    setVisibleEventsStartIndex((prev) => Math.max(0, prev - batchSize))
  }

  const isPrevDisabled = visibleEventsStartIndex === 0
  const isNextDisabled =
    (typeof loadMoreCallBackRef.current === 'undefined' &&
      isCurrentlyOnLastPage) ||
    isLoadingMore

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement
    const rightEdge =
      Math.abs(target.scrollWidth - target.scrollLeft - target.offsetWidth) < 56

    if (rightEdge) {
      if (!isNextDisabled && !isLoadingMore) {
        onNextPress()
      }
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
        {visibleEvents.length > 0 ? (
          <div className="flex justify-between gap-[10px] text-white">
            {!isonTabletOrMobile && (
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
                  disabled={isNextDisabled}
                >
                  <ArrowForwardIos />
                </button>
              </div>
            )}
            {/* <button
              className="md:min-w-[100px] btn-secondary"
              // onClick={onShowAllPress}
            >
              View all
            </button> */}
          </div>
        ) : null}
      </div>
      {visibleEvents.length === 0 ? (
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
              key={index}
              onClick={() => navigate(`/event/${event.event_id}`)}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, isVisible, ...other } = props
  const tabConfig = FeedTabs[value]
  // console.log('CustomTabPanel - props', props)

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
                // allEvents={allEvents}
                // setAllEvents={setAllEvents}
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
  const { selectedTab, setAllEvents } = props
  const feedSearchText = useAppSelector(searchTextSelector)
  const categories = useAppSelector(selectedCategoriesSelector)
  const userProfile: UserPayload = useAppSelector(userProfileSelector)
  const loadMoreCallBackRef = useRef<undefined | LoadMoreEventFeedCallback>()
  const selectedTabId = a11yProps(selectedTab === 'SERVICE_REQUEST' ? 0 : 1).id
  const unselectedTabId = a11yProps(
    selectedTab === 'SERVICE_REQUEST' ? 1 : 0,
  ).id
  // console.log(
  //   'FeedSearchInput - selectedTabId - unselectedTabId',
  //   selectedTabId,
  //   unselectedTabId,
  // )

  const dispatch = useAppDispatch()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setFeedSearchText(e.target.value))
  }

  // const loadEvents = async (feedType: FEED_TYPE) => {
  //   console.log('FeedSearchInput - loadEvents - feedSearchText', feedSearchText)
  //   const response = await konectaActorServiceInstance.getEventPaginatedFeed(
  //     feedType,
  //     BigInt(0),
  //     BigInt(batchSize),
  //     categories,
  //     userProfile,
  //     feedSearchText,
  //   )
  //   if (!response) {
  //     return
  //   }

  //   const { events, loadAllEvents, loadNextPage, totalRecords } = response
  //   loadMoreCallBackRef.current = loadNextPage
  //   setAllEvents(events)
  // }

  const triggerSearch = async () => {
    console.log(
      'FeedSearchInput - triggerSearch - feedSearchText',
      feedSearchText,
    )

    const selectedTabElement = document.getElementById(selectedTabId)
    const unSelectedTabElement = document.getElementById(unselectedTabId)
    // console.log(
    //   'FeedSearchInput - triggerSearch - selectedTabElement - unSelectedTabElement',
    //   selectedTabElement,
    //   unSelectedTabElement,
    // )
    unSelectedTabElement?.click()

    setTimeout(() => {
      selectedTabElement?.click()
    }, 1)

    // if (selectedTab === 'SERVICE_REQUEST') {
    //   await loadEvents('FUTURE_REQUESTS')
    //   await loadEvents('PAST_REQUESTS')
    // } else {
    //   await loadEvents('FUTURE_OFFERS')
    //   await loadEvents('PAST_OFFERS')
    // }
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
    />
  )
}

const useSetWallerArr = () => {
  const principalId = useAppSelector((state) => state.auth.pid)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadWalletArr = async () => {
      const walletArr = await ledgerActorServiceInstance.getAllAccountBalance(
        principalId,
      )
      dispatch(setWalletArr(walletArr))
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
  const [allEvents, setAllEvents] = useState<undefined | FeedResponsePayload[]>(
    undefined,
  )

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
          <FeedSearchInput
            selectedTab={selectedTab}
            setAllEvents={setAllEvents}
          />
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
            // allEvents={allEvents}
            // setAllEvents={setAllEvents}
          />
        ))}
      </div>
      <Filters isOpen={filtersShow} handleClose={handleFiltersClose} />
    </div>
  )
}
