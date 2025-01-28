import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Layout from './components/Layout'
import Landing from './views/Landing'
import PageNotFound from './views/PageNotFound'
import Help from './views/Help'
import Calendar from './views/Calendar'
import Feed from './views/Feed'
import Chats from './views/Chats'
import Settings from './views/Settings'
import CreateEvent from './views/CreateEvent'
import EditProfile from './views/EditProfile'
import EventDetail from './views/EventDetail'
import { useAppSelector } from './reduxStore/hooks'
import Spinner from './components/Spinner'
import indexActorServiceInstance from './services/indexService'
import nfidServiceInstance from './services/nfidServices'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from 'reduxStore/auth/authAction'
import UserProfile from 'views/UserProfile'
import LoginPage from 'views/LoginPage'
import '@nfid/identitykit/react/styles.css'
import { IdentityKitProvider, useIdentityKit } from '@nfid/identitykit/react'
import { NFIDW, IdentityKitAuthType } from '@nfid/identitykit'

const AppLoader = () => {
  const loader = useAppSelector((state) => state.auth.loader)
  return loader ? (
    <div className="top-0 left-0 z-[2000] absolute flex justify-center items-center w-screen h-screen">
      <Spinner size="medium" />
    </div>
  ) : null
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { identity, user, agent, disconnect } = useIdentityKit()
  // const [targets, setTargets] = useState([
  //   'xnp5v-5aaaa-aaaap-qccda-cai',
  //   'xemwj-liaaa-aaaap-qcccq-cai',
  //   'yg2ow-xiaaa-aaaap-qceza-cai',
  // ])
  const [targets, setTargets] = useState([
    indexActorServiceInstance.indexCanisterId,
    indexActorServiceInstance.eventCanisterId,
    indexActorServiceInstance.konectaCanisterId,
  ])

  useEffect(() => {
    const userCanisterId = localStorage.getItem('userCanisterId')

    if (userCanisterId) {
      if (userCanisterId && !targets.includes(userCanisterId)) {
        if (userCanisterId) {
          setTargets((targets) => {
            const arr = [...targets, userCanisterId]
            return [...new Set(arr)]
          })
        }
      }
    }
  }, [])

  useEffect(() => {
    try {
      const setup = async () => {
        dispatch(setLoader(true))
        // await nfidServiceInstance.init()
        if (
          identity &&
          user?.principal &&
          user?.principal.toText() !== '2vxsx-fae' &&
          identity?.getPrincipal().toText() !== '2vxsx-fae'
        ) {
          await indexActorServiceInstance.initV2(agent, identity)
        }
        const allPromise = []
        allPromise.push(indexActorServiceInstance.eventActorInit())
        allPromise.push(indexActorServiceInstance.konectaActorInit())
        allPromise.push(indexActorServiceInstance.attemptUserActorInit(agent))
        await Promise.all(allPromise)
        setIsLoading(false)
        dispatch(setLoader(false))
      }
      setup()
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="top-0 left-0 z-[2000] absolute flex justify-center items-center w-screen h-screen">
        <Spinner size="medium" />
      </div>
    )
  }

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
        <div className="app-container scrollbar">
          <Routes>
            <Route
              path={'/landing'}
              element={<Landing setTargets={setTargets} />}
            />
            <Route
              path={'/login'}
              element={<LoginPage setTargets={setTargets} />}
            />
            <Route path={'/'} element={<Layout />}>
              <Route path={'/calendar'} element={<Calendar />} />
              <Route path={'/create-event'} element={<CreateEvent />} />
              <Route path={'/feeds'} element={<Feed />} />
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
      </IdentityKitProvider>
    </Router>
  )
}

export default App
