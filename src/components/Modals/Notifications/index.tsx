import { CloseOutlined } from '@mui/icons-material'
import { Box, Modal } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
  isOpen: boolean
  handleClose?: (type: 'close-btn-click' | 'secondary-btn-click') => void
  handleOk?: any
  iconID: number
  boldText?: string
  smallText?: string
  closeText?: string
  okText?: string
  okBtnColor?: boolean
  showCloseButton?: boolean
  isFooterColumn?: boolean
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export default function Notification({
  isOpen,
  handleClose,
  handleOk,
  iconID = 0,
  boldText = 'Congratulations!',
  smallText = 'Your answers to the following questions will help us generate ideas for you',
  closeText,
  okText = 'Browse events',
  okBtnColor = false,
  showCloseButton = false,
  isFooterColumn = false,
}: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col w-96 md:w-[600px] rounded-[12px] pt-[60px] pb-[40px] px-[24px] bg-[#201F34] relative text-white items-center select-none text-center">
          <h1 className="text-[32px] mb-[12px] font-[600]">
            {iconID === 0 ? (
              ''
            ) : iconID === 1 ? (
              <div className="flex items-center justify-center bg-[#FFFFFF0F] rounded-[100%] w-[72px] h-[72px] max-md:w-[50px] max-md:h-[50px] mb-[32px] max-md:mb-[10px]">
                <svg
                  width="28"
                  height="25"
                  viewBox="0 0 28 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0002 9.75V12.5833M14.0002 18.25H14.0143M4.18522 23.9167H23.8151C25.9962 23.9167 27.3594 21.5556 26.2689 19.6667L16.4539 2.66667C15.3634 0.777778 12.637 0.777778 11.5464 2.66667L1.73148 19.6667C0.640928 21.5556 2.00412 23.9167 4.18522 23.9167Z"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
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
            )}
          </h1>

          {showCloseButton ? (
            <button
              onClick={() => handleClose?.('close-btn-click')}
              className="btn-secondary btn-icon absolute top-[20px] right-[32px]"
            >
              <CloseOutlined />
            </button>
          ) : null}

          <h1 className="text-[32px] mb-[12px] font-[600]">{boldText}</h1>

          <p className="text-[16px] mb-[40px] text-[#BCBCC2]">{smallText}</p>
          {/* <div className="w-full h-[1.5px] bg-[#29283C] mx-[-24px] mb-[40px]" /> */}

          <div
            className={`flex w-full gap-[24px] font-[400] ${
              isFooterColumn ? ' flex-col-reverse' : ''
            }`}
          >
            {closeText && closeText.length > 0 ? (
              <button
                className="w-full p-[20px] bg-[#FFFFFF0D] text-white text-[16px] rounded-[8px]"
                onClick={() => handleClose?.('secondary-btn-click')}
              >
                {closeText}
              </button>
            ) : (
              ''
            )}
            {okText !== '' && (
              <button
                className={
                  okBtnColor
                    ? 'w-full p-[20px] text-white text-[16px] rounded-[8px] bg-[#337FF5]'
                    : 'w-full p-[20px] text-white text-[16px] rounded-[8px] bg-[#FF5245]'
                }
                onClick={handleOk}
              >
                {okText}
              </button>
            )}
            {/* #FF5245 */}
          </div>
        </div>
      </Box>
    </Modal>
  )
}
