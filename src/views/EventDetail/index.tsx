import {
  AddBox,
  AddOutlined,
  CloseOutlined,
  MoreVert,
  Payment,
  RemoveCircle,
  RemoveOutlined,
  ShareOutlined,
  VideocamOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import FeedCoverImg from 'assets/img/feed-cover.png'
import UserIcon from 'assets/img/user.png'
import InviteMembers from 'components/Modals/InviteMembers'
import ShareLinks from 'components/Modals/ShareLinks'
import Tags from 'components/Tags'
import eventData from 'data/events.json'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  BackBtnIcon,
  CalendarIcon,
  ClipShapeLeft,
  ClipShapeRight,
  ClockIcon,
  EditIcon,
} from 'utils/svg-icons'

import ApplyForEventRequest from 'components/Modals/ApplyForEventRequest/ApplyForEventRequest'
import Spinner from 'components/Spinner'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import eventActorServiceInstance from 'services/eventService'
import konectaActorServiceInstance from 'services/konectaService'
import AppliedUsers from './AppliedUsers'
import styles from './style.module.css'
import { setUserEventDetail } from 'reduxStore/event/eventAction'
import { setIsAppLoading } from 'reduxStore/appState/appStateAction'
import { checkIsUrl, preprendProtocolToUrl } from 'utils/values'
import Notification from 'components/Modals/Notifications'
import Attendees from './Attendees'
import LinkToUserProfile from 'components/LinkToUserProfile'
import { getCKBTCApproval, getICPApproval } from 'services/paymentService'
import { setLoader } from 'reduxStore/auth/authAction'
import ledgerActorServiceInstance from 'services/ledgerService'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'
import userActorServiceInstance from 'services/userService'
import MultiEventFeedBack from 'components/Modals/MultiEventFeedBack'
import {
  CreateUserFeedbackResponsePayload,
  EventRequestPayload,
  FeedDetailsPayload,
  FeedResponsePayload,
  RemoveCalendarEvent,
  UserFeedbackRequestPayload,
} from 'candid/ts/konecta.did'
import Emitter, { EventParams } from 'services/emitter'
import { UserPayload } from 'entity/UserModel'
import { getVideoEmbedUrl, isVideoUrl } from 'utils/common/common'
import indexActorServiceInstance from 'services/indexService'
import { useIdentityKit } from '@nfid/identitykit/react'

const dummyEvent = eventData as unknown as FeedResponsePayload

interface ActionConfig {
  label: string
  icon?: ReactNode
  onPress: () => void
  btnVariant: 'btn-primary' | 'btn-secondary'
}

interface EventActionsProps {
  primaryActions: ActionConfig[]
  secondaryActions: ActionConfig[]
  isMobile: boolean
  isCancelledEvent?: boolean
}

type NotificationTypes =
  | 'JOINED_SUCCESS'
  | 'JOINED_FAILED'
  | 'CANCELLED_SUCCESS'
  | 'WITHDRAW_SUCCESS'
  | 'WITHDRAW_FAILED'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'FEEDBACK_SUCCESS'
  | 'FEEDBACK_FAILED'
  | 'RECORDING_SUCCESS'
  | 'RECORDING_FAILED'
interface NotificationProps {
  boldText: string
  iconID: number
  smallText: (event: FeedResponsePayload) => string
  okText: string
  closeText: undefined | string
  okBtnColor: boolean
}

