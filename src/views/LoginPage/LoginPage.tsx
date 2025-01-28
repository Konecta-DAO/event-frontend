import LoginBox from 'components/LoginBox/LoginBox'
import React, { useState } from 'react'

import styles from './styles.module.css'

import LandingIcon from 'assets/svg/logo-landing.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Modal } from '@mui/material'
import SignUpForm from 'components/SignUpForm'
import { useIdentityKit } from '@nfid/identitykit/react'
import { setLoader } from 'reduxStore/auth/authAction'
import { useAppDispatch } from 'reduxStore/hooks'
import { HttpAgent } from '@dfinity/agent'
import indexActorServiceInstance from 'services/indexService'
import LoginInfo from 'components/Modals/LoginInfo'

const signUpFormStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
}

const LoginPage: React.FC<{
  setTargets: React.Dispatch<React.SetStateAction<string[]>>
}> = ({ setTargets }) => {
  const navigate = useNavigate()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false)
  const [shouldInvokeLogin, setShouldInvokeLogin] = React.useState(false)
  const [invokedLogin, setInvokedLogin] = React.useState(false)
  const [openLoginInfoModal, setOpenLoginInfoModal] = React.useState(false)

  const invokeLogin = () => {
    setShouldInvokeLogin(true)
  }
  const showSignUpForm = () => {
    setIsSignUpVisible(true)
  }
  const closeSignUpForm = () => {
    setIsSignUpVisible(false)
  }

  const handleLoginSuccess = () => {
    console.log('login success')
    if (searchParams[0].has('redirectTo')) {
      console.log('redirectTo found in searchParams', searchParams[0])
      const redirectRoute = searchParams[0].get('redirectTo') as string
      console.log('navigating to ', redirectRoute)
      navigate(redirectRoute, { replace: true })
    } else {
      navigate('/calendar')
    }
    navigate(0) // refresh page to clear tab history, so that user doesn't end up on log in screen by pressing back
  }

  const { identity, agent, user, disconnect } = useIdentityKit()

  React.useEffect(() => {
    const login = async () => {
      if (
        identity !== undefined &&
        user?.principal &&
        user.principal.toText() !== '2vxsx-fae'
      ) {
        try {
          dispatch(setLoader(true))

          const agent = HttpAgent.createSync({
            identity,
            host: 'https://icp0.io',
          })

          const attemptResponse = await indexActorServiceInstance.initV2(
            agent,
            identity,
          )

          const localStorageUserCanisterId =
            localStorage.getItem('userCanisterId')

          const didUserCanisterIdMatched =
            attemptResponse?.userCanisterId === localStorageUserCanisterId

          if (!didUserCanisterIdMatched && attemptResponse?.userCanisterId) {
            localStorage.setItem(
              'userCanisterId',
              attemptResponse.userCanisterId,
            )

            setTargets((targets: string[]) => {
              if (attemptResponse.userCanisterId) {
                return [...targets, attemptResponse.userCanisterId]
              } else {
                return targets
              }
            })

            disconnect()
            navigate('/login')

            setShouldInvokeLogin(false)
            setInvokedLogin(false)

            setOpenLoginInfoModal(true)
            return
          }

          if (attemptResponse === undefined) {
            dispatch(setLoader(false))
            return
          }

          const { type, success } = attemptResponse

          if (type === 'signup_required') {
            dispatch(setLoader(false))
            showSignUpForm()
          } else if (type === 'login') {
            if (success) {
              const allPromise = []
              allPromise.push(indexActorServiceInstance.eventActorInit())
              allPromise.push(indexActorServiceInstance.konectaActorInit())
              await Promise.all(allPromise)

              const currentUrl = window.location.href
              const url = new URL(currentUrl)
              const redirectTo = url.searchParams.get('redirectTo')

              if (redirectTo) {
                navigate(redirectTo)
              } else {
                navigate('/calendar')
              }
            }

            dispatch(setLoader(false))
          }

          dispatch(setLoader(false))
        } catch (error) {
          console.log(error)
          dispatch(setLoader(false))
        } finally {
          dispatch(setLoader(false))
        }

        setShouldInvokeLogin(false)
        setInvokedLogin(false)
      }
    }

    if (shouldInvokeLogin) {
      if (!invokedLogin) {
        setInvokedLogin(true)
        login()
      }
    }
  }, [
    agent,
    identity,
    user,
    setShouldInvokeLogin,
    setInvokedLogin,
    invokedLogin,
  ])

  const handleLoginInfoClose = () => {
    setOpenLoginInfoModal(false)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen text-white">
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      <Link to={'/landing'} className="top-[32px] left-[32px] absolute">
        <img src={LandingIcon} />
      </Link>
      <LoginBox
        showCloseButton={false}
        onLoginSuccess={handleLoginSuccess}
        onSignUpRequired={showSignUpForm}
        setShouldInvokeLogin={invokeLogin}
      />
      <Modal open={isSignUpVisible} onClose={closeSignUpForm}>
        <SignUpForm
          handleClose={closeSignUpForm}
          onSignUpSuccess={handleLoginSuccess}
          style={signUpFormStyle}
          setTargets={setTargets}
        />
      </Modal>
      <LoginInfo
        isOpen={openLoginInfoModal}
        handleClose={handleLoginInfoClose}
      />
    </div>
  )
}

export default LoginPage
