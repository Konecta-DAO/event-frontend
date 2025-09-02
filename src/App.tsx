import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Layout from './components/Layout/index.tsx'
import Landing from './views/Landing/index.tsx'
import PageNotFound from './views/PageNotFound/index.tsx'
import Help from './views/Help/index.tsx'
import Calendar from './views/Calendar/index.tsx'
import Feed from './views/Feed/index.tsx'
import Chats from './views/Chats/index.tsx'
import Settings from './views/Settings/index.tsx'
import CreateEvent from './views/CreateEvent/index.tsx'
import EditProfile from './views/EditProfile/index.tsx'
import EventDetail from './views/EventDetail/index.tsx'
import { useAppDispatch, useAppSelector } from './reduxStore/hooks.tsx'
import Spinner from './components/Spinner/index.tsx'
import indexActorServiceInstance from './services/indexService.tsx'
import { useEffect, useRef, useState } from 'react'
import UserProfile from 'views/UserProfile/UserProfile.tsx'
import LoginPage from 'views/LoginPage/index.tsx'
import '@nfid/identitykit/react/styles.css'
import { IdentityKitProvider, useIdentityKit } from '@nfid/identitykit/react'
import { NFIDW, IdentityKitAuthType } from '@nfid/identitykit'
import { setIdentity, setLoader, setPrincipalId, setSignUpRequired, resetAuthState } from 'reduxStore/auth/authAction.tsx'
import { saveUserProfile } from 'reduxStore/user/userAction.tsx'
import userActorServiceInstance from './services/userService.tsx'
import eventActorServiceInstance from './services/eventService.tsx'
import konectaActorServiceInstance from './services/konectaService.tsx'
import { HttpAgent } from '@dfinity/agent'

const AppLoader = () => {
  const loader = useAppSelector((state) => state.auth.loader)
  return loader ? (
    <div className="top-0 left-0 z-[2000] absolute flex justify-center items-center w-screen h-screen">
      <Spinner size="medium" />
    </div>
  ) : null
}

