import { Box, Modal } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
  isOpen: boolean
  handleClose: any
  handleSignUpOpen?: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  zIndex: 1000,
}

export default function Success({
  isOpen,
  handleClose,
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
        <div className="flex flex-col text-center w-[600px] max-md:w-[310px] rounded-[12px] pt-[48px] pb-[40px] px-[71.5px] max-md:p-[20px] bg-[#201F34] relative text-white items-center select-none">
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
            Your service offer has been <br /> successfully created{' '}
          </h1>
          <div className="w-full mx-[-24px] mb-[40px] h-[1.5px] bg-[#29283C] max-md:mb-[20px]" />
          <Link
            className="w-full p-[18px] max-md:p-[10px] bg-[#337FF5] text-white text-[16px] max-md:text-[13px] border-none rounded-[8px] max-md:rounded-[11px] max-md:w-[184px]"
            to={'/calendar'}
          >
            View event page
          </Link>
        </div>
      </Box>
    </Modal>
  )
}
