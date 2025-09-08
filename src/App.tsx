import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from './components/Layout/index.tsx';
import Landing from './views/Landing/index.tsx';
import PageNotFound from './views/PageNotFound/index.tsx';
import Help from './views/Help/index.tsx';
import Calendar from './views/Calendar/index.tsx';
import Feed from './views/Feed/index.tsx';
import Chats from './views/Chats/index.tsx';
import Settings from './views/Settings/index.tsx';
import CreateEvent from './views/CreateEvent/index.tsx';
import EditProfile from './views/EditProfile/index.tsx';
import EventDetail from './views/EventDetail/index.tsx';
import { useAppDispatch, useAppSelector } from './reduxStore/hooks.tsx';
import Spinner from './components/Spinner/index.tsx';
import indexActorServiceInstance from './services/indexService.tsx';
import { useEffect, useRef, useState, useCallback, JSX } from 'react';
import UserProfile from 'views/UserProfile/UserProfile.tsx';
import LoginPage from 'views/LoginPage/index.tsx';
import '@nfid/identitykit/react/styles.css';
import { IdentityKitProvider, useIdentityKit, useAuth, useIsInitializing, useAgent, useIdentity } from '@nfid/identitykit/react';
import { IdentityKitAuthType } from '@nfid/identitykit';
import { setIdentity, setLoader, setPrincipalId, setSignUpRequired, resetAuthState } from 'reduxStore/auth/authAction.tsx';
import { saveUserProfile } from 'reduxStore/user/userAction.tsx';
import userActorServiceInstance from './services/userService.tsx';
import eventActorServiceInstance from './services/eventService.tsx';
import konectaActorServiceInstance from './services/konectaService.tsx';
import { HttpAgent, Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory as IndexFactory } from './candid/js/index.did.js';

