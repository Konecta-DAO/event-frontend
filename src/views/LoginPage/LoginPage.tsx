import LoginBox from 'components/LoginBox/LoginBox'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import LandingIcon from 'assets/svg/logo-landing.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Modal } from '@mui/material'
import SignUpForm from 'components/SignUpForm'
import { useIdentityKit } from '@nfid/identitykit/react'
import LoginInfo from 'components/Modals/LoginInfo'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks'
import { setSignUpRequired } from 'reduxStore/auth/authAction'
import indexActorServiceInstance from 'services/indexService'

const signUpFormStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
}

const LoginPage: React.FC<{
  setTargets: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ setTargets }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { disconnect } = useIdentityKit()

  const pid = useAppSelector((state) => state.auth.pid)

  const isSignUpRequired = useAppSelector(
    (state) => state.auth.isSignUpRequired,
  )

  const [openLoginInfoModal, setOpenLoginInfoModal] = useState(false)

  useEffect(() => {
    if (pid) {
      const redirectTo = location.state?.from?.pathname || '/calendar'
      navigate(redirectTo, { replace: true })
    }
  }, [pid, navigate, location.state])

  const handleCloseSignUp = () => {
    dispatch(setSignUpRequired(false))
  }

  const handleSignUpSuccess = () => {
    dispatch(setSignUpRequired(false))
    setOpenLoginInfoModal(true)
  }

  const handleLoginInfoClose = async () => {
    setOpenLoginInfoModal(false);
    await disconnect();
    indexActorServiceInstance.reset();
    window.location.reload();
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen text-white">
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      <Link to={'/landing'} className="top-[32px] left-[32px] absolute">
        <img src={LandingIcon} alt="Konecta Logo" />
      </Link>
      <LoginBox
        showCloseButton={false}
        onLoginSuccess={() => { }}
        onSignUpRequired={() => {
          dispatch(setSignUpRequired(true))
        }}
      />
      <Modal open={isSignUpRequired} onClose={handleCloseSignUp}>
        <SignUpForm
          handleClose={handleCloseSignUp}
          onSignUpSuccess={handleSignUpSuccess}
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