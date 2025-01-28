import { MenuOutlined } from '@mui/icons-material'
import { Box, Drawer, styled, useMediaQuery } from '@mui/material'
import LogoIcon from 'assets/svg/logo-landing.svg'
import FilterEventCreateButtonGroup from 'components/FilterCreateEventButtonGroup'
import LoaderBar from 'components/LoaderBar'
import Notification from 'components/Modals/Notifications'
import Spinner from 'components/Spinner'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  setAddress,
  setLoader,
  setPrincipalId,
} from 'reduxStore/auth/authAction'
import { setUserEvents } from 'reduxStore/event/eventAction'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import { saveUserProfile } from 'reduxStore/user/userAction'
import konectaActorServiceInstance from 'services/konectaService'
import nfidServiceInstance from 'services/nfidServices'
import userActorServiceInstance from 'services/userService'
import { getRedirectUrl } from 'utils/redirectionUtils'
import SideBar from './SideBar'
import styles from './style.module.css'
import {
  EventRequestPayload,
  FeedResponsePayload,
  UserFeedbackRequestPayload,
} from 'candid/ts/konecta.did'
import { UserPayload } from 'entity/UserModel'
import MultiEventFeedBack from 'components/Modals/MultiEventFeedBack/MultiEventFeedBack'
import { useIdentityKit } from '@nfid/identitykit/react'
import { HttpAgent } from '@dfinity/agent'
import indexActorServiceInstance from 'services/indexService'
import FloatingEventProgress from 'components/FloatingEventProgress'

