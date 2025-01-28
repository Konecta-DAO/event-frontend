/* eslint-disable @typescript-eslint/unbound-method */
import { AddOutlined, EditOutlined, OpenInNew } from '@mui/icons-material'
import { Badge, Tab, Tabs } from '@mui/material'
import PlaceHolderCoverImage from 'assets/img/profile-cover.png'
import UserIcon from 'assets/img/user.png'
import { CanisterMapPayload, UserPayload } from 'candid/ts/index.did'
import FeedCard from 'components/FeedCard'
import ProposalStatusCard, {
  Proposal,
  ProposalStatus,
} from 'components/ProposalStatusCard/ProposalStatusCard'
import Spinner from 'components/Spinner'
import Tags from 'components/Tags'

import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import { RootState } from 'reduxStore/store'
import indexActorServiceInstance from 'services/indexService'
import konectaActorServiceInstance, {
  LoadMoreApplicantCallback,
  LoadMoreEventFeedCallback,
  LoadMoreTransactionCallback,
} from 'services/konectaService'
import userActorServiceInstance from 'services/userService'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'

import {
  ApplicationStatusOfMyCreatedEvents,
  FeedResponsePayload,
  TransactionWithUserDataResponse,
} from 'candid/ts/konecta.did'
import { setIsAppLoading } from 'reduxStore/appState/appStateAction'
import styles from './UserProfile.module.scss'
import { checkIsUrl, preprendProtocolToUrl } from 'utils/values'
import { setUserProfileSelectedTab } from 'reduxStore/event/eventAction'
import { getVideoEmbedUrl, isVideoUrl } from 'utils/common/common'
import ApplicantStatusCard from 'components/ApplicantStatusCard/ApplicantStatusCard'

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