const AppLoader = () => {
  const loader = useAppSelector((state) => state.auth.loader);
  return loader ? (
    <div className="top-0 left-0 z-[2000] absolute flex justify-center items-center w-screen h-screen">
      <Spinner size="medium" />
    </div>
  ) : null;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const {
    user: nfidUser,
  } = useAuth();

  const isAuthenticated = !!nfidUser;
  const isInitializing = useIsInitializing();

  if (isInitializing) {
    return <div className="w-full h-screen flex justify-center items-center"><Spinner size="medium" /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

const AppContent = ({ setTargets, targets }: { setTargets: React.Dispatch<React.SetStateAction<string[]>>, targets: string[] }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { disconnect } = useAuth();
  const {
    user: nfidUser,
  } = useAuth();

  const isAuthenticated = !!nfidUser;
  const isInitializing = useIsInitializing();
  const agent = useAgent();
  const identity = useIdentity();

  const pid = useAppSelector(state => state.auth.pid);
  const hasCheckedRegistration = useRef(false);

  const handleLogout = useCallback(async () => {
    await disconnect();
    dispatch(resetAuthState());
    indexActorServiceInstance.reset();
    navigate('/landing');
  }, [disconnect, dispatch, navigate]);

  useEffect(() => {
    const checkRegistrationAndLogin = async () => {
      if (isInitializing || !isAuthenticated || !agent || !identity || hasCheckedRegistration.current) {
        return;
      }

      hasCheckedRegistration.current = true;
      dispatch(setLoader(true));
      console.log("APP_CONTENT_FLOW: Identity detected. Starting session initialization...");

      try {
        await indexActorServiceInstance.init(agent);
        const principal = identity.getPrincipal();
        console.log(`APP_CONTENT_FLOW: Calling isUserRegistered() with principal: ${principal.toText()}`);

        localStorage.setItem('principalId', principal.toText());

        const registrationStatus = await indexActorServiceInstance.isUserRegistered();
        console.log("APP_CONTENT_FLOW: isUserRegistered response:", registrationStatus);

        if ('err' in registrationStatus) {
          console.log("APP_CONTENT_FLOW: Signup is required.");
          dispatch(setSignUpRequired(true));
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        } else {
          const { canister_id } = registrationStatus.ok;
          const userCanisterId = canister_id.toText();
          console.log("APP_CONTENT_FLOW: User registered with canister:", userCanisterId);

          setTargets(prevTargets => {
            if (prevTargets.includes(userCanisterId)) {
              console.log("APP_CONTENT_FLOW: User canister already in delegation targets.");
              return prevTargets;
            }
            console.log("APP_CONTENT_FLOW: User canister NOT in targets. Adding and preparing for re-login.");
            localStorage.setItem('userCanisterId', userCanisterId);
            localStorage.setItem('showLoginInfoModal', 'true');
            handleLogout();
            return [...prevTargets, userCanisterId];
          });

          // If canister was already a target, we proceed
          if (targets.includes(userCanisterId)) {
            dispatch(setPrincipalId(principal.toText()));
            dispatch(setIdentity(identity));

            await userActorServiceInstance.initWithAgent(userCanisterId, agent);
            await eventActorServiceInstance.init(indexActorServiceInstance.eventCanisterId, identity);
            await konectaActorServiceInstance.init(indexActorServiceInstance.konectaCanisterId, identity);

            const userProfile = await userActorServiceInstance.getUser();
            if (userProfile) {
              dispatch(saveUserProfile(userProfile));
              console.log("APP_CONTENT_FLOW: Profile found. Navigating to calendar.");
              navigate('/calendar', { replace: true });
            } else {
              console.log("APP_CONTENT_FLOW: No profile found. Navigating to edit-profile.");
              navigate('/edit-profile', { replace: true });
            }
          }
        }
      } catch (error) {
        console.error("APP_CONTENT_FLOW: Error during session initialization:", error);
        await handleLogout();
      } finally {
        dispatch(setLoader(false));
      }
    };

    checkRegistrationAndLogin();

  }, [isAuthenticated, isInitializing, agent, identity, dispatch, navigate, location, handleLogout, setTargets]);

  useEffect(() => {
    if (!isAuthenticated && !isInitializing) {
      hasCheckedRegistration.current = false;
    }
  }, [isAuthenticated, isInitializing]);


  return (
    <>
      <div className="app-container scrollbar">
        <Routes>
          <Route path={'/landing'} element={<Landing setTargets={setTargets} />} />
          <Route path={'/login'} element={<LoginPage setTargets={setTargets} />} />
          <Route path={'/'} element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
  );
};

const App = () => {
  const [targets, setTargets] = useState<string[]>([]);
  const [isLoadingTargets, setIsLoadingTargets] = useState(true);

  useEffect(() => {
    const fetchInitialTargets = async () => {
      const agent = new HttpAgent({ host: "https://ic0.app" });
      if (process.env.NODE_ENV !== "production") {
        await agent.fetchRootKey();
      }
      const actor = Actor.createActor(IndexFactory, {
        agent,
        canisterId: indexActorServiceInstance.indexCanisterId,
      });

      // This is a placeholder; replace with actual method if available,
      // otherwise, start with a base set of canisters.
      const initialCanisters = [
        indexActorServiceInstance.indexCanisterId,
        indexActorServiceInstance.eventCanisterId,
        indexActorServiceInstance.konectaCanisterId,
      ];

      const storedUserCanisterId = localStorage.getItem('userCanisterId');
      if (storedUserCanisterId) {
        initialCanisters.push(storedUserCanisterId);
      }

      setTargets([...new Set(initialCanisters)]);
      setIsLoadingTargets(false);
    };
    fetchInitialTargets();
  }, []);

  if (isLoadingTargets) {
    return <div className="w-full h-screen flex justify-center items-center"><Spinner size="medium" /></div>;
  }

  return (
    <Router>
      <IdentityKitProvider
        authType={IdentityKitAuthType.DELEGATION}
        signerClientOptions={{
          targets,
          idleOptions: { disableIdle: true }
        }}
      >
        <AppContent setTargets={setTargets} targets={targets} />
      </IdentityKitProvider>
    </Router>
  );
};

export default App;