import React from 'react'

import { Close } from '@mui/icons-material'
import { Box, SxProps, Theme } from '@mui/material'

import GoogleLoginIcon from 'assets/svg/googleLogin.svg'
import LogoIcon from 'assets/svg/logo.svg'
import { setLoader } from 'reduxStore/auth/authAction'
import { AppThunk, useAppDispatch } from 'reduxStore/hooks'
import indexActorServiceInstance from 'services/indexService'
import { ConnectWallet, useIdentityKit } from '@nfid/identitykit/react'
import { HttpAgent, Identity } from '@dfinity/agent'
import { useNavigate } from 'react-router'

interface LoginBoxProps {
  style?: SxProps<Theme>
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  showCloseButton?: boolean
  onSignUpRequired: () => void
  onLoginSuccess: () => void
  setShouldInvokeLogin: () => void
}

// const handleNFIDLoginAction = ({
//   onSignUpRequired,
//   onLoginSuccess,
//   onError = () => {},
//   agent,
//   identity,
// }: {
//   onSignUpRequired: () => void
//   onLoginSuccess: () => void
//   onError: (err?: unknown) => void
//   agent: HttpAgent
//   identity: Identity
// }): AppThunk<void> => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader(true))
//       const attemptResponse = await indexActorServiceInstance.attemptNFIDLogin(
//         agent,
//         identity,
//       )

//       if (attemptResponse === undefined) {
//         onError()
//         dispatch(setLoader(false))
//         return
//       }

//       const { type, success } = attemptResponse

//       if (type === 'signup_required') {
//         // if (true) {
//         dispatch(setLoader(false))
//         onSignUpRequired()
//       } else if (type === 'login') {
//         if (success) {
//           const allPromise = []
//           allPromise.push(indexActorServiceInstance.eventActorInit())
//           allPromise.push(indexActorServiceInstance.konectaActorInit())
//           await Promise.all(allPromise)
//           onLoginSuccess()
//         }
//         dispatch(setLoader(false))
//       }
//     } catch (error) {
//       console.log('handleNFIDLoginAction', error)
//       onError(error)
//       dispatch(setLoader(false))
//     } finally {
//       dispatch(setLoader(false))
//     }
//   }
// }

const LoginBox = (props: LoginBoxProps) => {
  const {
    style,
    onClose,
    showCloseButton = false,
    onLoginSuccess,
    onSignUpRequired,
    setShouldInvokeLogin,
  } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { identity, user, agent, disconnect } = useIdentityKit()

  // const handleNFIDLogin = () => {
  //   dispatch(
  //     handleNFIDLoginAction({
  //       onSignUpRequired,
  //       onLoginSuccess,
  //       onError: console.log,
  //       agent,
  //       identity,
  //     }),
  //   )
  // }

  const connectWalletRef = React.useRef<HTMLDivElement>(null)

  const handleConnect = () => {
    if (connectWalletRef.current) {
      if (
        typeof user !== 'undefined' &&
        typeof identity !== 'undefined' &&
        user?.principal.toText() !== '2vxsx-fae' &&
        identity?.getPrincipal().toText() !== '2vxsx-fae'
      ) {
        const currentUrl = window.location.href
        const url = new URL(currentUrl)
        const redirectTo = url.searchParams.get('redirectTo')

        if (redirectTo) {
          navigate(redirectTo)
        } else {
          navigate('/calendar')
        }
      } else {
        const button = connectWalletRef.current.querySelector('button')
        if (button) {
          button.click()
        }
      }
    }
    setShouldInvokeLogin()
  }

  return (
    <Box sx={style}>
      <div className="relative flex flex-col items-center bg-[#201F34] max-md:px-[24px] p-[40px] max-md:pt-[56px] pb-[48px] rounded-[12px] w-[600px] max-md:w-[310px] text-white select-none">
        {showCloseButton ? (
          <button
            onClick={onClose}
            className="top-[40px] max-md:top-[24px] right-[40px] max-md:right-[20px] absolute bg-[#29283C] rounded-[8px] w-[40px] max-md:w-[28px] h-[40px] max-md:h-[28px] text-[14px]"
          >
            <Close />
          </button>
        ) : null}
        <img className="mb-[8px] w-[56px] h-[56px]" src={LogoIcon} alt="logo" />
        <h1 className="mb-[22px] max-md:mb-[18px] text-[26px] text-center max-md:text-[20px]">
          Log in to KonectA with
        </h1>
        <div className="flex flex-col gap-[10px] max-md:gap-[12px] mb-[34px] max-md:mb-[20px] w-full text-[16px] text-white">
          <div
            onClick={handleConnect}
            className="flex justify-between items-center bg-[#29283C] max-md:py-[8px] p-[11px_16px] rounded-[11px] w-full h-[60px] max-md:text-[13px] cursor-pointer"
          >
            <p>NFID & Google</p>
            <img src={GoogleLoginIcon} alt="google" />
          </div>
        </div>

        <p className="mt-[-8px] mb-[34px] max-md:mb-[20px] text-center max-md:text-[13px]">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
        <div ref={connectWalletRef} style={{ visibility: 'hidden' }}>
          <ConnectWallet />
        </div>
      </div>
    </Box>
  )
}

export default LoginBox