interface UserEventTabPanelProps {
  userData: UserProfileData
  type: UserProfileTabTypes
  selectedTab: UserProfileTabTypes
  handleSetTabCount: (tab: UserProfileTabTypes, count: number) => void
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

const TransactionsPanel = (props: UserProposalsTabPanelProps) => {
  const { type, selectedTab, handleSetTabCount } = props
  const [transactions, setTransactions] = useState<
    TransactionWithUserDataResponse[] | undefined
  >(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const loadNextPageCallbackRef = useRef<
    undefined | LoadMoreTransactionCallback
  >(undefined)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true)

        const response = await konectaActorServiceInstance.getMyTransactions()
        if (!response) {
          throw new Error('Error fetching transactions')
        }

        handleSetTabCount(type, Number(response.totalRecords))

        const newItems = response.transactions

        loadNextPageCallbackRef.current = response.loadMoreTransactions

        setTransactions((prev) =>
          _.uniqBy([...(prev ?? []), ...newItems], 'transaction_id'),
        )

        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setTransactions(undefined)
      }
    }
    loadTransactions()
  }, [handleSetTabCount, type])

  const loadNextPage = async () => {
    try {
      dispatch(setIsAppLoading(true))
      const response = await loadNextPageCallbackRef.current?.()
      if (!response) {
        throw new Error('Error fetching more transactions')
      }

      const newItems = response.transactions

      loadNextPageCallbackRef.current = response.loadMoreTransactions

      setTransactions((prev) =>
        _.uniqBy([...(prev ?? []), ...newItems], 'transaction_id'),
      )
      dispatch(setIsAppLoading(false))
    } catch (e) {
      dispatch(setIsAppLoading(false))
      console.log('error fetching more transactions')
    }
  }

  return (
    <div
      hidden={type !== selectedTab}
      className="w-full text-white overflow-scroll scrollbar"
    >
      {isLoading ? (
        <div className="relative w-full h-[300px]">
          <Spinner size="small" />
        </div>
      ) : typeof transactions === 'undefined' ? (
        <div className="flex flex-col justify-center items-center w-full h-[300px]">
          Something went wrong while loading transactions
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-[300px]">
          No transactions yet!
        </div>
      ) : (
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
          {loadNextPageCallbackRef.current !== undefined ? (
            <tfoot>
              <tr>
                <td
                  colSpan={6}
                  className="text-right text-sm cursor-pointer"
                  onClick={loadNextPage}
                >
                  Show more
                </td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      )}
    </div>
  )
}

interface UserProposalsTabPanelProps {
  type: UserProfileTabTypes
  selectedTab: UserProfileTabTypes
  handleSetTabCount: (tab: UserProfileTabTypes, count: number) => void
}

const UserProposalsTabPanel = (props: UserProposalsTabPanelProps) => {
  const { type, selectedTab, handleSetTabCount } = props
  const [isLoading, setIsLoading] = useState(true)
  const [proposals, setProposals] = useState<Proposal[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const proposalPayload =
          await konectaActorServiceInstance.getMyProposals()

        if (typeof proposalPayload === 'undefined') {
          throw new Error('error in fetching proposals')
        }

        const proposalsData: Proposal[] = _.sortBy(
          _.map(proposalPayload, (proposalResp) => {
            return {
              eventId: proposalResp.event_id,
              eventName: proposalResp.event_name,
              note: proposalResp.note,
              lastUpdatedAt: proposalResp.updated_at,
              status: proposalResp.action as ProposalStatus,
              eventCreator: `${proposalResp.userData.firstname} ${proposalResp.userData.lastname}`,
              location: proposalResp.location,
            }
          }),
          (value) => {
            return -Number(value.lastUpdatedAt)
          },
        )
        setProposals(proposalsData)
        handleSetTabCount(type, proposalsData.length)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
      }
    }

    loadData()
  }, [handleSetTabCount, type])

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`)
  }

  return (
    <div hidden={type !== selectedTab}>
      {isLoading ? (
        <LoadingGrid />
      ) : proposals.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <div className="gap-[12px] grid grid-cols-[repeat(auto-fit,minmax(30vw,1fr))] py-[16px]">
          {proposals.map((proposal) => {
            return (
              <ProposalStatusCard
                key={proposal.eventId}
                {...proposal}
                onViewEventClick={handleEventClick}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const UserApplicantsTabPanel = (props: UserProposalsTabPanelProps) => {
  const { type, selectedTab, handleSetTabCount } = props
  const [isLoading, setIsLoading] = useState(true)
  const [filteredApplicants, setFilteredApplicants] = useState<any>([])

  const loadNextPageCallbackRef = useRef<undefined | LoadMoreApplicantCallback>(
    undefined,
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  console.log('UserApplicantsTabPanel - filteredApplicants', filteredApplicants)

  const fetchUserApplicantDetails = async (
    applicants: ApplicationStatusOfMyCreatedEvents[],
  ) => {
    try {
      console.log(
        'UserApplicantsTabPanel - fetchUserApplicantDetails called - applicants',
        applicants,
      )
      const userDetails = await Promise.all(
        applicants.map(async (event) => {
          const principalIds = event.applied_users_details.map(
            (applicant) => applicant.applied_user_id,
          )
          const userTimestamps = new Map(
            event.applied_users_details.map((applicant) => [
              applicant.applied_user_id,
              applicant.timestamp,
            ]),
          )
          console.log(
            'UserApplicantsTabPanel - fetchUserApplicantDetails - event_id principalIds',
            event.event_id,
            event.event_name,
            principalIds,
          )
          const canisterResponses: CanisterMapPayload[] =
            await indexActorServiceInstance.getUserCanistersByPrincipal(
              principalIds,
            )
          console.log(
            'UserApplicantsTabPanel - fetchUserApplicantDetails - canisterResponses',
            canisterResponses,
          )

          const users = await Promise.all(
            canisterResponses.map(async (response) => {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              const { principal_id, canister_id } = response
              return await userActorServiceInstance.getUserByPrincipalId(
                principal_id,
                canister_id,
              )
            }),
          )
          console.log(
            'UserApplicantsTabPanel - fetchUserApplicantDetails - users',
            users,
          )
          const filteredUsers = users
            // .filter((user) => typeof user !== 'undefined')
            .filter(
              (user): user is NonNullable<typeof user> => user !== undefined,
            )
            .map((user) => ({
              ...user,
              timestamp: userTimestamps.get(user.principal_id.toString()),
            }))

          console.log(
            'UserApplicantsTabPanel - fetchUserApplicantDetails - filteredUsers',
            filteredUsers,
          )

          return {
            event_id: event.event_id,
            event_name: event.event_name,
            event_description: event.event_description,
            users: filteredUsers,
          }
        }),
      )
      // const filteredUserDetails = userDetails.filter(
      //   (detail) => detail.users.length > 0,
      // )

      console.log(
        'UserApplicantsTabPanel - fetchUserApplicantDetails - filteredUserDetails',
        userDetails,
      )
      return userDetails
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        setIsLoading(true)
        const response = await konectaActorServiceInstance.getMyApplicants()
        console.log('UserApplicantsTabPanel - response', response)

        if (!response || typeof response === 'undefined') {
          throw new Error('error in fetching applicants')
        }

        handleSetTabCount(type, Number(response.totalRecords))

        const newItems = response.applicants
        loadNextPageCallbackRef.current = response.loadMoreApplicants

        if (typeof newItems !== 'undefined') {
          const newApplicants: any = await fetchUserApplicantDetails(newItems)
          console.log('UserApplicantsTabPanel - newApplicants', newApplicants)
          setFilteredApplicants((prev: any) =>
            _.uniqBy([...(prev ?? []), ...newApplicants], 'event_id'),
          )
        }

        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
      }
    }

    loadApplicants()
  }, [handleSetTabCount, type])

  const loadNextPage = async () => {
    try {
      dispatch(setIsAppLoading(true))
      const response = await loadNextPageCallbackRef.current?.()
      // console.log('UserApplicantsTabPanel - loadNextPage - response', response)
      if (!response || typeof response === 'undefined') {
        throw new Error('Error fetching more applicants')
      }

      const newItems = response.applicants

      loadNextPageCallbackRef.current = response.loadMoreApplicants

      if (typeof newItems !== 'undefined') {
        const newApplicants: any = await fetchUserApplicantDetails(newItems)
        setFilteredApplicants((prev: any) =>
          _.uniqBy([...(prev ?? []), ...newApplicants], 'event_id'),
        )
      }
      dispatch(setIsAppLoading(false))
    } catch (e) {
      dispatch(setIsAppLoading(false))
      console.log('error fetching more applicants')
    }
  }

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`)
  }

  return (
    <div hidden={type !== selectedTab}>
      {isLoading || typeof filteredApplicants === 'undefined' ? (
        <LoadingGrid />
      ) : filteredApplicants.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <div className="gap-[12px] grid grid-cols-[repeat(auto-fit,minmax(30vw,1fr))] py-[16px]">
          {filteredApplicants.map((applicant: any) => {
            return (
              // <div>{applicant.event_name}</div>
              <ApplicantStatusCard
                key={applicant.event_id}
                {...applicant}
                onViewEventClick={handleEventClick}
              />
            )
          })}
        </div>
      )}
      {loadNextPageCallbackRef.current !== undefined ? (
        <div className="relative">
          <button
            className="text-white text-sm absolute right-2 mb-0 mr-4"
            onClick={loadNextPage}
          >
            Show more
          </button>
        </div>
      ) : null}
    </div>
  )
}

