import { AddOutlined, EditOutlined, OpenInNew } from '@mui/icons-material'
import { Badge, Tab, Tabs } from '@mui/material'
import PlaceHolderCoverImage from 'assets/img/profile-cover.png'
import UserIcon from 'assets/img/user.png'
import { UserPayload } from 'candid/ts/index.did'
import FeedCard from 'components/FeedCard'
import ProposalStatusCard, {
  Proposal,
} from 'components/ProposalStatusCard/ProposalStatusCard'
import Spinner from 'components/Spinner'
import Tags from 'components/Tags'

import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import { RootState } from 'reduxStore/store'
import indexActorServiceInstance from 'services/indexService'
import konectaActorServiceInstance from 'services/konectaService'
import userActorServiceInstance from 'services/userService'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'

import {
  ApplicationStatusOfMyCreatedEvents,
  FeedResponsePayload,
  PaginatedApplicationStatusOfMyCreatedEvents,
  PaginatedFeedResponsePayload,
  TransactionWithUserDataResponse,
} from 'candid/ts/konecta.did'
import styles from './UserProfile.module.scss'
import { checkIsUrl, preprendProtocolToUrl } from 'utils/values'
import { setUserProfileSelectedTab } from 'reduxStore/event/eventAction'
import { getVideoEmbedUrl, isVideoUrl } from 'utils/common/common'
import ApplicantStatusCard from 'components/ApplicantStatusCard/ApplicantStatusCard'
import eventActorServiceInstance from 'services/eventService'
import { PaginatedProposalsResponse, ProposalResponsePayload } from 'candid/ts/event.did'

interface HeaderProps {
  showEditButton?: boolean
}

type UserProfileData = UserPayload & {
  interests?: string[]
}

interface ProfileSectionProps {
  userData: UserProfileData
}

const Header = ({ showEditButton = false }: HeaderProps) => {
  return (
    <div
      className={
        'flex justify-between px-[24px] py-[10px] md:py-[30px] items-center'
      }
    >
      <div className="flex max-md:flex-col items-baseline gap-[14px] max-md:gap-[2px]">
        <h1 className="!m-0 font-[700] max-md:font-[500] text-[36px] text-white max-md:text-[18px]">
          {showEditButton ? 'My Profile' : 'Profile'}
        </h1>
      </div>
      {showEditButton ? (
        <Link to={'/edit-profile'} className="btn-secondary">
          <EditOutlined />
          <span className="md:flex hidden">Edit Profile</span>
        </Link>
      ) : null}
    </div>
  )
}

