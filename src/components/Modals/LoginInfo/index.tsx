import { Box, Modal } from '@mui/material'
import { Close } from '@mui/icons-material'

interface Props {
  isOpen: boolean
  handleClose: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  zIndex: 1000,
}

export default function LoginInfo({ isOpen, handleClose }: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col text-center w-[600px] max-md:w-[310px] rounded-[12px] pt-[48px] pb-[80px] px-[71.5px] max-md:p-[20px] bg-[#201F34] relative text-white items-center select-none">
          <button
            onClick={handleClose}
            className="bg-[#29283C] rounded-[8px] absolute top-[40px] max-md:top-[24px] right-[40px] max-md:right-[20px] w-[40px] max-md:w-[28px] h-[40px] max-md:h-[28px] text-[14px]"
          >
            <Close />
          </button>
          <div className="flex items-center justify-center bg-[#FFFFFF0F] rounded-[100%] w-[72px] h-[72px] max-md:w-[50px] max-md:h-[50px] mb-[32px] max-md:mb-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
            >
              <path
                d="M7.08331 18.4167L12.75 24.0834L26.9166 9.91675"
                stroke="#2AB272"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-[28px] max-md:text-[20px] mb-[12px] max-md:mb-[20px] font-[600] w-full">
            Access to your user canister granted successfully
          </h1>
          <p className="text-[16px] leading-[24px] font-normal text-[#ffffff] opacity-50 text-center">
            Please login again to access KonectA platform
          </p>
        </div>
      </Box>
    </Modal>
  )
}