const UserEventTabPanel = (props: UserEventTabPanelProps) => {
  const { userData, type, selectedTab, handleSetTabCount } = props
  const userPid = userData.principal_id.toString()

  const [events, setEvents] = useState<undefined | FeedResponsePayload[]>(
    undefined,
  )
  const [isLoading, setIsLoading] = useState(events === undefined)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const loadMoreRef = useRef<undefined | LoadMoreEventFeedCallback>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response =
          await konectaActorServiceInstance.getProfileEventTabPaginatedFeed(
            userPid,
            type as UserProfileEventTabTypes,
          )

        if (response === undefined) {
          setIsLoading(false)
          throw new Error(
            'no response from getProfileEventTabPaginatedFeed method',
          )
        }

        handleSetTabCount(type, Number(response?.totalRecords))
        setEvents(response?.events)
        loadMoreRef.current = response.loadNextPage

        setIsLoading(false)
      } catch (e) {
        console.log('UserEventTabPanel - ', type, ' - error:', e)
        setIsLoading(false)
      }
    }
    loadData()
  }, [type, userPid, handleSetTabCount])

  const handleLoadMore = async () => {
    try {
      if (loadMoreRef.current === undefined) {
        return
      }
      dispatch(setIsAppLoading(true))
      setIsLoadingMore(true)
      const response = await loadMoreRef.current()

      if (response === undefined) {
        throw new Error('undefined response')
      }

      loadMoreRef.current = response.loadNextPage
      setEvents((prev) => [...(prev ?? []), ...response.events])
      dispatch(setIsAppLoading(false))
      setIsLoadingMore(false)
    } catch (e) {
      setIsLoadingMore(false)
      dispatch(setIsAppLoading(false))
      console.log(
        'User Profile - User EventTabPanel - ',
        type,
        'load more error',
        e,
      )
    }
  }

  const navigate = useNavigate()

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== type}
      className={
        isLoading
          ? 'w-full'
          : 'flex flex-col justify-center items-start w-full relative'
      }
    >
      {!isLoading && !isLoadingMore && loadMoreRef.current !== undefined ? (
        <button
          className="btn-secondary md:btn-ghost md:top-[-52px] md:right-0 md:z-[100] md:absolute mt-[12px] md:mt-[auto] md:px-[0px] md:text-[#337FF5] md:text-[16px] btn-sm self-end md:self-auto"
          onClick={handleLoadMore}
        >
          Show more
        </button>
      ) : null}
      {isLoading ? (
        <LoadingGrid />
      ) : typeof events === 'undefined' ? (
        <div className="flex flex-col justify-center items-center w-full min-h-[200px] text-center text-white">
          Something went wrong
        </div>
      ) : events.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <div className="flex flex-row gap-[16px] md:gap-[24px] md:grid md:grid-cols-3 py-[16px] md:py-[24px] w-full overflow-x-auto">
          {events?.map((feedEvent) => (
            <FeedCard
              key={feedEvent.event_id}
              event={{ ...feedEvent, konectaMetadata: [], eventMetadata: [] }}
              onClick={() => navigate(`/event/${feedEvent.event_id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface UserProfileTabsProps {
  userData: UserProfileData
}

const userIdSelector = (state: RootState) => state.user.userProfile?.id

const UserProfileTabs = (props: UserProfileTabsProps) => {
  const { userData } = props
  const currentUserId = useAppSelector(userIdSelector)

  const isMyProfile = userData.id === currentUserId

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

      {visibleTabs.map((tabConfig, index) => {
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
          return (
            <UserEventTabPanel
              key={tabConfig.value}
              type={tabConfig.value}
              selectedTab={selectedTab}
              handleSetTabCount={handleSetTabCount}
              userData={userData}
            />
          )
        }

        if (tabConfig.value === 'TRANSACTIONS') {
          return (
            <TransactionsPanel
              key={tabConfig.value}
              type={tabConfig.value}
              selectedTab={selectedTab}
              handleSetTabCount={handleSetTabCount}
            />
          )
        }

        if (tabConfig.value === 'APPLICANTS') {
          return (
            <UserApplicantsTabPanel
              key={tabConfig.value}
              type={tabConfig.value}
              selectedTab={selectedTab}
              handleSetTabCount={handleSetTabCount}
            />
          )
        }

        // if (tabConfig.value === 'PROPOSALS') {
        return (
          <UserProposalsTabPanel
            key={tabConfig.value}
            type={tabConfig.value}
            selectedTab={selectedTab}
            handleSetTabCount={handleSetTabCount}
          />
        )
        // }
      })}
    </div>
  )
}

const UserProfile = () => {
  const { user_name: userName } = useParams() as { user_name: string }
  const [userData, setUserData] = useState<undefined | UserPayload>(undefined)
  const currentUserId = useAppSelector(userIdSelector)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true)
        // TODO: interest is missing from UserPayload
        const userProfileDataResponse =
          await indexActorServiceInstance.getUserByUserName(userName)
        if (!userProfileDataResponse) {
          setIsLoading(false)
          return
        }
        setUserData(userProfileDataResponse)
      } catch (e) {
        setIsLoading(false)
      }
    }
    loadUserData()
  }, [userName])

  if (!userName) {
    return <Navigate to={'landing'} />
  }

  return (
    <div className="m-[-32px]">
      <Header showEditButton={userData?.id === currentUserId} />
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
