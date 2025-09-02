import { Box, Modal, useMediaQuery } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router'

import GoogleLoginIcon from 'assets/svg/googleLogin.svg'
import InternetIcon from 'assets/svg/internet.svg'
import MetamaskIcon from 'assets/svg/metamask.svg'
import { CardIcon } from 'utils/svg-icons.tsx'

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
}

export default function AddPaymentMethod({ isOpen, handleClose }: Props) {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')

  const handleClickBtn = () => {
    handleClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col w-[600px] max-md:w-[310px] rounded-[12px] px-[24px] pt-[24px] bg-[#201F34] relative text-white select-none">
          <button
            onClick={handleClose}
            className="flex items-center justify-center bg-[#29283C] rounded-[8px] fixed top-[24px] right-[24px] w-[40px] h-[40px] max-md:w-[28px] max-md:h-[28px]"
          >
            <Close sx={{ width: '14px', height: '14px' }} />
          </button>
          <div className="border-b border-[#363548] pb-[20px]">
            <h1 className="!text-left text-[26px] max-md:text-[20px]">
              Add payment method
            </h1>
          </div>
          <div className="w-full flex flex-col gap-[12px] text-white text-[16px] py-[32px]">
            <div
              onClick={handleClickBtn}
              className="flex justify-between rounded-[11px] bg-[#29283C] p-[11px_16px] w-full h-[60px] max-md:h-[40px] items-center cursor-pointer max-md:text-[13px]"
            >
              <p>Creadit card</p>
              <CardIcon
                width={`${isonTabletOrMobile ? 18 : 25}`}
                height={`${isonTabletOrMobile ? 18 : 25}`}
              />
            </div>
            <div
              onClick={handleClickBtn}
              className="flex justify-between rounded-[11px] bg-[#29283C] p-[11px_16px] w-full h-[60px] max-md:h-[40px] items-center cursor-pointer max-md:text-[13px]"
            >
              <p>NFID & Google</p>
              <img
                src={GoogleLoginIcon}
                alt="google"
                height={`${isonTabletOrMobile ? 18 : 25}`}
              />
            </div>
            <div
              onClick={handleClickBtn}
              className="flex justify-between rounded-[11px] bg-[#29283C] p-[11px_16px] w-full h-[60px] max-md:h-[40px] items-center cursor-pointer max-md:text-[13px]"
            >
              <p>Metamask</p>
              <img
                src={MetamaskIcon}
                alt="google"
                height={`${isonTabletOrMobile ? 18 : 25}`}
              />
            </div>
            <div
              onClick={handleClickBtn}
              className="flex justify-between rounded-[11px] bg-[#29283C] p-[11px_16px] w-full h-[60px] max-md:h-[40px] items-center cursor-pointer max-md:text-[13px]"
            >
              <p>Internet Identity</p>
              <img
                src={InternetIcon}
                alt="google"
                height={`${isonTabletOrMobile ? 18 : 25}`}
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
