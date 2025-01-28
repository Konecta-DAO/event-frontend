import { CloseOutlined } from '@mui/icons-material'
import { Modal } from '@mui/material'
import TextArea from 'components/TextArea'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Notification from '../Notifications'
import { useNavigate } from 'react-router'
import konectaActorServiceInstance from 'services/konectaService'
import Spinner from 'components/Spinner'
import { eventLocationLinkRegexp } from 'utils/values'
import Input from 'components/Input'
import { ApplyToServiceRequestPayload } from 'candid/ts/konecta.did'
import Emitter from 'services/emitter'

interface ApplyForEventRequestProps {
  eventId: string
  isOpen: boolean
  handleClose: () => void
}

interface ApplyForm {
  message: string
  location: string
}

const ApplyForEventRequest = ({
  eventId,
  isOpen,
  handleClose,
}: ApplyForEventRequestProps) => {
  const [isSuccessNotifVisible, setIsSuccessNotifVisible] =
    useState<boolean>(false)
  const [isErrorNotifVisible, setIsErrorNotifVisible] = useState<boolean>(false)
  const [isErrorNotifMsg, setIsErrorNotifMsg] = useState<string>('')
  const [isLoading, setIsloading] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ApplyForm>({
    defaultValues: {
      message: '',
      location: '',
    },
  })

  const triggerEventRefresh = useCallback(() => {
    Emitter.emit('REFRESH_EVENT', {
      eventName: 'REFRESH_EVENT',
      payload: { eventId },
    })
  }, [eventId])

  const onSubmit = async (data: ApplyForm) => {
    try {
      console.log('onSubmit - ApplyForEventRequest111 - eventId', data, eventId)
      setIsloading(true)

      const applyReq: ApplyToServiceRequestPayload = {
        note: data.message,
        event_id: eventId,
        location: data.location,
      }
      const applyResp = await konectaActorServiceInstance.applyToServiceRequest(
        applyReq,
      )
      console.log('applyResp - ApplyForEventRequest111', applyResp)
      handleClose()
      reset()
      setIsloading(false)
      setIsSuccessNotifVisible(true)
      triggerEventRefresh()
    } catch (e) {
      console.log('onSubmit - ApplyForEventRequest111 - error', e)
      handleClose()
      reset()
      setIsloading(false)
      setIsSuccessNotifVisible(false)
      setIsErrorNotifVisible(true)
      setIsErrorNotifMsg((e as Error).message)
    }
  }

  if (isLoading) {
    return (
      <div className="z-[100] absolute-center">
        <Spinner size="medium" />
      </div>
    )
  }

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <div className="top-[50%] left-[50%] absolute w-[90vW] md:w-[40vW] md:max-w-[600px] md:max-h-[800px] text-white translate-x-[-50%] translate-y-[-50%]">
          <div className="bg-[#201F34] rounded-[12px]">
            <div className="flex flex-row justify-between items-center px-[20px] py-[24px]">
              <p className="ty-title">Apply to Event</p>
              <button className="btn-icon btn-secondary" onClick={handleClose}>
                <CloseOutlined />
              </button>
            </div>
            <div className="flex flex-col gap-[6px] px-[20px] pb-[30px] w-full">
              <TextArea
                name="message"
                control={control}
                error={errors.message}
                rules={{ required: 'Message is required' }}
                placeholder="Describe why you would be the best choice for this event."
              />
              <Input
                control={control}
                name="location"
                error={errors?.location}
                rules={{
                  required: 'Location is required',
                  pattern: {
                    value: eventLocationLinkRegexp,
                    message:
                      'Only Google Meet, Zoom or Microsoft Teams meeting link is allowed',
                  },
                }}
                placeholder="Google Meet, Zoom or Microsoft Teams meeting link"
              />
            </div>
            <div className="flex md:flex-row flex-col-reverse justify-center items-center gap-[10px] md:gap-[12px] px-[20px] pt-[30px] pb-[32px] border-t-[#FFFFFF]/5 border-t-[1px]">
              <button
                className="flex-1 w-[60vW] md:w-auto btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="flex-1 w-[60vW] md:w-auto btn-primary"
                onClick={handleSubmit(onSubmit)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Notification
        isOpen={isSuccessNotifVisible}
        handleClose={() => {
          setIsSuccessNotifVisible(false)
        }}
        handleOk={() => {
          setIsSuccessNotifVisible(false)
          navigate('/feeds')
        }}
        iconID={2}
        boldText={'Success'}
        smallText={
          'You will receive a notification if you are accepted or declined'
        }
        okText={'Go to feed'}
        okBtnColor={true}
        showCloseButton={true}
      />
      <Notification
        isOpen={isErrorNotifVisible}
        handleClose={() => {
          setIsErrorNotifVisible(false)
        }}
        handleOk={() => {
          setIsErrorNotifVisible(false)
          navigate('/feeds')
        }}
        iconID={1}
        boldText={'Error'}
        smallText={
          isErrorNotifMsg === ''
            ? 'Unable to apply to event request'
            : isErrorNotifMsg
        }
        okText={'Go to feed'}
        okBtnColor={false}
        showCloseButton={true}
      />
    </>
  )
}

export default ApplyForEventRequest
