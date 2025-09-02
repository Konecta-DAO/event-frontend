import { MenuOutlined } from '@mui/icons-material'
import { Box, Drawer, styled, useMediaQuery } from '@mui/material'
import LogoIcon from 'assets/svg/logo-landing.svg'
import FilterEventCreateButtonGroup from 'components/FilterCreateEventButtonGroup/index.tsx'
import LoaderBar from 'components/LoaderBar/LoaderBar.tsx'
import Notification from 'components/Modals/Notifications/index.tsx'
import _ from 'lodash'
import { useEffect, useState, useCallback } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { setAddress, setLoader } from 'reduxStore/auth/authAction.tsx'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks.tsx'
import konectaActorServiceInstance from 'services/konectaService.tsx'
import { getRedirectUrl } from 'utils/redirectionUtils.ts'
import SideBar from './SideBar/index.tsx'
import styles from './style.module.css'
import type {
  FeedResponsePayload,
  UserFeedbackRequestPayload,
} from 'candid/ts/konecta.did.d.ts'
import type { UpdateMultipleEventsPayload } from 'candid/ts/event.did.d.ts'
import MultiEventFeedBack from 'components/Modals/MultiEventFeedBack/MultiEventFeedBack.tsx'
import { useIdentityKit } from '@nfid/identitykit/react'
import FloatingEventProgress from 'components/FloatingEventProgress/index.tsx'
import { Principal } from '@dfinity/principal'
import type { UserPayload } from 'candid/ts/user.did.d.ts'
import eventActorServiceInstance from 'services/eventService.tsx'

const getStatusVariant = (status: string) => {
  if (status === 'Created') return { Created: null }
  if (status === 'Canceled') return { Canceled: null }
  return { Draft: null }
}

const getEventTypeVariant = (type: string) => {
  return type === 'Request' ? { Request: null } : { Offer: null }
}

const getParticipationTypeVariant = (type: string) => {
  return type === 'PersonToPerson'
    ? { PersonToPerson: null }
    : { PersonToMultiplePersons: null }
}

const getTokenVariant = (token: string) => {
  if (token === 'CKBTC') return { CKBTC: null }
  if (token === 'FREE') return { FREE: null }
  return { ICP: null }
}

const getRecordingVisibilityVariant = (visibility: string) => {
  return visibility === 'Public' ? { Public: null } : { Private: null }
}