const AppContent = ({ targets }: { targets: string[] }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { identity, disconnect } = useIdentityKit()
  const pid = useAppSelector(state => state.auth.pid)
  const isInitializing = useRef(false)

  useEffect(() => {
    const rehydrateAndLogin = async (currentLocation: typeof location) => {
      if (identity && !pid && !isInitializing.current) {
        isInitializing.current = true
        dispatch(setLoader(true))
        console.log("APP_CONTENT_FLOW: Identity detected. Starting session initialization...")

        if (identity.getPrincipal().toText() === '2vxsx-fae') {
          console.warn("APP_CONTENT_FLOW: Anonymous principal detected. Disconnecting.")
          disconnect()
          dispatch(setLoader(false))
          isInitializing.current = false
          return
        }

        try {
          const agent = new HttpAgent({ identity, host: 'https://ic0.app' })
          if (process.env.NODE_ENV === 'development') {
            await agent.fetchRootKey()
          }
          const initResponse = await indexActorServiceInstance.initV2(agent, identity)
          console.log("APP_CONTENT_FLOW: initV2 response:", initResponse)

          if (!initResponse) {
            throw new Error("Initialization failed: initV2 returned undefined.")
          }

          if (initResponse.type === 'signup_required') {
            console.log("APP_CONTENT_FLOW: Signup is required.")
            dispatch(setSignUpRequired(true))
            if (currentLocation.pathname !== '/login') {
              navigate('/login');
            }
          } else if (initResponse.type === 'login' && initResponse.success && initResponse.userCanisterId) {
            console.log("APP_CONTENT_FLOW: Login successful. Hydrating state.")
            const principal = identity.getPrincipal().toText()
            dispatch(setPrincipalId(principal))
            dispatch(setIdentity(identity))

            const userCanisterId = initResponse.userCanisterId;
            const { eventCanisterId, konectaCanisterId } = indexActorServiceInstance;

            if (!eventCanisterId || !konectaCanisterId) {
              throw new Error("Core canister IDs (event, konecta) are missing after initialization.");
            }

            await userActorServiceInstance.initWithAgent(userCanisterId, agent);
            await eventActorServiceInstance.init(eventCanisterId, identity);
            await konectaActorServiceInstance.init(konectaCanisterId, identity);

            // Check for profile before navigating
            const userProfile = await userActorServiceInstance.getUser()
            if (userProfile) {
              // User has a profile, proceed to intended destination
              dispatch(saveUserProfile(userProfile))
              console.log("APP_CONTENT_FLOW: Existing user profile found. Navigating to calendar/redirect path.")
              if (currentLocation.pathname === '/login' || currentLocation.pathname === '/' || currentLocation.pathname === '/landing') {
                const searchParams = new URLSearchParams(currentLocation.search);
                const redirectTo = searchParams.get('redirectTo') || '/calendar';
                navigate(redirectTo, { replace: true });
              }
            } else {
              // New user, needs to create a profile
              console.log("APP_CONTENT_FLOW: New user detected, navigating to /edit-profile.");
              navigate('/edit-profile', { replace: true })
            }
          } else {
            throw new Error(`Unhandled initialization response: ${JSON.stringify(initResponse)}`)
          }
        } catch (error) {
          console.error("APP_CONTENT_FLOW: Error during session initialization:", error);

          const errorMessage = String(error);
          const match = errorMessage.match(/Canister '([a-z0-9-]+)' is not one of the delegation targets/);

          if (match && match[1]) {
            const missingCanisterId = match[1];
            console.log(`APP_CONTENT_FLOW: Detected missing delegation target: ${missingCanisterId}. Attempting re-login flow.`);

            const lastAttempted = sessionStorage.getItem('lastReloadAttemptForCanister');
            if (lastAttempted === missingCanisterId) {
              console.error("APP_CONTENT_FLOW: Re-login loop detected. Aborting.");
              disconnect();
              indexActorServiceInstance.reset();
              sessionStorage.removeItem('lastReloadAttemptForCanister');
            } else {
              localStorage.setItem('userCanisterId', missingCanisterId);
              sessionStorage.setItem('lastReloadAttemptForCanister', missingCanisterId);
              await disconnect();
              window.location.reload();
            }
          } else {
            console.error("APP_CONTENT_FLOW: An unrecoverable error occurred.");
            disconnect();
            indexActorServiceInstance.reset();
          }
        } finally {
          dispatch(setLoader(false));
          isInitializing.current = false;
        }
      } else if (!identity && pid) {
        dispatch(resetAuthState())
        indexActorServiceInstance.reset();
      }
    }

    rehydrateAndLogin(location)
  }, [identity, pid, dispatch, disconnect, navigate, targets])

  return (
    <>
      <div className="app-container scrollbar">
        <Routes>
          <Route path={'/landing'} element={<Landing setTargets={() => { }} />} />
          <Route path={'/login'} element={<LoginPage setTargets={() => { }} />} />
          <Route path={'/'} element={<Layout />}>
            <Route path={'/calendar'} element={<Calendar />} />
            <Route path={'/create-event'} element={<CreateEvent />} />
            <Route path={'/feed'} element={<Feed />} />
            <Route path={'/chats'} element={<Chats />} />
            <Route path={'/help'} element={<Help />} />
            <Route path={'/settings'} element={<Settings />} />
            <Route path={'/edit-profile'} element={<EditProfile />} />
            <Route path={'/event/:event_id'} element={<EventDetail />} />
            <Route path={'/edit-event/:event_id'} element={<CreateEvent />} />
            <Route path={'/profile/:user_name'} element={<UserProfile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <AppLoader />
    </>
  )
}

const App = () => {
  const [targets, setTargets] = useState(() => {
    const initialTargets = [
      indexActorServiceInstance.indexCanisterId,
      indexActorServiceInstance.eventCanisterId,
      indexActorServiceInstance.konectaCanisterId,
    ];
    const userCanisterId = localStorage.getItem('userCanisterId');
    if (userCanisterId && !initialTargets.includes(userCanisterId)) {
      initialTargets.push(userCanisterId);
    }
    return [...new Set(initialTargets)];
  });

  return (
    <Router>
      <IdentityKitProvider
        signers={[NFIDW]}
        featuredSigner={NFIDW}
        signerClientOptions={{
          targets,
          idleOptions: { idleTimeout: 8640000000 },
        }}
        authType={IdentityKitAuthType.DELEGATION}
      >
        <AppContent targets={targets} />
      </IdentityKitProvider>
    </Router>
  )
}

export default App