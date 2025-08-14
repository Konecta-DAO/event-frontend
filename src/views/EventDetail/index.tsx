import {
  AddBox,
  AddOutlined,
  CloseOutlined,
  MoreVert,
  Payment,
  RemoveCircle,
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
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  BackBtnIcon,
  CalendarIcon,
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
import { setLoader } from 'reduxStore/auth/authAction'
import { getMomentFromNanoSeconds } from 'utils/dateTimeUtils'
import userActorServiceInstance from 'services/userService'
import MultiEventFeedBack from 'components/Modals/MultiEventFeedBack'
import Emitter, { EventParams } from 'services/emitter'
import { getEventCoverImageUrl, getVideoEmbedUrl, isVideoUrl } from 'utils/common/common'
import indexActorServiceInstance from 'services/indexService'
import {
  EventWithUserDataPayload,
  UpdateMultipleEventsPayload,
} from 'candid/ts/event.did'
import {
  UserFeedbackRequestPayload,
} from 'candid/ts/konecta.did'
import { Principal } from '@dfinity/principal'
import { UserPayload } from 'candid/ts/user.did'

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
  smallText: (event: EventWithUserDataPayload) => string
  okText: string
  closeText: undefined | string
  okBtnColor: boolean
}

const NotificationConfig: Record<NotificationTypes, NotificationProps> = {
  JOINED_SUCCESS: {
    boldText: 'Added to calendar',
    iconID: 2,
    smallText: (event: EventWithUserDataPayload) =>
      `Successfully added ${event.name} to your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  JOINED_FAILED: {
    boldText: 'Event addition failed',
    iconID: 1,
    smallText: (event: EventWithUserDataPayload) =>
      `Cannot add event to calendar for ${event.name}`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  CANCELLED_SUCCESS: {
    boldText: 'Event Cancelled',
    iconID: 2,
    smallText: (event: EventWithUserDataPayload) =>
      `Successfully cancelled ${event.name} from your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  WITHDRAW_SUCCESS: {
    boldText: 'Event Withdrawn',
    iconID: 2,
    smallText: (event: EventWithUserDataPayload) =>
      `Successfully withdrawn ${event.name} from your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  WITHDRAW_FAILED: {
    boldText: 'Event withdrawal failed',
    iconID: 1,
    smallText: (event: EventWithUserDataPayload) =>
      `Cannot withdraw ${event.name} from your calendar`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  PAYMENT_SUCCESS: {
    boldText: 'Payment Completed',
    iconID: 2,
    smallText: (event: EventWithUserDataPayload) =>
      `Payment successful for ${event.name}`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  PAYMENT_FAILED: {
    boldText: 'Payment Failed',
    iconID: 1,
    smallText: (event: EventWithUserDataPayload) =>
      `Payment failed for ${event.name}`,
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  FEEDBACK_SUCCESS: {
    boldText: 'Success',
    iconID: 2,
    smallText: (event: EventWithUserDataPayload) =>
      'Feedback submitted successfully!',
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  FEEDBACK_FAILED: {
    boldText: 'Error',
    iconID: 1,
    smallText: (event: EventWithUserDataPayload) =>
      'Error while submitting feedback',
    okText: 'OK',
    closeText: undefined,
    okBtnColor: false,
  },
  RECORDING_SUCCESS: {
    boldText: 'Success',
    iconID: 2,
    smallText: (event: EventWithUserDataPayload) =>
      'Recording posted successfully!',
    okText: 'OK',
    closeText: undefined,
    okBtnColor: true,
  },
  RECORDING_FAILED: {
    boldText: 'Error',
    iconID: 1,
    smallText: (event: EventWithUserDataPayload) =>
      'Error while posting recording',
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
  const [event, setEvent] = useState<EventWithUserDataPayload | undefined>()
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

  const { event_id } = useParams()

  const hideMobileActions = useCallback(() => {
    setIsMobileActionVisible(false)
  }, [])

  const handleShareLinksOpen = useCallback(() => {
    setShareLinks(true)
    hideMobileActions()
  }, [hideMobileActions])
  const handleShareLinksClose = useCallback(() => {
    setShareLinks(false)
  }, [])

  const handlePostRecordingOpen = useCallback(() => {
    setShowPostRecordingModal(true)
  }, [])

  const handlePostRecordingClose = useCallback(() => {
    setShowPostRecordingModal(false)
  }, [])

  const handleWatchRecording = useCallback(() => {
    setIsRecordingVisible(true)
  }, [])

  const closeRecordingPopup = useCallback(() => {
    setIsRecordingVisible(false)
  }, [])

  const handleAddMemebersOpen = useCallback(() => {
    setAddMembers(true)
    hideMobileActions()
  }, [hideMobileActions])
  const handleAddMemebersClose = useCallback(() => {
    setAddMembers(false)
  }, [])

  const handleShowApplyForm = useCallback(() => {
    setShowApplyForm(true)
    hideMobileActions()
  }, [hideMobileActions])
  const handleCloseApplyForm = useCallback(() => {
    setShowApplyForm(false)
  }, [])

  const showMobileActions = useCallback(() => {
    setIsMobileActionVisible(true)
  }, [])

  const handleShowNotification = useCallback((type: NotificationTypes) => {
    setVisibleNotification(type)
  }, [])
  const handleCloseNotification = useCallback(() => {
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
  }, [navigate, visibleNotification])

  const handleAddEventToCalendar = useCallback(async () => {
    try {
      if (typeof event === 'undefined') return
      dispatch(setLoader(true))

      if (event.price_token !== 'FREE') {
        const transferPayload = {
          eventId: event.event_id,
          priceToken:
            event.price_token === 'ICP'
              ? ({ ICP: null } as const)
              : ({ CKBTC: null } as const),
          amount: BigInt(event.token_amount * 10 ** 8),
          fee: [BigInt(0)] as [bigint],
          memo: [new Uint8Array()] as [Uint8Array],
        }
        await konectaActorServiceInstance.transferAmountFromUserToEventSubAccount(
          transferPayload,
        )
      }

      const joinPayload = {
        event_id: event.event_id,
        invitee_user_id: Principal.fromText(principalId),
        action: { Joined: null },
        timestamp: BigInt(Date.now() * 1_000_000),
        event_status: event.status,
        event_type: event.event_type,
        participation_type: event.participation_type,
        metadata: [] as [],
      }
      await eventActorServiceInstance.addEventAttendee(joinPayload)

      handleShowNotification('JOINED_SUCCESS')
      dispatch(setLoader(false))
    } catch (e) {
      console.error('Failed to add event to calendar:', e)
      dispatch(setLoader(false))
      handleShowNotification('JOINED_FAILED')
    }
  }, [dispatch, event, handleShowNotification, principalId])

  const handleCancelEvent = useCallback(async () => {
    try {
      if (typeof event === 'undefined') return
      dispatch(setIsAppLoading(true))
      await konectaActorServiceInstance.cancelKonectaEvent(event.event_id)
      handleShowNotification('CANCELLED_SUCCESS')
      dispatch(setIsAppLoading(false))
    } catch (e) {
      dispatch(setIsAppLoading(false))
    }
  }, [dispatch, event, handleShowNotification, navigate])

  const handleWithdrawEvent = useCallback(async () => {
    try {
      if (typeof event === 'undefined') return
      dispatch(setIsAppLoading(true))
      await konectaActorServiceInstance.withdrawFromEvent(event.event_id)
      handleShowNotification('WITHDRAW_SUCCESS')
      dispatch(setIsAppLoading(false))
    } catch (e) {
      console.error('Withdrawal failed:', e)
      dispatch(setIsAppLoading(false))
      handleShowNotification('WITHDRAW_FAILED')
    }
  }, [dispatch, event, handleShowNotification, navigate])

  const handleEmailFeedbackSubmit = useCallback(async (eventFeedbackForm: any) => {
    try {
      if (typeof event === 'undefined') return
      dispatch(setLoader(true))
      setShowFeedbackModal(false)

      const userFeedbackRequests: Array<UserFeedbackRequestPayload> = []
      for (const eventId in eventFeedbackForm) {
        const response = eventFeedbackForm[eventId]
        const userFeedbackRequestPayload: UserFeedbackRequestPayload = {
          timezone: userData.timezone,
          recording_link: [],
          firstname: userData.firstname,
          username: userData.username,
          email: userData.email,
          rating:
            response.isCompleted === 'YES' ? [BigInt(response.rating)] : [],
          event_id: eventId,
          successful:
            response.isCompleted === 'YES' ? { Yes: null } : { No: null },
          lastname: userData?.lastname,
          reason: response.isCompleted === 'YES' ? [] : [response.reason],
        }
        userFeedbackRequests.push(userFeedbackRequestPayload)
      }

      await konectaActorServiceInstance.insertMultipleUserFeedback(
        userFeedbackRequests,
      )

      dispatch(setLoader(false))
      handleShowNotification('FEEDBACK_SUCCESS')
    } catch (e) {
      dispatch(setLoader(false))
      setShowFeedbackModal(false)
      handleShowNotification('FEEDBACK_FAILED')
    }
  }, [dispatch, event, handleShowNotification, userData, navigate])

  const handlePostRecordingSubmit = useCallback(async (feedbackRequests: any) => {
    try {
      dispatch(setLoader(true))
      if (typeof indexActorServiceInstance.userCanisterId === 'undefined') {
        dispatch(setLoader(false))
        throw new Error("User Canister Id is not available. Can't post recording.")
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
      const feedbackResponses =
        await konectaActorServiceInstance.insertMultipleUserFeedback(
          allFeedbackRequests,
        )

      if ('err' in feedbackResponses) {
        throw new Error(`Failed to submit feedback: ${feedbackResponses.err}`)
      }

      const updatePayloads: UpdateMultipleEventsPayload[] = []
      for (const feedbackResponse of feedbackResponses.ok) {
        const eventData = feedbackResponse.konectaEventData
        const response = feedbackRequests[eventData.event_id]

        updatePayloads.push({
          eventId: eventData.event_id,
          payload: {
            name: eventData.event_name,
            description: eventData.event_description,
            location: event?.location ?? '',
            start_date: eventData.start_date,
            end_date: eventData.end_date,
            status:
              eventData.status === 'Draft'
                ? { Draft: null }
                : eventData.status === 'Created'
                  ? { Created: null }
                  : { Canceled: null },
            user_id: [],
            coverphoto: [],
            language: [event!.language],
            metadata: [event!.metadata],
            event_type:
              eventData.event_type === 'Request'
                ? { Request: null }
                : { Offer: null },
            participation_type:
              eventData.participation_type === 'PersonToPerson'
                ? [{ PersonToPerson: null }]
                : [{ PersonToMultiplePersons: null }],
            categories: eventData.categories,
            consultations: [eventData.consultations],
            expertise: [eventData.expertise],
            price_token:
              eventData.price_token === 'ICP'
                ? [{ ICP: null }]
                : eventData.price_token === 'FREE'
                  ? [{ FREE: null }]
                  : [{ CKBTC: null }],
            token_amount: [eventData.token_amount],
            interests: [eventData.interests],
            showcase_link: [eventData.showcase_link],
            recording_visibility:
              response.recordingVisibility === 'PUBLIC'
                ? [{ Public: null }]
                : [{ Private: null }],
            is_recording_available: [true],
            subaccount_id_hex: eventData.subaccount_id_hex,
            subaccount_id_index: eventData.subaccount_id_index,
          },
        })
      }

      await eventActorServiceInstance.updateMultipleEvents(
        indexActorServiceInstance.userCanisterId,
        updatePayloads,
      )

      dispatch(setLoader(false))
      handleShowNotification('RECORDING_SUCCESS')
    } catch (e) {
      console.error('Failed to post recording:', e)
      dispatch(setLoader(false))
      handleShowNotification('RECORDING_FAILED')
    }
  }, [dispatch, event, handleShowNotification, userData])

  const fetchEventDetails = useCallback(
    async (eventId: string) => {
      try {
        dispatch(setIsAppLoading(true))
        const [eventDetails, userEventStatus] = await Promise.all([
          eventActorServiceInstance.getEventDetailsWithUserData(eventId),
          eventActorServiceInstance.getAttendeeStatusForEvent(
            Principal.fromText(principalId),
            eventId,
          ),
        ])

        if (eventDetails && eventDetails.event_id) {
          setEvent(eventDetails)
          dispatch(setUserEventDetail(eventDetails))
        }

        if (typeof userEventStatus === 'string') {
          setEventStatus(userEventStatus)
        }
        setIsLoading(false)
        dispatch(setIsAppLoading(false))
      } catch (e) {
        console.error('Failed to fetch event details:', e)
        setIsLoading(false)
        dispatch(setIsAppLoading(false))
      }
    }, [dispatch, principalId, navigate])

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
  }, [event_id, fetchEventDetails])

  useEffect(() => {
    const emailFeedback = async () => {
      if (searchParams.has('feedback') && event) {
        const isFeedbackExist =
          await konectaActorServiceInstance.checkIfUserFeedbackExistsForEvent(
            event?.event_id,
          )
        if (!isFeedbackExist) {
          setShowFeedbackModal(true)
        }
        searchParams.delete('feedback')
        setSearchParams(searchParams, { replace: true })
      }
    }
    emailFeedback()
  }, [searchParams, event, setSearchParams])

  const isMyEvent = event?.user_id === pid
  const isPassed = event ? getMomentFromNanoSeconds(event.start_date).isBefore(moment()) : false

  const primaryActions = useMemo(() => {
    if (!event) return []

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
            await konectaActorServiceInstance.transferAmountFromUserToEventSubAccount(
              {
                eventId: event.event_id,
                priceToken:
                  event.price_token === 'ICP'
                    ? { ICP: null }
                    : { CKBTC: null },
                amount: BigInt(event.token_amount * 10 ** 8),
                fee: [BigInt(0)],
                memo: [],
              },
            )

            handleShowNotification('PAYMENT_SUCCESS')
          } catch (e) {
            dispatch(setLoader(false))
            handleShowNotification('PAYMENT_FAILED')
          } finally {
            dispatch(setLoader(false))
          }
        },
        btnVariant: isonTabletOrMobile ? 'btn-secondary' : 'btn-primary',
      })
    }

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
            eventStatus === '' && !isPassed ? handleShowApplyForm : () => { },
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
              : () => { },
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
        onPress: canWithdraw ? handleWithdrawEvent : () => { },
        btnVariant: 'btn-primary',
      })
    }

    if (isMyEvent && !isPassed) {
      actions.push({
        label: 'Cancel',
        icon: <CloseOutlined />,
        onPress: handleCancelEvent,
        btnVariant: 'btn-secondary',
      })
    }

    if (event.is_recording_available && event.recording_visibility[0]) {
      actions.push({
        label: 'Watch Recording',
        icon: <VideocamOutlined />,
        onPress: handleWatchRecording,
        btnVariant: 'btn-primary',
      })
    }

    return actions
  }, [
    event,
    isMyEvent,
    isPassed,
    isonTabletOrMobile,
    eventAttendees.length,
    navigate,
    eventStatus,
    handleShowApplyForm,
    handleAddEventToCalendar,
    handleWithdrawEvent,
    handleCancelEvent,
    handleWatchRecording,
    dispatch,
    handleShowNotification,
  ])

  const secondaryActions = useMemo(() => {
    if (!event) return []

    const actions: ActionConfig[] = []
    actions.push({
      label: 'Share link',
      icon: <ShareOutlined />,
      onPress: handleShareLinksOpen,
      btnVariant: 'btn-secondary',
    })

    if (
      isMyEvent &&
      isPassed &&
      !event.is_recording_available &&
      !event.recording_visibility[0]
    ) {
      actions.push({
        label: 'Post Recording',
        onPress: handlePostRecordingOpen,
        btnVariant: 'btn-secondary',
      })
    }
    return actions
  }, [event, isMyEvent, isPassed, handleShareLinksOpen, handlePostRecordingOpen])

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

  const eventCategoryClass = event.categories?.[0].toLowerCase()

  const showAppliedUsers = isMyEvent && event.event_type === 'Request'

  const renderNotification = () => {
    if (visibleNotification === '') return null;
    const config = NotificationConfig[visibleNotification];
    return (
      <Notification
        isOpen={true}
        handleClose={handleCloseNotification}
        handleOk={handleCloseNotification}
        iconID={config.iconID}
        showCloseButton={true}
        okBtnColor={config.okBtnColor}
        boldText={config.boldText}
        smallText={config.smallText(event)}
        okText={config.okText}
        closeText={config.closeText}
        isFooterColumn={true}
      />
    );
  };

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
                      ? getEventCoverImageUrl(
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
              {(event.expertise ||
                event.consultations.length > 0 ||
                event.location ||
                event.showcase_link) && (
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
                )}

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
                primaryActions={primaryActions}
                secondaryActions={secondaryActions}
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
                primaryActions={primaryActions}
                secondaryActions={secondaryActions}
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
      {showFeedbackModal && (
        <MultiEventFeedBack
          isOpen={true}
          onClose={() => { }}
          onSubmit={handleEmailFeedbackSubmit}
          formUid="EMAIL_EVENT_COMPLETE_CONFIRMATION"
          events={[{ ...event }]}
        />
      )}
      {showPostRecordingModal && (
        <MultiEventFeedBack
          isOpen={true}
          onClose={() => {
            setShowPostRecordingModal(false)
          }}
          onSubmit={handlePostRecordingSubmit}
          formUid="EVENT_POST_RECORDING"
          events={[{ ...event }]}
        />
      )}
      {isRecordingVisible && event.recording_visibility[0] && (
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
              src={getVideoEmbedUrl(event.recording_visibility[0])}
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