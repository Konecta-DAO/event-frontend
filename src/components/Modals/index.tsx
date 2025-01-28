import React from 'react'
import { Box, Modal } from '@mui/material'
import { Close } from '@mui/icons-material'

import LogoIcon from 'assets/svg/logo.svg'
interface Props {
  isOpen: boolean
  handleClose: any
  handleLoginOpen: any
  handleSignUpOpen: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
}

export default function Auth({
  isOpen,
  handleClose,
  handleLoginOpen,
  handleSignUpOpen,
}: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col w-[600px] max-md:w-[310px] rounded-[12px] max-md:px-[24px] max-md:pt-[56px] px-[40px] pt-[64px] pb-[48px] bg-[#201F34] relative text-white items-center select-none">
          <button
            onClick={handleClose}
            className="bg-[#29283C] rounded-[8px] absolute top-[40px] max-md:top-[24px] right-[40px] max-md:right-[20px] w-[40px] max-md:w-[28px] h-[40px] max-md:h-[28px] text-[14px]"
          >
            <Close width={14} height={14} />
          </button>
          <img
            className="w-[56px] h-[56px] mb-[8px] max-md:w-[42px] max-md:h-[42px]"
            src={LogoIcon}
            alt="logo"
          />
          <h1 className="text-[26px] mb-[22px] max-md:text-[20px] max-md:mb-[18px] text-center">
            Join the KonectA community
          </h1>
          <p className="text-center text-[16px] max-md:text-[13px] leading-[32px] mb-[34px] max-md:w-[264px]">
            Login or Sign up with II (Internet Identity) to interact with
            distrikt.app <br /> Read more about te Internet Identity here.
          </p>
          <div className="flex gap-[13px] w-full mb-[34px] max-md:flex-col items-center">
            <button
              className="w-full bg-[#337FF5] text-[16px] max-md:text-[13px] p-[19px] max-md:p-[12px] max-md:w-[184px] rounded-[11px]"
              onClick={handleLoginOpen}
            >
              Log In
            </button>
            <button
              className="w-full bg-[#29283C] text-[16px] max-md:text-[13px] p-[19px] max-md:p-[12px] max-md:w-[184px] rounded-[11px]"
              onClick={handleSignUpOpen}
            >
              Sign Up
            </button>
          </div>
          <p className="flex text-[16px] gap-[8px] max-md:text-[13px]">
            Continue as{' '}
            <a href="#" className="text-[#337FF5]">
              Guest
            </a>
          </p>
        </div>
      </Box>
    </Modal>
  )
}