const ProfileSection = ({ userData }: ProfileSectionProps) => {
  const sectionInfoClass = 'flex flex-col gap-[4px] md:gap-[12px]'
  const sectionHeadingClass = 'ty-text-3 text-[#A6A5AE]'
  const sectionDetailsClass = 'ty-text-2 text-[#BCBCC2]'

  return (
    <div className="w-full">
      <img
        src={
          userData.coverphoto && userData.coverphoto.length > 0
            ? userActorServiceInstance.getUserImageUrl(
              userData.canister_id.toString(),
              userData.coverphoto,
            )
            : PlaceHolderCoverImage
        }
        className="w-full h-[120px] md:h-[250px] object-cover"
      />
      <div className="relative top-[-50px] flex flex-col gap-[10px] md:gap-[69px] mx-[24px] md:mx-[32px] mb-[-50px] md:mb-[auto] pb-[24px] md:pb-[52px] border-b-[#ffffff1a] border-b-[1.5px]">
        <div className="flex md:flex-row flex-col justify-center md:justify-start items-center md:items-end gap-[12px] md:gap-[32px] md:h-[160px] text-center md:text-left">
          <img
            src={
              userData.profilepic && userData.profilepic.length > 0
                ? userActorServiceInstance.getUserImageUrl(
                  userData.canister_id.toString(),
                  userData.profilepic,
                )
                : UserIcon
            }
            className="border-[#29283C] border-[4px] rounded-full w-[80px] md:w-[160px] h-[80px] md:h-[160px] object-cover"
          />
          <div className="flex flex-col gap-[2px] md:gap-[17px] md:self-center">
            <div className="flex flex-col gap-[2px]">
              <h2 className="text-white ty-heading">
                {userData.firstname} {userData.lastname}
              </h2>
              {/* <p className="text-[#A6A5AE] ty-text-1">
                Product Designer, Dinsten Agency
              </p> */}
            </div>
            {/* <div className="flex flex-row flex-1 justify-center md:justify-between items-center gap-[10px] text-[#A6A5AE] ty-text">
              <p>26.5k Followers</p>
              <p>120 Following</p>
            </div> */}
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-[12px] md:gap-[119px]">
          <div className="flex flex-col gap-[12px] md:gap-[40px] max-w-[700px]">
            <div className={sectionInfoClass}>
              <h3 className={sectionHeadingClass}>About me</h3>
              <p className={`${sectionDetailsClass} whitespace-pre-wrap`}>
                {userData.bio}
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-[6px]">
              {userData.categories.map((category, index) => (
                <Tags
                  text={category}
                  color={category.toLowerCase()}
                  size={'small'}
                  key={index}
                />
              ))}
              {userData.interests?.map((interest, index) => (
                <Tags
                  text={interest}
                  color={interest.toLowerCase()}
                  size={'small'}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[12px] md:gap-[32px]">
            {userData.introduction_video_link &&
              checkIsUrl(
                preprendProtocolToUrl(userData.introduction_video_link),
              ) ? (
              <div className={sectionInfoClass}>
                <h3 className={sectionHeadingClass}>Introduction Video</h3>
                {isVideoUrl(userData.introduction_video_link) ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={getVideoEmbedUrl(userData.introduction_video_link)}
                      title="Introduction Video"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                ) : (
                  <Link
                    to={preprendProtocolToUrl(userData.introduction_video_link)}
                    target="_blank"
                    rel="noreferrer"
                    className={sectionDetailsClass}
                  >
                    {userData.introduction_video_link}
                  </Link>
                )}
              </div>
            ) : null}
            <div className={sectionInfoClass}>
              <h3 className={sectionHeadingClass}>Timezone</h3>
              <p className={sectionDetailsClass}>{userData.timezone}</p>
            </div>
            {/* <div className={sectionInfoClass}>
              <h3 className={sectionHeadingClass}>Personal ID</h3>
              <p className={sectionDetailsClass}>7ab21f534behdajf4ehud8sg</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

type UserProfileEventTabTypes =
  | 'MY_OFFERS'
  | 'MY_REQUESTS'
  | 'JOINED_OFFERS'
  | 'JOINED_REQUESTS'
  | 'OTHER_OFFERS'
  | 'OTHER_REQUESTS'

export type UserProfileTabTypes =
  | UserProfileEventTabTypes
  | 'PROPOSALS'
  | 'REVIEWS'
  | 'TRANSACTIONS'
  | 'APPLICANTS'

interface UserProfileTabConfig {
  value: UserProfileTabTypes
  label: string
  emptyStateTitle: string
  emptyStateSubtitle: string
  hideButton?: boolean
}

const UserProfileTabsConfig: Record<UserProfileTabTypes, UserProfileTabConfig> =
{
  MY_OFFERS: {
    value: 'MY_OFFERS',
    label: 'My offers',
    emptyStateTitle: 'No event offers',
    emptyStateSubtitle: 'Get started by creating a new event',
  },
  MY_REQUESTS: {
    value: 'MY_REQUESTS',
    label: 'My requests',
    emptyStateTitle: 'No event requests',
    emptyStateSubtitle: 'Get started by creating a new event',
  },
  JOINED_OFFERS: {
    value: 'JOINED_OFFERS',
    label: 'Joined offers',
    emptyStateTitle: 'No event offers',
    emptyStateSubtitle: 'Get started by creating a new event',
  },
  JOINED_REQUESTS: {
    value: 'JOINED_REQUESTS',
    label: 'Joined Requests',
    emptyStateTitle: 'No event request',
    emptyStateSubtitle: 'Get started by creating a new event',
  },
  OTHER_OFFERS: {
    value: 'OTHER_OFFERS',
    label: 'Event offers',
    emptyStateTitle: 'No event offers',
    emptyStateSubtitle: 'Get started by creating a new event',
  },
  OTHER_REQUESTS: {
    value: 'OTHER_REQUESTS',
    label: 'Event requests',
    emptyStateTitle: 'No event request',
    emptyStateSubtitle: 'Get started by creating a new event',
  },
  REVIEWS: {
    value: 'REVIEWS',
    label: 'Reviews',
    emptyStateTitle: 'No reviews',
    emptyStateSubtitle:
      'After purchasing the event or product, you have the option to leave a review.',
    hideButton: true,
  },
  PROPOSALS: {
    value: 'PROPOSALS',
    label: 'My applications',
    emptyStateTitle: 'No proposals',
    emptyStateSubtitle:
      'After applying for service requests, you can track your proposals',
    hideButton: true,
  },
  APPLICANTS: {
    value: 'APPLICANTS',
    label: 'My applicants',
    emptyStateTitle: 'No applicants',
    emptyStateSubtitle: 'You can track your applicants once they apply',
    hideButton: true,
  },
  TRANSACTIONS: {
    value: 'TRANSACTIONS',
    label: 'Transactions',
    emptyStateTitle: 'No transactions',
    emptyStateSubtitle: '',
    hideButton: true,
  },
}

const EmptyState = ({ type }: { type: UserProfileTabTypes }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center gap-[24px] bg-[#FFFFFF05] my-[24px] py-[120px] rounded-[8px] w-full text-center text-white">
      <div className="flex flex-col gap-[4px] max-w-[400px]">
        <h3 className="ty-body-mobile md:ty-title">
          {UserProfileTabsConfig[type].emptyStateTitle}
        </h3>
        <p className="text-[#BCBCC2] ty-text-mobile md:ty-text-1">
          {UserProfileTabsConfig[type].emptyStateSubtitle}
        </p>
      </div>
      {!UserProfileTabsConfig[type].hideButton ? (
        <button
          className="btn-primary max-md:btn-sm"
          onClick={() => {
            navigate('/create-event')
          }}
        >
          <span>
            <AddOutlined />
          </span>{' '}
          Create event
        </button>
      ) : null}
    </div>
  )
}

const LoadingGrid = () => {
  return (
    <div className="gap-[24px] grid grid-cols-3 py-[24px]">
      {[1, 2, 3].map((ev) => {
        return (
          <div key={ev} className="bg-[#FFFFFF05] rounded-[8px] aspect-[4/3]" />
        )
      })}
    </div>
  )
}

interface TabPanelProps {
  type: UserProfileTabTypes
  selectedTab: UserProfileTabTypes
  handleSetTabCount: (tab: UserProfileTabTypes, count: number) => void
  userData: UserPayload
}

const TransactionsPanel = (props: TabPanelProps) => {
  const { type, selectedTab, handleSetTabCount } = props
  const [transactions, setTransactions] = useState<
    TransactionWithUserDataResponse[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<any>(null)

  const loadTransactions = useCallback(
    async (cursor: any | null) => {
      try {
        setIsLoading(true)
        const response =
          await konectaActorServiceInstance.getTransactionsForUser(
            5n,
            cursor ?? undefined,
          )

        if ('ok' in response) {
          const page = response.ok
          if (cursor === null) {
            handleSetTabCount(type, Number(page.totalRecords))
          }
          setTransactions((prev) =>
            _.uniqBy([...prev, ...page.items], 'transaction_id'),
          )
          setHasMore(page.hasMore)
          setNextCursor(page.nextCursor[0] ?? null)
        } else {
          console.error(response.err)
          setTransactions([])
        }
      } catch (e) {
        console.error(e)
        setTransactions([])
      } finally {
        setIsLoading(false)
      }
    },
    [handleSetTabCount, type],
  )

  useEffect(() => {
    if (selectedTab === type) {
      loadTransactions(null)
    }
  }, [selectedTab, type, loadTransactions])

  const handleLoadMore = () => {
    if (hasMore) {
      loadTransactions(nextCursor)
    }
  }

  return (
    <div
      hidden={type !== selectedTab}
      className="w-full text-white overflow-scroll scrollbar"
    >
      {isLoading && transactions.length === 0 ? (
        <div className="relative w-full h-[300px]">
          <Spinner size="small" />
        </div>
      ) : transactions.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <>
          <table className={styles.transactionTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>To</th>
                <th>Event</th>
                <th>Amount</th>
                <th>Fee</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                return (
                  <tr key={transaction.block_index + index.toString()}>
                    <td data-type="date-cell">
                      {getMomentFromNanoSeconds(
                        transaction.created_at_time,
                      ).format('Do MMM YYYY[\n]hh:mm A')}
                    </td>
                    <td data-type="to-cell">{transaction.beneficiary_user_id}</td>
                    <td data-type="event-cell">
                      <Link to={`/event/${transaction.eventData.event_id}`}>
                        <span data-event-type={transaction.eventData.event_type}>
                          {_.capitalize(transaction.eventData.event_type)}
                        </span>
                        {transaction.eventData.name}
                      </Link>
                    </td>
                    <td data-type="amount-cell">
                      {Number(transaction.amount) / 1e8}{' '}
                      {transaction.eventData.price_token}
                    </td>
                    <td data-type="amount-cell">
                      {Number(transaction.fee) / 1e8}{' '}
                      {transaction.eventData.price_token}
                    </td>
                    <td data-type="reference">
                      <Link to={transaction.url} target="_blank">
                        <OpenInNew
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            width: 16,
                            height: 16,
                          }}
                        />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                className="btn-secondary"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const UserProposalsTabPanel = (props: TabPanelProps) => {
  const { type, selectedTab, handleSetTabCount, userData } = props
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<any>(null)

  const navigate = useNavigate()

  const loadProposals = useCallback(
    async (cursor: any | null) => {
      try {
        setIsLoading(true)
        const response =
          await eventActorServiceInstance.getMyPaginatedProposals(
            userData.principal_id,
            5n,
            cursor ?? undefined,
          )

        if ('ok' in response) {
          const page: PaginatedProposalsResponse = response.ok
          if (cursor === null) {
            handleSetTabCount(type, Number(page.totalRecords))
          }
          const newProposals: Proposal[] = page.items.map(
            (p: ProposalResponsePayload) => ({
              eventId: p.eventData.event_id,
              eventName: p.eventData.name,
              note: '',
              lastUpdatedAt: BigInt(0),
              status: 'Applied',
              eventCreator: `${p.eventData.userData.firstname} ${p.eventData.userData.lastname}`,
              location: p.eventData.location,
            }),
          )

          setProposals((prev) => _.uniqBy([...prev, ...newProposals], 'eventId'))
          setHasMore(page.hasMore)
          setNextCursor(page.nextCursor[0] ?? null)
        } else {
          console.error(response.err)
          setProposals([])
        }
      } catch (e) {
        console.error(e)
        setProposals([])
      } finally {
        setIsLoading(false)
      }
    },
    [handleSetTabCount, type, userData.principal_id],
  )

  useEffect(() => {
    if (selectedTab === type) {
      loadProposals(null)
    }
  }, [selectedTab, type, loadProposals])

  const handleLoadMore = () => {
    if (hasMore) {
      loadProposals(nextCursor)
    }
  }

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`)
  }

  return (
    <div hidden={type !== selectedTab}>
      {isLoading && proposals.length === 0 ? (
        <LoadingGrid />
      ) : proposals.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <>
          <div className="gap-[12px] grid grid-cols-[repeat(auto-fit,minmax(30vw,1fr))] py-[16px]">
            {proposals.map((proposal) => (
              <ProposalStatusCard
                key={proposal.eventId}
                {...proposal}
                onViewEventClick={handleEventClick}
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                className="btn-secondary"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const UserApplicantsTabPanel = (props: TabPanelProps) => {
  const { type, selectedTab, handleSetTabCount, userData } = props
  const [applicants, setApplicants] = useState<
    ApplicationStatusOfMyCreatedEvents[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<any>(null)

  const navigate = useNavigate()

  const loadApplicants = useCallback(
    async (cursor: any | null) => {
      try {
        setIsLoading(true)
        const response =
          await konectaActorServiceInstance.getPaginatedApplicationStatusOfMyCreatedEvents(
            userData.principal_id,
            5n,
            cursor ?? undefined,
          )

        if ('ok' in response) {
          const page: PaginatedApplicationStatusOfMyCreatedEvents = response.ok
          if (cursor === null) {
            handleSetTabCount(type, Number(page.totalRecords))
          }
          setApplicants((prev) =>
            _.uniqBy([...prev, ...page.items], 'event_id'),
          )
          setHasMore(page.hasMore)
          setNextCursor(page.nextCursor[0] ?? null)
        } else {
          console.error(response.err)
          setApplicants([])
        }
      } catch (e) {
        console.error(e)
        setApplicants([])
      } finally {
        setIsLoading(false)
      }
    },
    [handleSetTabCount, type, userData.principal_id],
  )

  useEffect(() => {
    if (selectedTab === type) {
      loadApplicants(null)
    }
  }, [selectedTab, type, loadApplicants])

  const handleLoadMore = () => {
    if (hasMore) {
      loadApplicants(nextCursor)
    }
  }

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`)
  }

  return (
    <div hidden={type !== selectedTab}>
      {isLoading && applicants.length === 0 ? (
        <LoadingGrid />
      ) : applicants.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <>
          <div className="gap-[12px] grid grid-cols-[repeat(auto-fit,minmax(30vw,1fr))] py-[16px]">
            {applicants.map((applicantData) => (
              <ApplicantStatusCard
                key={applicantData.event_id}
                {...applicantData}
                onViewEventClick={handleEventClick}
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                className="btn-secondary"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const UserEventTabPanel = (props: TabPanelProps) => {
  const { userData, type, selectedTab, handleSetTabCount } = props
  const [events, setEvents] = useState<FeedResponsePayload[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<any>(null)

  const navigate = useNavigate()

  const loadEvents = useCallback(
    async (cursor: any | null) => {
      try {
        setIsLoading(true)
        const payload: any = {
          currentTimestamp: BigInt(Date.now() * 1_000_000),
          isFuture: true,
          eventType: [],
          status: [],
          userId: [],
          categories: [],
          recordingType: [],
          limit: 5n,
          cursor: cursor ? [cursor] : [],
        }

        switch (type) {
          case 'MY_OFFERS':
            payload.eventType = ['Offer']
            payload.userId = [userData.principal_id]
            break
          case 'MY_REQUESTS':
            payload.eventType = ['Request']
            payload.userId = [userData.principal_id]
            break
          // Note: Joined tabs require a different backend call
        }

        const response = await konectaActorServiceInstance.getPaginatedFeed(
          payload,
        )

        if ('ok' in response) {
          const page: PaginatedFeedResponsePayload = response.ok
          if (cursor === null) {
            handleSetTabCount(type, Number(page.totalRecords))
          }
          setEvents((prev) => _.uniqBy([...prev, ...page.items], 'event_id'))
          setHasMore(page.hasMore)
          setNextCursor(page.nextCursor[0] ?? null)
        } else {
          console.error(response.err)
          setEvents([])
        }
      } catch (e) {
        console.error(e)
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    },
    [handleSetTabCount, type, userData.principal_id],
  )

  const loadJoinedEvents = useCallback(
    async (cursor: any | null) => {
      try {
        setIsLoading(true)
        let response
        if (type === 'JOINED_OFFERS') {
          response =
            await konectaActorServiceInstance.getPaginatedJoinedOffersForMyProfile(
              5n,
              cursor ?? undefined,
            )
        } else {
          // 'JOINED_REQUESTS'
          response =
            await konectaActorServiceInstance.getPaginatedJoinedRequestsForMyProfile(
              5n,
              cursor ?? undefined,
            )
        }

        if ('ok' in response) {
          const page: PaginatedFeedResponsePayload = response.ok
          if (cursor === null) {
            handleSetTabCount(type, Number(page.totalRecords))
          }
          setEvents((prev) =>
            _.uniqBy([...prev, ...page.items], 'event_id'),
          )
          setHasMore(page.hasMore)
          setNextCursor(page.nextCursor[0] ?? null)
        } else {
          console.error(response.err)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    },
    [handleSetTabCount, type],
  )

  useEffect(() => {
    if (selectedTab === type) {
      if (type.startsWith('JOINED')) {
        loadJoinedEvents(null)
      } else {
        loadEvents(null)
      }
    }
  }, [selectedTab, type, loadEvents, loadJoinedEvents])

  const handleLoadMore = () => {
    if (hasMore) {
      if (type.startsWith('JOINED')) {
        loadJoinedEvents(nextCursor)
      } else {
        loadEvents(nextCursor)
      }
    }
  }

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== type}
      className={
        isLoading && events.length === 0
          ? 'w-full'
          : 'flex flex-col justify-center items-start w-full relative'
      }
    >
      {isLoading && events.length === 0 ? (
        <LoadingGrid />
      ) : events.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <>
          <div className="flex flex-row gap-[16px] md:gap-[24px] md:grid md:grid-cols-3 py-[16px] md:py-[24px] w-full overflow-x-auto">
            {events.map((feedEvent) => {
              const isMyEventTab = type === 'MY_OFFERS' || type === 'MY_REQUESTS';

              const correctedEvent: FeedResponsePayload = {
                ...feedEvent,
                userData: isMyEventTab
                  ? {
                    ...userData,
                    canister_id: userData.canister_id.toString(),
                    principal_id: userData.principal_id.toString(),
                  }
                  : feedEvent.userData,
              };

              return (
                <FeedCard
                  key={feedEvent.event_id}
                  event={correctedEvent}
                  onClick={() => navigate(`/event/${feedEvent.event_id}`)}
                />
              );
            })}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                className="btn-secondary"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const UserProfileTabs = (props: { userData: UserPayload }) => {
  const { userData } = props
  const currentUserId = useAppSelector((state: RootState) =>
    state.user.userProfile?.principal_id?.toString(),
  )

  const isMyProfile = userData.principal_id.toText() === currentUserId

  const visibleTabs = isMyProfile
    ? [
      UserProfileTabsConfig.MY_OFFERS,
      UserProfileTabsConfig.MY_REQUESTS,
      UserProfileTabsConfig.JOINED_OFFERS,
      UserProfileTabsConfig.JOINED_REQUESTS,
      UserProfileTabsConfig.PROPOSALS,
      UserProfileTabsConfig.APPLICANTS,
      UserProfileTabsConfig.TRANSACTIONS,
    ]
    : [UserProfileTabsConfig.OTHER_OFFERS, UserProfileTabsConfig.OTHER_REQUESTS]

  const selectedTab = useAppSelector((state) => {
    return state.event.userProfileSelectedTab
  })
  const dispatch = useAppDispatch()

  const [tabCount, setTabCount] = useState<Record<UserProfileTabTypes, number>>(
    {
      MY_OFFERS: 0,
      MY_REQUESTS: 0,
      JOINED_OFFERS: 0,
      JOINED_REQUESTS: 0,
      OTHER_OFFERS: 0,
      OTHER_REQUESTS: 0,
      REVIEWS: 0,
      PROPOSALS: 0,
      APPLICANTS: 0,
      TRANSACTIONS: 0,
    },
  )

  const handleSetTabCount = useCallback(
    (tab: UserProfileTabTypes, count: number) => {
      setTabCount((prev) => ({
        ...prev,
        [tab]: count,
      }))
    },
    [],
  )

  return (
    <div className="px-[24px] md:px-[32px]">
      <Tabs
        value={selectedTab}
        onChange={(e, v) => dispatch(setUserProfileSelectedTab(v))}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          width: '100%',
          borderBottomColor: '#363548',
          borderBottomWidth: '1px',
        }}
      >
        {visibleTabs.map((tabConfig, idx) => {
          const isActive = selectedTab === tabConfig.value
          return (
            <Tab
              value={tabConfig.value}
              label={
                <div className="flex items-center text-[12px] md:text-[16px]">
                  {tabConfig.label}
                  {tabCount[tabConfig.value] > 0 ? (
                    <Badge
                      badgeContent={tabCount[tabConfig.value].toString()}
                      className="px-[10px]"
                      variant="standard"
                      sx={{
                        color: isActive ? '#337FF5' : '#A6A5AE',
                        '& .MuiBadge-badge': {
                          background: isActive ? '#337FF51A' : '#FFFFFF0D',
                          borderRadius: '3px',
                          fontSize: '12px',
                          lineHeight: '18px',
                        },
                      }}
                    />
                  ) : null}
                </div>
              }
              key={tabConfig.value}
              sx={{
                textTransform: 'none',
                fontSize: 16,
                fontWeight: 400,
                color: isActive ? '#337FF5' : '#A6A5AE',
              }}
            />
          )
        })}
      </Tabs>

      {visibleTabs.map((tabConfig) => {
        const panelProps = {
          key: tabConfig.value,
          type: tabConfig.value,
          selectedTab: selectedTab,
          handleSetTabCount: handleSetTabCount,
          userData: userData,
        }

        if (
          [
            'MY_OFFERS',
            'MY_REQUESTS',
            'JOINED_OFFERS',
            'JOINED_REQUESTS',
            'OTHER_OFFERS',
            'OTHER_REQUESTS',
          ].includes(tabConfig.value)
        ) {
          return <UserEventTabPanel {...panelProps} />
        }
        if (tabConfig.value === 'TRANSACTIONS') {
          return <TransactionsPanel {...panelProps} />
        }
        if (tabConfig.value === 'APPLICANTS') {
          return <UserApplicantsTabPanel {...panelProps} />
        }
        if (tabConfig.value === 'PROPOSALS') {
          return <UserProposalsTabPanel {...panelProps} />
        }
        return null
      })}
    </div>
  )
}

const UserProfile = () => {
  const { user_name: userName } = useParams() as { user_name: string }
  const [userData, setUserData] = useState<undefined | UserPayload>(undefined)
  const currentUserId = useAppSelector((state: RootState) =>
    state.user.userProfile?.principal_id?.toString(),
  )

  const [isLoading, setIsLoading] = useState(true)

  const loadUserData = useCallback(async () => {
    try {
      setIsLoading(true)
      const userProfileDataResponse =
        await indexActorServiceInstance.getUserByUsername(userName)

      if (userProfileDataResponse) {
        const userDataPayload = Array.isArray(userProfileDataResponse)
          ? userProfileDataResponse[0]
          : userProfileDataResponse
        setUserData(userDataPayload)
      }
    } catch (e) {
      console.error('Failed to load user data:', e)
    } finally {
      setIsLoading(false)
    }
  }, [userName])

  useEffect(() => {
    if (userName) {
      loadUserData()
    }
  }, [userName, loadUserData])

  if (!userName) {
    return <Navigate to={'landing'} />
  }

  return (
    <div className="m-[-32px]">
      <Header showEditButton={userData?.principal_id.toText() === currentUserId} />
      {!userData ? (
        !isLoading ? (
          <div className="flex flex-col justify-center items-center w-full h-full text-white">
            Something went wrong
          </div>
        ) : (
          <Spinner size={'medium'} />
        )
      ) : (
        <>
          <div>
            <ProfileSection userData={userData} />
          </div>
          <UserProfileTabs userData={userData} />
        </>
      )}
    </div>
  )
}

export default UserProfile