const NotificationConfig: Record<NotificationTypes, NotificationProps> = {
  JOINED_SUCCESS: {
    boldText: 'Added to calendar',
    iconID: 2,
    smallText: (event: FeedResponsePayload) =>
      `Successfully added ${event.name} to your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  JOINED_FAILED: {
    boldText: 'Event addition failed',
    iconID: 1,
    smallText: (event: FeedResponsePayload) =>
      `Cannot add event to calendar for ${event.name}`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  CANCELLED_SUCCESS: {
    boldText: 'Event Cancelled',
    iconID: 2,
    smallText: (event: FeedResponsePayload) =>
      `Successfully cancelled ${event.name} from your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  WITHDRAW_SUCCESS: {
    boldText: 'Event Withdrawn',
    iconID: 2,
    smallText: (event: FeedResponsePayload) =>
      `Successfully withdrawn ${event.name} from your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  WITHDRAW_FAILED: {
    boldText: 'Event withdrawal failed',
    iconID: 1,
    smallText: (event: FeedResponsePayload) =>
      `Cannot withdraw ${event.name} from your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  PAYMENT_SUCCESS: {
    boldText: 'Payment Completed',
    iconID: 2,
    smallText: (event: FeedResponsePayload) =>
      `Payment successful for ${event.name}`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  PAYMENT_FAILED: {
    boldText: 'Payment Failed',
    iconID: 1,
    smallText: (event: FeedResponsePayload) =>
      `Payment failed for ${event.name}`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  FEEDBACK_SUCCESS: {
    boldText: 'Success',
    iconID: 2,
    smallText: (event: FeedResponsePayload) =>
      'Feedback submitted successfully!',
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  FEEDBACK_FAILED: {
    boldText: 'Error',
    iconID: 1,
    smallText: (event: FeedResponsePayload) =>
      'Error while submitting feedback',
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  RECORDING_SUCCESS: {
    boldText: 'Success',
    iconID: 2,
    smallText: (event: FeedResponsePayload) => 'Recording posted successfully!',
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  RECORDING_FAILED: {
    boldText: 'Error',
    iconID: 1,
    smallText: (event: FeedResponsePayload) => 'Error while posting recording',
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
}

const EventActions = ({
  primaryActions,
  secondaryActions,
  isMobile = false,
  isCancelledEvent = false,
}: EventActionsProps) => {
  const renderPrimaryActions = primaryActions.map(
    ({ label, icon, btnVariant, onPress }) => {
      if (label !== '') {
        return (
          <button key={label} onClick={onPress} className={`${btnVariant}`}>
            {icon ? <span>{icon}</span> : null}
            {label}
          </button>
        )
      }
      return <></>
    },
  )

  const renderSecondaryActions = secondaryActions.map(
    ({ label, icon, btnVariant, onPress }) => {
      return (
        <button
          key={label}
          onClick={onPress}
          className={`${btnVariant} flex-1`}
        >
          {icon ? <span>{icon}</span> : null}
          {label}
        </button>
      )
    },
  )

  const renderCanceledEventText = () => {
    return (
      <p className="text-center text-white ty-text-2">
        Event has been canceled
      </p>
    )
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-[12px] p-[24px]">
        {isCancelledEvent ? renderCanceledEventText() : renderPrimaryActions}
        {renderSecondaryActions}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-[12px] border-[#FFFFFF1A] pb-[12px] border-b w-full">
        {isCancelledEvent ? renderCanceledEventText() : renderPrimaryActions}
      </div>
      <div className="flex gap-[12px] w-full">{renderSecondaryActions}</div>
    </>
  )
}

const EventDetail = () => {
  const [event, setEvent] = useState<FeedDetailsPayload | undefined>()
  const pid = useAppSelector((state) => state.auth.pid)
  const [shareLinks, setShareLinks] = useState(false)
  const [addMembers, setAddMembers] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMobileActionVisible, setIsMobileActionVisible] =
    useState<boolean>(false)
  const [showApplyForm, setShowApplyForm] = useState<boolean>(false)
  const [visibleNotification, setVisibleNotification] = useState<
    '' | NotificationTypes
  >('')
  const [eventStatus, setEventStatus] = useState<string>('')
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const principalId: string = useAppSelector((state) => {
    return state.auth.pid
  })
  const userData = useAppSelector(
    (state) => state.user.userProfile as UserPayload,
  )
  const eventAttendees = useAppSelector((state) => state.event.eventAttendees)

  const [searchParams, setSearchParams] = useSearchParams()

  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false)
  const [showPostRecordingModal, setShowPostRecordingModal] =
    useState<boolean>(false)
  const [isRecordingVisible, setIsRecordingVisible] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { event_id } = useParams()

  const handleShareLinksOpen = () => {
    setShareLinks(true)
    hideMobileActions()
  }
  const handleShareLinksClose = () => {
    setShareLinks(false)
  }

  const handlePostRecordingOpen = () => {
    setShowPostRecordingModal(true)
  }

  const handlePostRecordingClose = () => {
    setShowPostRecordingModal(false)
  }

  const handleWatchRecording = () => {
    setIsRecordingVisible(true)
  }

  const closeRecordingPopup = () => {
    setIsRecordingVisible(false)
  }

  const handleAddMemebersOpen = () => {
    setAddMembers(true)
    hideMobileActions()
  }
  const handleAddMemebersClose = () => {
    setAddMembers(false)
  }

  const handleShowApplyForm = () => {
    setShowApplyForm(true)
    hideMobileActions()
  }
  const handleCloseApplyForm = () => {
    setShowApplyForm(false)
  }

  const showMobileActions = () => {
    setIsMobileActionVisible(true)
  }
  const hideMobileActions = () => {
    setIsMobileActionVisible(false)
  }

  const handleShowNotification = (type: NotificationTypes) => {
    setVisibleNotification(type)
  }
  const handleCloseNotification = () => {
    if (visibleNotification === '') return
    if (visibleNotification === 'PAYMENT_SUCCESS') {
      navigate('/calendar')
    } else if (
      visibleNotification !== 'PAYMENT_FAILED' &&
      visibleNotification !== 'JOINED_FAILED'
    ) {
      navigate(-1)
    }
    setVisibleNotification('')
  }

  const { agent } = useIdentityKit()

  const handleAddEventToCalendar = async () => {
    try {
      // dispatch(setIsAppLoading(true))
      if (typeof event === 'undefined') return
      dispatch(setLoader(true))
      // setIsLoading(true)
      console.log('req - joinPublicEvent - EventDetail111', event.event_id)

      if (event.price_token === 'ICP') {
        await getICPApproval(
          principalId,
          event.subaccount_id_hex,
          event.event_id,
          event.token_amount,
          agent,
        )
      } else if (event.price_token === 'CKBTC') {
        await getCKBTCApproval(
          principalId,
          event.subaccount_id_hex,
          event.event_id,
          event.token_amount,
          agent,
        )
      }

      const resp = await konectaActorServiceInstance.joinPublicEvent(
        event.event_id,
      )
      console.log('resp - joinPublicEvent - EventDetail111', resp)
      handleShowNotification('JOINED_SUCCESS')
      dispatch(setLoader(false))
      // dispatch(setIsAppLoading(false))
      // setIsLoading(false)
      // navigate('/feeds')
    } catch (e) {
      console.log('error - joinPublicEvent - EventDetail111', e)
      // setIsLoading(false)
      // dispatch(setIsAppLoading(false))
      dispatch(setLoader(false))
      handleShowNotification('JOINED_FAILED')
    } finally {
      dispatch(setLoader(false))
    }
  }

  const handleCancelEvent = async () => {
    try {
      if (typeof event === 'undefined') return
      dispatch(setIsAppLoading(true))
      setIsLoading(true)
      console.log('req - cancelKonectaEvent - EventDetail111', event.event_id)
      const resp = await konectaActorServiceInstance.cancelKonectaEvent(
        event.event_id,
      )
      console.log('resp - cancelKonectaEvent - EventDetail111', resp)
      handleShowNotification('CANCELLED_SUCCESS')
      dispatch(setIsAppLoading(false))
      setIsLoading(false)
    } catch (e) {
      console.log('error - cancelKonectaEvent - EventDetail111', e)
      dispatch(setIsAppLoading(false))
      setIsLoading(false)
    }
  }

  const handleWithdrawEvent = async () => {
    try {
      if (typeof event === 'undefined') return
      dispatch(setIsAppLoading(true))
      setIsLoading(true)

      const removeCalendarReq: RemoveCalendarEvent = {
        event_id: event.event_id,
      }
      console.log(
        'removeCalendarReq - withdrawEventPartipication - EventDetail111',
        removeCalendarReq,
      )
      const withDrawResp =
        await konectaActorServiceInstance.withdrawEventPartipication(
          removeCalendarReq,
        )
      console.log(
        'withDrawResp - withdrawEventPartipication - EventDetail111',
        withDrawResp,
      )
      handleShowNotification('WITHDRAW_SUCCESS')
      dispatch(setIsAppLoading(false))
      setIsLoading(false)
    } catch (e) {
      console.log('error - withdrawEventPartipication - EventDetail111', e)
      dispatch(setIsAppLoading(false))
      setIsLoading(false)
      handleShowNotification('WITHDRAW_FAILED')
    }
  }

  const handleEmailFeedbackSubmit = async (eventFeedbackForm: any) => {
    try {
      if (typeof event === 'undefined') return
      dispatch(setLoader(true))
      setShowFeedbackModal(false)
      console.log('email - eventFeedbackForm', eventFeedbackForm)

      const userFeedbackRequests: Array<UserFeedbackRequestPayload> = []
      for (const eventId in eventFeedbackForm) {
        const response = eventFeedbackForm[eventId]
        const userFeedbackRequestPayload: UserFeedbackRequestPayload = {
          timezone: userData.timezone,
          recording_link: [],
          firstname: userData.firstname,
          username: userData.username,
          email: userData.email,
          rating: response.isCompleted === 'YES' ? [response.rating] : [],
          event_id: eventId,
          successful:
            response.isCompleted === 'YES' ? { Yes: null } : { No: null },
          lastname: userData?.lastname,
          reason: response.isCompleted === 'YES' ? [] : [response.reason],
        }
        userFeedbackRequests.push(userFeedbackRequestPayload)
      }

      const feedbackResp =
        await konectaActorServiceInstance.insertMultipleUserFeedback(
          userFeedbackRequests,
        )
      console.log('email - feedbackResp', feedbackResp)

      dispatch(setLoader(false))
      handleShowNotification('FEEDBACK_SUCCESS')
    } catch (e) {
      console.log('email - handleEmailFeedbackSubmit - error', e)
      dispatch(setLoader(false))
      setShowFeedbackModal(false)
      handleShowNotification('FEEDBACK_FAILED')
    }
  }

  const handlePostRecordingSubmit = async (feedbackRequests: any) => {
    try {
      dispatch(setLoader(true))
      console.log(
        'handlePostRecordingSubmit - feedbackRequests',
        feedbackRequests,
      )
      if (typeof indexActorServiceInstance.userCanisterId === 'undefined') {
        dispatch(setLoader(false))
        throw "User Canister Id is not available. Can't post recording."
      }
      setShowPostRecordingModal(false)
      const allFeedbackRequests: Array<UserFeedbackRequestPayload> = []
      for (const eventId in feedbackRequests) {
        const response = feedbackRequests[eventId]
        const userFeedbackRequestPayload: UserFeedbackRequestPayload = {
          timezone: userData.timezone,
          recording_link: [response.recordingLink],
          firstname: userData.firstname,
          username: userData.username,
          email: userData.email,
          rating: [],
          event_id: eventId,
          successful: { Yes: null },
          lastname: userData?.lastname,
          reason: [],
        }
        allFeedbackRequests.push(userFeedbackRequestPayload)
      }
      const feedbackResponses: CreateUserFeedbackResponsePayload[] =
        await konectaActorServiceInstance.insertMultipleUserFeedback(
          allFeedbackRequests,
        )
      console.log(
        'handlePostRecordingSubmit - feedbackResponses',
        feedbackResponses,
      )
      const updateKonectaRequests: Array<EventRequestPayload> = []
      for (const feedbackResponse of feedbackResponses) {
        // feedbackResponses.map((feedbackResponse) => {
        const konectaEventData = feedbackResponse.konectaEventData
        const response = feedbackRequests[konectaEventData.event_id]
        updateKonectaRequests.push({
          event_name: konectaEventData.event_name,
          event_description: konectaEventData.event_description,
          status:
            konectaEventData.status === 'Draft'
              ? { Draft: null }
              : konectaEventData.status === 'Created'
              ? { Created: null }
              : { Canceled: null },
          categories: konectaEventData.categories,
          token_amount: [Number(konectaEventData.token_amount)],
          price_token:
            konectaEventData.price_token === 'ICP'
              ? [{ ICP: null }]
              : konectaEventData.price_token === 'FREE'
              ? [{ FREE: null }]
              : [{ CKBTC: null }],
          interests:
            konectaEventData.interests.length > 0
              ? [konectaEventData.interests]
              : [],
          metadata: [konectaEventData.metadata],
          end_date: konectaEventData.end_date,
          start_date: konectaEventData.start_date,
          user_id:
            konectaEventData.user_id.length > 0
              ? [konectaEventData.user_id]
              : [],
          consultations:
            konectaEventData.consultations.length > 0
              ? [konectaEventData.consultations]
              : [],
          expertise:
            konectaEventData.expertise.length > 0
              ? [konectaEventData.expertise.trim()]
              : [],
          event_id: konectaEventData.event_id,
          event_type:
            konectaEventData.event_type === 'Request'
              ? { Request: null }
              : { Offer: null },
          showcase_link:
            konectaEventData.showcase_link.length > 0
              ? [konectaEventData.showcase_link]
              : [],
          recording_visibility:
            response.recordingVisibility === 'PUBLIC'
              ? [{ Public: null }]
              : [{ Private: null }],
          is_recording_available: [true],
          participation_type:
            konectaEventData.participation_type === 'PersonToPerson'
              ? [{ PersonToPerson: null }]
              : [{ PersonToMultiplePersons: null }],
        })
      }
      console.log(
        'handlePostRecordingSubmit - updateKonectaRequests',
        updateKonectaRequests,
      )
      const konectaUpdateResp =
        await konectaActorServiceInstance.updateMultipleKonectaEvents(
          indexActorServiceInstance.userCanisterId,
          updateKonectaRequests,
        )
      console.log(
        'handlePostRecordingSubmit - konectaUpdateResp',
        konectaUpdateResp,
      )

      dispatch(setLoader(false))
      handleShowNotification('RECORDING_SUCCESS')
    } catch (e) {
      console.log('handlePostRecordingSubmit - error', e)
      dispatch(setLoader(false))
      handleShowNotification('RECORDING_FAILED')
    }
  }

  const fetchEventDetails = useCallback(
    async (eventId: string) => {
      try {
        dispatch(setIsAppLoading(true))
        const allPromise = []
        allPromise.push(
          konectaActorServiceInstance.getFeedDetailsByEventId(eventId),
        )
        allPromise.push(
          konectaActorServiceInstance.getUserStatusForEvent(eventId),
        )
        const allData = await Promise.all(allPromise)
        console.log('allData - fetchEventDetails - EventDetail111', allData)

        const eventDetails: FeedDetailsPayload =
          allData[0] as FeedDetailsPayload
        if (
          typeof eventDetails !== 'undefined' &&
          typeof eventDetails !== 'string'
        ) {
          setEvent(eventDetails)
          dispatch(setUserEventDetail(eventDetails))
        }
        const userEventStatus = allData[1]
        if (typeof userEventStatus === 'string') {
          setEventStatus(userEventStatus)
        }
        setIsLoading(false)
        dispatch(setIsAppLoading(false))
      } catch (e) {
        setIsLoading(false)
        console.log('error - getFeedDetailsByEventId', e)
        dispatch(setIsAppLoading(false))
      }
    },
    [dispatch],
  )

  useEffect(() => {
    if (typeof event_id !== 'undefined' && event_id?.length > 0) {
      fetchEventDetails(event_id)
    }
  }, [fetchEventDetails, event_id])

  useEffect(() => {
    const refreshEventDetails = (params: EventParams) => {
      if (
        params.eventName === 'REFRESH_EVENT' &&
        params.payload.eventId === event_id
      ) {
        fetchEventDetails(event_id)
      }
    }
    Emitter.on('REFRESH_EVENT', refreshEventDetails)
    return () => {
      Emitter.off('REFRESH_EVENT', refreshEventDetails)
    }
  })

  useEffect(() => {
    const emailFeedback = async () => {
      if (searchParams.has('feedback') && event) {
        // trigger feedback modal here
        const isFeedbackExist =
          await konectaActorServiceInstance.checkIfUserFeedbackExistsForEvent(
            event?.event_id,
          )
        // TODO: add additional check - principalId should match with the one in feedback url
        if (!isFeedbackExist) {
          setShowFeedbackModal(true)
        }
        searchParams.delete('feedback')
        setSearchParams(searchParams, { replace: true })
      }
    }
    emailFeedback()
  }, [searchParams, event, setSearchParams])

  if (!event) {
    return (
      <div className={styles.feedDetail}>
        <div className={styles.header}>
          <Link
            to={'..'}
            onClick={(e) => {
              e.preventDefault()
              navigate(-1)
            }}
          >
            <BackBtnIcon
              width={`${isonTabletOrMobile ? 26 : 40}`}
              height={`${isonTabletOrMobile ? 26 : 40}`}
            />
          </Link>
        </div>

        {isLoading ? (
          <div className="absolute-center">
            <Spinner size="medium" />
          </div>
        ) : (
          <div className="mb-[12px] w-full h-full font-[500] text-[18px] text-[white] text-center max-md:text-[12px]">
            Something went wrong while loading this event
          </div>
        )}
      </div>
    )
  }

  const isMyEvent = event.user_id === pid

  const isPassed = getMomentFromNanoSeconds(event.start_date).isBefore(moment())
  const eventCategoryClass = event.categories?.[0].toLowerCase()

  const showAppliedUsers = isMyEvent && event.event_type === 'Request'

  const getPrimaryActionConfig = (): ActionConfig[] => {
    const actions: ActionConfig[] = []

    if (event.status === 'Canceled') {
      return actions
    }

    if (isMyEvent && !isPassed && event.status === 'Draft') {
      actions.push({
        label: 'Complete Payment',
        icon: <Payment stroke={'white'} height={16} width={16} />,
        onPress: async () => {
          try {
            dispatch(setLoader(true))
            if (event.price_token === 'ICP') {
              await getICPApproval(
                principalId,
                event.subaccount_id_hex,
                event.event_id,
                event.token_amount,
                agent,
              )
            } else if (event.price_token === 'CKBTC') {
              await getCKBTCApproval(
                principalId,
                event.subaccount_id_hex,
                event.event_id,
                event.token_amount,
                agent,
              )
            }

            handleShowNotification('PAYMENT_SUCCESS')
          } catch (e) {
            console.log('error - getApproval - EventDetail111', e)
            dispatch(setLoader(false))
            handleShowNotification('PAYMENT_FAILED')
          } finally {
            dispatch(setLoader(false))
          }
        },
        btnVariant: isonTabletOrMobile ? 'btn-secondary' : 'btn-primary',
      })
    }

    console.log('eventAttendees - EventDetail111', eventAttendees)

    if (isMyEvent && !isPassed && eventAttendees.length === 0) {
      actions.push({
        label: 'Edit event',
        icon: <EditIcon stroke={'white'} height={16} width={16} />,
        onPress: () => {
          navigate(`/edit-event/${event.event_id}`)
        },
        btnVariant: isonTabletOrMobile ? 'btn-secondary' : 'btn-primary',
      })
    }

    if (!isMyEvent) {
      if (event.event_type === 'Request') {
        actions.push({
          label: eventStatus === '' && !isPassed ? 'Apply' : eventStatus,
          icon: eventStatus === '' && !isPassed ? <AddBox /> : null,
          onPress:
            eventStatus === '' && !isPassed ? handleShowApplyForm : () => {},
          btnVariant: 'btn-primary',
        })
      } else {
        actions.push({
          label:
            (eventStatus === '' || eventStatus === 'Withdrawn') && !isPassed
              ? 'Add event to calendar'
              : eventStatus,
          icon:
            (eventStatus === '' || eventStatus === 'Withdrawn') && !isPassed ? (
              <AddOutlined />
            ) : null,
          onPress:
            (eventStatus === '' || eventStatus === 'Withdrawn') && !isPassed
              ? handleAddEventToCalendar
              : () => {},
          btnVariant: isonTabletOrMobile ? 'btn-secondary' : 'btn-primary',
        })
      }

      const canWithdraw =
        (eventStatus === 'Applied' ||
          eventStatus === 'Accepted' ||
          eventStatus === 'Joined') &&
        !isPassed
      actions.push({
        label: canWithdraw ? 'Withdraw' : '',
        icon: canWithdraw ? <RemoveCircle /> : null,
        onPress: canWithdraw ? handleWithdrawEvent : () => {},
        btnVariant: 'btn-primary',
      })
    }

    // if (!isMyEvent && isPassed) {
    //   if (event.event_type === 'Request') {
    //     actions.push({
    //       label: 'Applied',
    //       icon: <AddOutlined />,
    //       onPress: () => {},
    //       btnVariant: 'btn-primary',
    //     })
    //   } else {
    //     actions.push({
    //       label: 'Event added to calendar',
    //       icon: <AddOutlined />,
    //       onPress: () => {},
    //       btnVariant: isonTabletOrMobile ? 'btn-secondary' : 'btn-primary',
    //     })
    //   }
    // }

    if (isMyEvent && !isPassed) {
      actions.push({
        label: 'Cancel',
        icon: <CloseOutlined />,
        onPress: handleCancelEvent,
        btnVariant: 'btn-secondary',
      })
    }

    if (event.is_recording_available && event.recording_link !== '') {
      actions.push({
        label: 'Watch Recording',
        icon: <VideocamOutlined />,
        onPress: handleWatchRecording,
        btnVariant: 'btn-primary',
      })
    }

    return actions
  }

  const getSecondaryActionConfig = (): ActionConfig[] => {
    const actions: ActionConfig[] = []
    actions.push({
      label: 'Share link',
      icon: <ShareOutlined />,
      onPress: handleShareLinksOpen,
      btnVariant: 'btn-secondary',
    })
    // {
    //   label: 'Add members',
    //   onPress: handleAddMemebersOpen,
    //   btnVariant: 'btn-secondary',
    // },

    if (
      isMyEvent &&
      isPassed &&
      !event.is_recording_available &&
      event.recording_link === ''
    ) {
      actions.push({
        label: 'Post Recording',
        onPress: handlePostRecordingOpen,
        btnVariant: 'btn-secondary',
      })
    }
    return actions
  }

  const renderNotification = () => {
    return visibleNotification !== '' ? (
      <Notification
        isOpen={true}
        handleClose={handleCloseNotification}
        handleOk={handleCloseNotification}
        iconID={NotificationConfig[visibleNotification].iconID}
        showCloseButton={true}
        okBtnColor={NotificationConfig[visibleNotification].okBtnColor}
        boldText={NotificationConfig[visibleNotification].boldText}
        smallText={NotificationConfig[visibleNotification].smallText(event)}
        okText={NotificationConfig[visibleNotification].okText}
        closeText={NotificationConfig[visibleNotification].closeText}
        isFooterColumn={true}
      />
    ) : null
  }

  return (
    <>
      {isLoading ? (
        <div className="z-[100] absolute-center w-full h-full">
          <Spinner size="medium" />
        </div>
      ) : null}
      <div className={styles.feedDetail}>
        <div className={styles.header}>
          <Link
            to={'..'}
            onClick={(e) => {
              e.preventDefault()
              navigate(-1)
            }}
          >
            <BackBtnIcon
              width={`${isonTabletOrMobile ? 26 : 40}`}
              height={`${isonTabletOrMobile ? 26 : 40}`}
            />
          </Link>
        </div>
        <div className={styles.container}>
          {isonTabletOrMobile && (
            <div className="flex justify-between mb-[8px]">
              <div className="flex flex-col gap-[7px]">
                <h1 className="font-[500] text-[20px] text-white">
                  {event.name}
                </h1>
                <div className="flex flex-col">
                  <p className="flex items-center gap-[6px] text-[12px] text-white">
                    <span>
                      <CalendarIcon width={16} height={16} />
                    </span>
                    {getMomentFromNanoSeconds(event.start_date).format(
                      'MMM Do, YYYY',
                    )}
                  </p>
                  <p className="flex items-center gap-[6px] text-[12px] text-white">
                    <span>
                      <ClockIcon width={16} height={16} />
                    </span>
                    {getMomentFromNanoSeconds(event.start_date).format(
                      'hh:mm A',
                    )}{' '}
                    -{' '}
                    {getMomentFromNanoSeconds(event.end_date).format('hh:mm A')}
                  </p>
                </div>
              </div>
              <button
                className="flex justify-center items-center bg-[#FFFFFF0D] p-[4px] rounded-[8px] w-[26px] h-[26px] text-white self-end"
                onClick={showMobileActions}
              >
                <MoreVert width={14} height={14} />
              </button>
            </div>
          )}
          <div className="w-[55%] max-md:w-full">
            <div
              className={`${styles.eventCover} ${styles[eventCategoryClass]} w-full flex flex-row`}
            >
              {/* Content Div */}
              <div className="text-white bg-[#2E2D43] w-1/2 p-4 flex flex-col justify-center">
                <p className="mb-[20px] max-md:mb-[14px] text-[30px] max-md:text-[13px]">
                  {event.userData.firstname} {event.userData.lastname}
                </p>
                <p className="w-[300px] max-md:w-[60%] font-[600] text-[52px] max-md:text-[20px] leading-[58px] max-md:leading-[24px] line-clamp-2">
                  {event.name}
                </p>
              </div>

              {/* Image Div */}
              <div className="w-1/2">
                <img
                  src={
                    event.coverphoto.length > 0
                      ? eventActorServiceInstance.getEventCoverImageUrl(
                          event.coverphoto,
                        )
                      : FeedCoverImg
                  }
                  alt="user"
                  className="w-full h-[393px] object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[40px] max-md:gap-[10px] mb-[80px] max-md:mb-[20px]">
              <LinkToUserProfile username={event.userData.username}>
                <div className="inline-flex items-center gap-[12px] bg-[#FFFFFF0A] pr-[20px] rounded-full w-fit h-[40px] max-md:h-[30px]">
                  <Avatar
                    src={
                      event.userData.profilepic
                        ? userActorServiceInstance.getUserImageUrl(
                            event.userData.canister_id,
                            event.userData.profilepic,
                          )
                        : UserIcon
                    }
                    sx={{
                      width: { xs: '30px', md: '40px' },
                      height: { xs: '30px', md: '40px' },
                      border: {
                        xs: '2px solid #28292D',
                        md: '4px solid #28292D',
                      },
                    }}
                    sizes="lg"
                  />
                  <p className="text-[#FFFFFF99] text-[14px] max-md:text-[12px]">
                    Hosted by{' '}
                    <span className="text-white">
                      {event.userData.firstname} {event.userData.lastname}
                    </span>
                  </p>
                </div>
              </LinkToUserProfile>
              {event.expertise ||
              event.consultations.length > 0 ||
              event.location ||
              event.showcase_link ? (
                <div className="flex flex-col gap-[12px] max-md:gap-[8px] text-[18px] text-left text-white max-md:text-[13px]">
                  {event.expertise ? (
                    <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
                      Host expertise (years){' '}
                      <span className="text-white">{event.expertise}</span>
                    </p>
                  ) : null}
                  {event.consultations.length > 0 ? (
                    <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
                      Type of consultations{' '}
                      <span className="text-white">
                        {event.consultations.join(', ')}
                      </span>
                    </p>
                  ) : null}
                  {event.location.length > 0 &&
                  (isMyEvent || eventStatus === 'Joined') ? (
                    <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px] truncate">
                      Location{' '}
                      {checkIsUrl(event.location) ? (
                        <a
                          href={event.location}
                          className="text-[#337FF5] underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {event.location}
                        </a>
                      ) : (
                        <span className="text-white">{event.location}</span>
                      )}
                    </p>
                  ) : null}
                  {event.showcase_link &&
                  checkIsUrl(preprendProtocolToUrl(event.showcase_link)) ? (
                    <div className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
                      Showcase:{' '}
                      {isVideoUrl(event.showcase_link) ? (
                        <div className="aspect-w-4 aspect-h-3 h-[300px] max-md:h-[200px]">
                          <iframe
                            src={getVideoEmbedUrl(event.showcase_link)}
                            title="Showcase Video"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          ></iframe>
                        </div>
                      ) : (
                        <Link
                          to={preprendProtocolToUrl(event.showcase_link)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#337FF5] underline truncate block"
                        >
                          {event.showcase_link}
                        </Link>
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {isonTabletOrMobile && showAppliedUsers ? (
                <AppliedUsers event={event} />
              ) : null}
              {isonTabletOrMobile ? <Attendees event={event} /> : null}

              <div className="flex flex-col gap-[12px] text-[18px] text-justify text-white max-md:text-[13px]">
                <p className="text-[#A6A5AE]">Description</p>
                <p className="flex flex-col gap-[10px] text-left whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
              <div className="flex flex-col gap-[12px] max-md:gap-[8px]">
                <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
                  Price{' '}
                  <span className="text-white">
                    {event.price_token === 'FREE'
                      ? event.price_token
                      : `${event.token_amount} ${event.price_token}`}
                  </span>
                </p>
                <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
                  Idioma <span className="text-white">{event.language}</span>
                </p>
                <p className="text-[#FFFFFF99] text-[18px] max-md:text-[13px]">
                  Timezone{' '}
                  <span className="text-white">{event?.userData.timezone}</span>
                </p>
              </div>
              <div className="flex flex-row flex-wrap justify-start items-start gap-[8px]">
                {event.categories.map((category, index) => (
                  <Tags
                    text={category}
                    color={category.toLowerCase()}
                    size={`${isonTabletOrMobile ? 'small' : 'medium'}`}
                    key={index}
                  />
                ))}
                {event.interests.map((interest, index) => (
                  <Tags
                    text={interest}
                    color={interest.toLowerCase()}
                    size={`${isonTabletOrMobile ? 'small' : 'medium'}`}
                    key={index}
                  />
                ))}
              </div>
            </div>
            {/* <div className="border-[#FFFFFF0D] py-[20px] border-t text-[18px] text-white max-md:text-[13px]">
              <p className="text-[#A6A5AE]">Reviews</p>
              <p>No reviews yet</p>
            </div> */}
          </div>

          {!isonTabletOrMobile && (
            <div className="flex flex-col gap-[40px] py-[40px] w-[40%]">
              <div className="flex flex-col gap-[16px]">
                <h1 className="font-[500] text-[36px] text-white">
                  {event.name}
                </h1>
                <div className="flex gap-[20px]">
                  <p className="flex items-center gap-[6px] text-[14px] text-white">
                    <span>
                      <CalendarIcon width={18} height={18} />
                    </span>
                    {getMomentFromNanoSeconds(event.start_date).format(
                      'MMM Do, YYYY',
                    )}
                  </p>
                  <p className="flex items-center gap-[6px] text-[14px] text-white">
                    <span>
                      <ClockIcon width={18} height={18} />
                    </span>
                    {getMomentFromNanoSeconds(event.start_date).format(
                      'hh:mm A',
                    )}{' '}
                    -{' '}
                    {getMomentFromNanoSeconds(event.end_date).format('hh:mm A')}
                  </p>
                </div>
              </div>

              <EventActions
                primaryActions={getPrimaryActionConfig()}
                secondaryActions={getSecondaryActionConfig()}
                isMobile={false}
                isCancelledEvent={event.status === 'Canceled'}
              />

              {showAppliedUsers ? <AppliedUsers event={event} /> : null}
              <Attendees event={event} />
            </div>
          )}
        </div>

        {isonTabletOrMobile ? (
          <Drawer
            open={isMobileActionVisible}
            onClose={hideMobileActions}
            anchor="bottom"
            sx={{
              '& .MuiDrawer-paper': {
                background: 'none',
              },
            }}
          >
            <div className="bg-[#201F34] rounded-t-[12px]">
              <div className="flex flex-col items-center border-b-[#29283C] border-b-[1px] h-[35px]">
                <div className="bg-[#29283C] mt-[10px] rounded-full w-[50px] h-[5px]"></div>
              </div>
              <EventActions
                primaryActions={getPrimaryActionConfig()}
                secondaryActions={getSecondaryActionConfig()}
                isMobile={true}
                isCancelledEvent={event.status === 'Canceled'}
              />
            </div>
          </Drawer>
        ) : null}

        <ApplyForEventRequest
          eventId={event.event_id}
          isOpen={showApplyForm}
          handleClose={handleCloseApplyForm}
        />

        <ShareLinks isOpen={shareLinks} handleClose={handleShareLinksClose} />
        <InviteMembers
          isOpen={addMembers}
          handleClose={handleAddMemebersClose}
        />

        {renderNotification()}
      </div>
      {showFeedbackModal ? (
        <MultiEventFeedBack
          isOpen={true}
          onClose={() => {}}
          onSubmit={handleEmailFeedbackSubmit}
          formUid="EMAIL_EVENT_COMPLETE_CONFIRMATION"
          events={[{ ...event, konectaMetadata: [], eventMetadata: [] }]}
        />
      ) : null}
      {showPostRecordingModal ? (
        <MultiEventFeedBack
          isOpen={true}
          onClose={() => {
            setShowPostRecordingModal(false)
          }}
          onSubmit={handlePostRecordingSubmit}
          formUid="EVENT_POST_RECORDING"
          events={[{ ...event, konectaMetadata: [], eventMetadata: [] }]}
        />
      ) : null}
      {isRecordingVisible && (
        <Dialog
          open={isRecordingVisible}
          onClose={closeRecordingPopup}
          maxWidth="lg"
          fullWidth
          sx={{ backgroundColor: '#201F34' }}
        >
          <DialogTitle sx={{ backgroundColor: '#201F34', color: '#ffffff' }}>
            {`${event.name} recording`}
            <IconButton
              aria-label="close"
              onClick={closeRecordingPopup}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseOutlined />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#201F34' }}>
            <iframe
              width="100%"
              height="500px"
              src={event.recording_link.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${event.name} recording`}
            ></iframe>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default EventDetail