export default function Layout() {
  const [showCongrates, setShowCongrates] = useState(false)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { identity } = useIdentityKit()

  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const [showSuccess, setShowSuccess] = useState(-1)
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false)
  const [feedbackEvents, setFeedbackEvents] = useState<
    Array<FeedResponsePayload>
  >([])
  const userData = useAppSelector(
    (state) => state.user.userProfile as UserPayload,
  )
  const isAuthenticated = Boolean(identity)

  const handleFeedbackSubmit = async (feedbackRequests: any) => {
    try {
      dispatch(setLoader(true))
      setShowFeedbackModal(false)

      if (!userData) {
        throw new Error('User data not available to submit feedback.')
      }

      const allFeedbackRequests: Array<UserFeedbackRequestPayload> = Object.keys(
        feedbackRequests,
      ).map((eventId) => {
        const response = feedbackRequests[eventId]
        return {
          timezone: userData.timezone,
          recording_link:
            response.isCompleted === 'YES' ? [response.recordingLink] : [],
          firstname: userData.firstname,
          username: userData.username,
          email: userData.email,
          rating: [],
          event_id: eventId,
          successful:
            response.isCompleted === 'YES' ? { Yes: null } : { No: null },
          lastname: userData.lastname,
          reason: [],
        }
      })

      const feedbackResponses =
        await konectaActorServiceInstance.insertMultipleUserFeedback(
          allFeedbackRequests,
        )

      if ('err' in feedbackResponses) {
        throw new Error(
          `Failed to submit feedback: ${JSON.stringify(feedbackResponses.err)}`,
        )
      }

      const eventUpdates: Array<UpdateMultipleEventsPayload> = (
        feedbackResponses.ok || []
      )
        .map((feedbackResponse) => {
          const konectaEventData = feedbackResponse.konectaEventData
          const userResponse = feedbackRequests[konectaEventData.event_id]

          const originalEvent = feedbackEvents.find(
            (e) => e.event_id === konectaEventData.event_id,
          )
          if (!originalEvent) {
            console.warn(
              `Could not find original event data for eventId: ${konectaEventData.event_id}`,
            )
            return null
          }

          const eventPayload: any = {
            user_id: [Principal.fromText(originalEvent.user_id)],
            name: originalEvent.name,
            description: originalEvent.description,
            location: originalEvent.location,
            start_date: originalEvent.start_date,
            end_date: originalEvent.end_date,
            status: getStatusVariant(originalEvent.status),
            event_type: getEventTypeVariant(originalEvent.event_type),
            participation_type: [
              getParticipationTypeVariant(originalEvent.participation_type),
            ],
            categories: originalEvent.categories,
            price_token: [getTokenVariant(originalEvent.price_token)],
            token_amount: [originalEvent.token_amount],
            subaccount_id_hex: originalEvent.subaccount_id_hex,
            subaccount_id_index: originalEvent.subaccount_id_index,
            language: [originalEvent.language],
            interests: [originalEvent.interests],
            consultations: [originalEvent.consultations],
            expertise: [originalEvent.expertise],
            showcase_link: [originalEvent.showcase_link],
            metadata: [originalEvent.konectaMetadata],
            is_recording_available: [userResponse.isCompleted === 'YES'],
            recording_visibility:
              userResponse.isCompleted === 'YES'
                ? [
                  getRecordingVisibilityVariant(
                    userResponse.recordingVisibility,
                  ),
                ]
                : [],
            coverphoto: [],
          }

          return {
            eventId: konectaEventData.event_id,
            payload: eventPayload,
          }
        })
        .filter(
          (update): update is UpdateMultipleEventsPayload => update !== null,
        )

      if (eventUpdates.length === 0) {
        console.log('No events to update after feedback submission.')
        setShowSuccess(1)
        dispatch(setLoader(false))
        return
      }

      const batchUpdateResponse =
        await eventActorServiceInstance.updateMultipleEvents(
          userData.canister_id.toText(),
          eventUpdates,
        )

      console.log('Batch update response:', batchUpdateResponse)
      if (batchUpdateResponse.failed.length > 0) {
        console.error('Some events failed to update:', batchUpdateResponse.failed)
      }

      setShowSuccess(1)
    } catch (e) {
      console.error('handleFeedbackSubmit - error', e)
      setShowSuccess(0)
    } finally {
      dispatch(setLoader(false))
    }
  }

  useEffect(() => {
    let isMounted = true
    const fetchOtherData = async () => {
      if (isMounted && identity && userData) {
        try {
          const [address, pendingFeedbackEvents] = await Promise.all([
            konectaActorServiceInstance.getDefaultAccountIdentifier(),
            konectaActorServiceInstance.getListOfMissingFeedbackEvents(),
          ])

          if (isMounted) {
            if (typeof address !== 'undefined') {
              dispatch(setAddress(address))
            }
            if (
              'ok' in pendingFeedbackEvents &&
              pendingFeedbackEvents.ok.length > 0
            ) {
              setFeedbackEvents(pendingFeedbackEvents.ok)
              setShowFeedbackModal(true)
            }
          }
        } catch (e) {
          console.error('Failed to fetch other data in Layout:', e)
        }
      }
    }
    fetchOtherData()
    return () => {
      isMounted = false
    }
  }, [identity, userData, dispatch])

  const { shouldRedirect, redirectPath } = getRedirectUrl(
    location,
    isAuthenticated,
  )

  if (shouldRedirect) {
    return <Navigate to={redirectPath} replace={true} />
  }

  if (location.pathname === '/' && !shouldRedirect) {
    return <Navigate to={'/calendar'} />
  }

  const handleCongratesClose = () => {
    setShowCongrates(false)
  }

  const handleCloseShowSuccess = () => {
    setShowSuccess(-1)
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsMobileMenu(open)
    }

  const MobileSideBarMenu = styled(Drawer)<{ component?: React.ElementType }>({
    '& .MuiDrawer-paper': {
      background: '#201F34CC',
      color: '#fff',
    },
  })

  return (
    <div className={styles.layout}>
      <LoaderBar />
      {!isonTabletOrMobile ? (
        <>
          <div className={styles.gradient1}></div>
          <div className={styles.gradient2}></div>
          <div className="top-0 left-0 z-0 fixed w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="1209"
              viewBox="0 0 1209 1209"
              fill="none"
            >
              <g filter="url(#filter0_f_431_49048)">
                <path
                  d="M833.116 524.956C974.2 560.683 1204.91 605.261 1348.17 629.527C1490.14 597.26 1564.83 931.714 1706.47 965.558C1837.35 996.832 2046 794.035 2046 794.035V-186L-112.861 -157.944L-58.9956 299.873C-58.9956 299.873 44.0985 701.301 121.969 714.969C319.258 749.599 343.87 815.48 543.815 820.815C651.411 823.687 728.466 498.455 833.116 524.956Z"
                  fill="#14162C"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_431_49048"
                  x="-352.861"
                  y="-426"
                  width="2638.86"
                  height="1634.84"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="120"
                    result="effect1_foregroundBlur_431_49048"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <SideBar />
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </>
      ) : (
        <>
          <div className={styles.mGradient1}></div>
          <div className="z-10 flex justify-between items-center border-[#ffffff0a] p-[15px] border-b-2 text-white">
            <img
              className=""
              src={LogoIcon}
              alt="logo"
              width={134}
              height={36}
            />
            <button
              className="border-[#9B96B00D] bg-[#A7B4CD0D] border rounded-full w-[48px] h-[48px] text-white/80"
              onClick={toggleDrawer(true)}
            >
              <MenuOutlined width={12} height={12} />
            </button>
            <MobileSideBarMenu
              open={isMobileMenu}
              onClose={toggleDrawer(false)}
              anchor="right"
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onKeyDown={toggleDrawer(false)}
              >
                <SideBar handleSidebarClose={toggleDrawer(false)} />
              </Box>
            </MobileSideBarMenu>
          </div>
          <div className={styles.mainContent}>
            <Outlet />
            {_.includes(['/calendar', '/feed'], location.pathname) ? (
              <FilterEventCreateButtonGroup isMobile={true} />
            ) : null}
          </div>
        </>
      )}

      <Notification
        isOpen={showCongrates}
        handleClose={handleCongratesClose}
        handleOk={() => {
          handleCongratesClose()
        }}
        iconID={2}
        boldText={'Welcome!'}
        smallText={'Nice to meet you!'}
        closeText={'Cancel'}
        okText={'Ok'}
        okBtnColor={true}
      />
      {showFeedbackModal && feedbackEvents.length > 0 ? (
        <MultiEventFeedBack
          isOpen={true}
          onClose={() => { }}
          onSubmit={handleFeedbackSubmit}
          events={
            feedbackEvents.map(
              (event) => ({ ...event, metadata: [] } as any),
            )
          }
          formUid="EVENT_COMPLETE_CONFIRMATION"
        />
      ) : null}
      {showSuccess !== -1 && (
        <Notification
          isOpen={true}
          handleClose={handleCloseShowSuccess}
          handleOk={() => {
            handleCloseShowSuccess()
          }}
          iconID={showSuccess === 1 ? 2 : 1}
          boldText={showSuccess === 1 ? 'Success' : 'Error'}
          smallText={
            showSuccess === 1
              ? 'Feedback submitted successfully!'
              : 'Error while submitting feedback'
          }
          closeText={''}
          okText={'Ok'}
          okBtnColor={showSuccess === 1}
        />
      )}

      <FloatingEventProgress />
    </div>
  )
}