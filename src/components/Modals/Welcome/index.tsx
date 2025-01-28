import { Box, Modal } from '@mui/material'
import { Close } from '@mui/icons-material'

import UserIcon from 'assets/svg/usericon.svg'

interface Props {
  isOpen: boolean
  handleClose: any
  handleSignUpFormOpen: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
}

export default function Welcome({
  isOpen,
  handleClose,
  handleSignUpFormOpen,
}: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col w-[600px] max-md:w-[310px] max-md:px-[24px] max-md:pt-[56px] max-md:pb-[20px] rounded-[12px] p-[40px] pb-[48px] bg-[#201F34] relative text-white items-center select-none">
          <button
            onClick={handleClose}
            className="bg-[#29283C] rounded-[8px] absolute top-[40px] max-md:top-[24px] right-[40px] max-md:right-[20px] w-[40px] max-md:w-[28px] h-[40px] max-md:h-[28px] text-[14px]"
          >
            <Close />
          </button>
          <img
            className="w-[140px] h-[140px] mb-[8px] max-md:w-[98px] max-md:h-[98px] max-md:mb-[23px]"
            src={UserIcon}
            alt="User"
          />
          <h1 className="text-[32px] mb-[12px] text-center max-md:text-[20px] max-md:mb-[23px]">
            Welcome to KonectA!
          </h1>

          <p className="text-[16px] mb-[40px] text-[#BCBCC2] text-center w-[377px] max-md:w-[240px] max-md:text-[13px] max-md:mb-[23px]">
            Your answers to the following questions will help us generate ideas
            for you.
          </p>
          <div className="w-full mx-[-24px] mb-[40px] h-[1.5px] bg-[#29283C] max-md:mb-[20px]" />
          <button
            className="w-full bg-[#337FF5] text-[16px] max-md:text-[13px] p-[19px] max-md:p-[12px] max-md:w-[184px] rounded-[11px]"
            onClick={handleSignUpFormOpen}
          >
            Next
          </button>
        </div>
      </Box>
    </Modal>
  )
}