export default function Layout() {
  const [showCongrates, setShowCongrates] = useState(false)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const [isLoading, setIsloading] = useState<boolean>(true)
  const location = useLocation()

  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const [waitForActorInit, setWaitForActorInit] = useState(true)
  const [showSuccess, setShowSuccess] = useState(-1)
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false)
  const [feedbackEvents, setFeedbackEvents] = useState<
    Array<FeedResponsePayload>
  >([])
  const userData = useAppSelector(
    (state) => state.user.userProfile as UserPayload,
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { identity, user, disconnect } = useIdentityKit()

  useEffect(() => {
    let isMounted = true

    const timeoutId = setTimeout(() => {
      if (!isMounted) return

      const userCanisterId = localStorage.getItem('userCanisterId')

      if (
        identity &&
        user?.principal &&
        user?.principal.toText() !== '2vxsx-fae' &&
        identity?.getPrincipal().toText() !== '2vxsx-fae' &&
        userCanisterId
      ) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        setWaitForActorInit(false)
        disconnect()
      }
    }, 1000)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [identity, user])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleFeedbackSubmit = async (feedbackRequests: any) => {
    try {
      dispatch(setLoader(true))
      console.log('event submit - feedbackRequests', feedbackRequests)
      setShowFeedbackModal(false)

      if (typeof indexActorServiceInstance.userCanisterId === 'undefined') {
        dispatch(setLoader(false))
        throw "User Canister Id is not available. Can't post feedback."
      }

      const allFeedbackRequests: Array<UserFeedbackRequestPayload> = []
      for (const eventId in feedbackRequests) {
        const response = feedbackRequests[eventId]
        const userFeedbackRequestPayload: UserFeedbackRequestPayload = {
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
          lastname: userData?.lastname,
          reason: [],
        }
        allFeedbackRequests.push(userFeedbackRequestPayload)
      }

      const feedbackResponses =
        await konectaActorServiceInstance.insertMultipleUserFeedback(
          allFeedbackRequests,
        )
      console.log('handleFeedbackSubmit - feedbackResponses', feedbackResponses)
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
            response.isCompleted === 'YES'
              ? response.recordingVisibility === 'PUBLIC'
                ? [{ Public: null }]
                : [{ Private: null }]
              : [],
          is_recording_available:
            response.isCompleted === 'YES' ? [true] : [false],
          participation_type:
            konectaEventData.participation_type === 'PersonToPerson'
              ? [{ PersonToPerson: null }]
              : [{ PersonToMultiplePersons: null }],
        })
      }
      console.log(
        'handleFeedbackSubmit - updateKonectaRequests',
        updateKonectaRequests,
      )

      const konectaUpdateResp =
        await konectaActorServiceInstance.updateMultipleKonectaEvents(
          indexActorServiceInstance.userCanisterId,
          updateKonectaRequests,
        )
      console.log('handleFeedbackSubmit - konectaUpdateResp', konectaUpdateResp)
      dispatch(setLoader(false))
      setShowSuccess(1)
    } catch (e) {
      console.log('handleFeedbackSubmit - error', e)
      dispatch(setLoader(false))
      setShowSuccess(0)
    }
  }

  useEffect(() => {
    const fetchPendingFeedbackEvents = async () => {
      try {
        const pendingFeedbackEvents =
          await konectaActorServiceInstance.getListOfMissingFeedbackEvents()
        console.log(
          'pendingFeedbackEvents - Calendar111',
          pendingFeedbackEvents,
        )
        if (pendingFeedbackEvents.length > 0) {
          setFeedbackEvents(pendingFeedbackEvents)
          setShowFeedbackModal(true)
        }
      } catch (e) {
        console.log('fetchPendingFeedbackEvents - Calendar111 - error', e)
        setShowFeedbackModal(false)
      }
    }
    const loadUserProfileInfo = async () => {
      setIsloading(true)
      try {
        const allPromise = []
        allPromise.push(userActorServiceInstance.getUser())
        allPromise.push(userActorServiceInstance.getAllEventsMetadataForUser())
        allPromise.push(
          konectaActorServiceInstance.getDefaultAccountIdentifier(),
        )

        const allData = await Promise.all(allPromise)

        const userData = allData[0]
        console.log('userData - getUser - Layout111', userData)
        if (userData) {
          console.log('dispatch getUser - Layout111')
          dispatch(saveUserProfile(userData))
        }
        const userEvents = allData[1]
        console.log(
          'userEvents - Layout111 - getAllEventsMetadataForUser',
          userEvents,
        )
        if (typeof userEvents.ok !== 'undefined') {
          console.log(
            'userEvents - Layout111 - getAllEventsMetadataForUser - storing to redux',
            userEvents.ok,
          )
          dispatch(setUserEvents(userEvents.ok))
        }
        const address = allData[2]
        if (typeof address !== 'undefined') {
          console.log('address - Layout111', address)
          dispatch(setAddress(address))
        }
        setIsloading(false)
      } catch (e) {
        // error in fetching user data
        // reset back to landing page
        console.log('loadUserProfileInfo - error', e)
        if (isAuthenticated) {
          disconnect()
          console.log('logout111 called2')
        }
        navigate('landing', { replace: true })
      }
      setIsloading(false)
    }
    if (isAuthenticated && !waitForActorInit) {
      fetchPendingFeedbackEvents()
      loadUserProfileInfo()
    }

    // adding navigate and dispatch in this dependancy list breaks the navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, waitForActorInit])

  const { shouldRedirect, redirectPath } = getRedirectUrl(
    location,
    Boolean(isAuthenticated),
  )

  useEffect(() => {
    const login = async () => {
      if (
        identity &&
        user?.principal &&
        user?.principal.toText() !== '2vxsx-fae' &&
        identity?.getPrincipal().toText() !== '2vxsx-fae'
      ) {
        dispatch(setPrincipalId(user?.principal.toText()))

        const agent = HttpAgent.createSync({
          identity,
          host: 'https://icp0.io',
        })

        await indexActorServiceInstance.initV2(agent, identity)

        const allPromise = []
        allPromise.push(indexActorServiceInstance.eventActorInit())
        allPromise.push(indexActorServiceInstance.konectaActorInit())
        await Promise.all(allPromise)

        setWaitForActorInit(false)
      }
    }

    if (isAuthenticated) {
      login()
    }
  }, [isAuthenticated, setWaitForActorInit])

  if (waitForActorInit) {
    return (
      <div className="top-0 left-0 z-[2000] absolute flex justify-center items-center w-screen h-screen">
        <Spinner size="medium" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace={true} />
  }

  if (isLoading) {
    return (
      <div className="top-0 left-0 z-[2000] absolute flex justify-center items-center w-screen h-screen">
        <Spinner size="medium" />
      </div>
    )
  }

  // handle redirection for authenticated user for inbound links
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
            {_.includes(['/calendar', '/feeds'], location.pathname) ? (
              <FilterEventCreateButtonGroup isMobile={true} />
            ) : null}
          </div>
        </>
      )}

      <Notification
        isOpen={showCongrates}
        handleClose={handleCongratesClose}
        handleOk={() => {
          console.log('OK btn clicked')
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
          onClose={() => {}}
          onSubmit={handleFeedbackSubmit}
          events={feedbackEvents}
          formUid="EVENT_COMPLETE_CONFIRMATION"
        />
      ) : null}
      {showSuccess !== -1 && (
        <Notification
          isOpen={true}
          handleClose={handleCloseShowSuccess}
          handleOk={() => {
            console.log('OK btn clicked')
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
