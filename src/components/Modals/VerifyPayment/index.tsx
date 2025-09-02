import { Box, Modal } from '@mui/material'
import { Link } from 'react-router-dom'
import indexActorServiceInstance from 'services/indexService.tsx'
import Notification from '../Notifications/index.tsx'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { useAppDispatch } from 'reduxStore/hooks.tsx'

interface Props {
  isOpen: boolean
  handleClose: any
  icpAddress: string | undefined
  paymentValue: string
  handleSignUpFormOpen: any
  setLoader: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  zIndex: 1000,
}

interface NotificationProps {
  boldText: string
  smallText: string
  okText: string
  closeText: undefined | string
}

const NotificationConfig: Record<
  'VERIFY_PAYMENT_SUCCESS' | 'VERIFY_PAYMENT_FAILED',
  NotificationProps
> = {
  VERIFY_PAYMENT_SUCCESS: {
    boldText: 'Payment successfully verified',
    smallText: 'Congrats! Your verification is complete',
    okText: 'Register',
    closeText: undefined,
  },
  VERIFY_PAYMENT_FAILED: {
    boldText: 'Payment verification failed',
    smallText: 'Please check if the payment is completed',
    okText: '',
    closeText: undefined,
  },
}

export default function VerifyPayment({
  isOpen,
  handleClose,
  icpAddress,
  paymentValue,
  handleSignUpFormOpen,
  setLoader,
}: Props) {
  const [visibleNotification, setVisibleNotification] = useState<
    '' | 'VERIFY_PAYMENT_SUCCESS' | 'VERIFY_PAYMENT_FAILED'
  >('')
  const dispatch = useAppDispatch()

  const handlePayment = async () => {
    try {
      dispatch(setLoader(true))
      const isVerified = await indexActorServiceInstance.verifyPayment()
      console.log(
        'userSubaccLedgerIdentifier - isVerified',
        indexActorServiceInstance.userSubaccLedgerIdentifier,
        isVerified,
      )
      dispatch(setLoader(false))
      if (isVerified === true) {
        handleClose()
        setVisibleNotification('VERIFY_PAYMENT_SUCCESS')
        setTimeout(() => {
          setVisibleNotification('')
          handleSignUpFormOpen()
        }, 15000)
      } else {
        setVisibleNotification('VERIFY_PAYMENT_FAILED')
        setTimeout(() => {
          setVisibleNotification('')
        }, 5000)
      }
    } catch (e) {
      dispatch(setLoader(false))
      console.log('Error while payment', e)
      setVisibleNotification('VERIFY_PAYMENT_FAILED')
      setTimeout(() => {
        setVisibleNotification('')
      }, 5000)
    }
  }

  const renderNotification = () => {
    return visibleNotification !== '' ? (
      <Notification
        isOpen={true}
        handleClose={handleClose}
        handleOk={handleSignUpFormOpen}
        iconID={visibleNotification === 'VERIFY_PAYMENT_SUCCESS' ? 2 : 1}
        showCloseButton={false}
        okBtnColor={visibleNotification === 'VERIFY_PAYMENT_SUCCESS'}
        boldText={NotificationConfig[visibleNotification].boldText}
        smallText={NotificationConfig[visibleNotification].smallText}
        okText={NotificationConfig[visibleNotification].okText}
        closeText={NotificationConfig[visibleNotification].closeText}
        isFooterColumn={true}
      />
    ) : null
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-[600px] max-md:w-[310px] rounded-[12px] bg-[#201F34] relative text-white select-none">
            <div className="flex text-center flex-col pt-[56px] pb-[40px] px-[71.5px] max-md:p-[20px] items-center">
              {/* <img
                className="w-[256px] h-[256px] rounded-lg p-2 bg-white mb-[24px]"
                src="https://www.emoderationskills.com/wp-content/uploads/2010/08/QR1.jpg"
              /> */}
              {typeof icpAddress !== 'undefined' && (
                <div className="w-[256px] h-[256px] rounded-lg p-2 bg-white mb-[24px]">
                  <QRCode
                    value={icpAddress.toString()}
                    size={240}
                    bgColor="transparent"
                  />
                </div>
              )}
              <p className="text-[16px] mb-2">ICP address</p>
              {typeof icpAddress !== 'undefined' && (
                <p className="text-[#2d68ff] mb-3">
                  {icpAddress.substring(0, 10)}
                  {'...'}
                  {icpAddress.substring(
                    icpAddress.length - 10,
                    icpAddress.length,
                  )}
                </p>
              )}
              <p className="text-[16px] leading-[24px] font-normal text-[#ffffff] text-center">
                Send One-time payment: {paymentValue} ICP
              </p>
            </div>

            <div className="w-full h-[1.5px] bg-[#29283C] max-md:mb-[20px]" />

            <div className="flex pt-[40px] max-md:flex-col-reverse pb-[80px] px-[24px] max-md:p-[20px] gap-4 w-full">
              <button
                onClick={handleClose}
                className="w-full bg-[#29283C] text-[16px] max-md:text-[13px] p-[19px] max-md:p-[12px] rounded-[11px]"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="w-full bg-[#337FF5] text-[16px] max-md:text-[13px] p-[19px] max-md:p-[12px] rounded-[11px]"
              >
                Verify payment
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      {renderNotification()}
    </>
  )
}
