import { WarningAmberRounded } from '@mui/icons-material'
import { Snackbar, SnackbarCloseReason } from '@mui/material'
import React from 'react'
import {
  EventRequestState,
  updateEventRequestProgress,
} from 'reduxStore/event/eventAction.tsx'
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks.tsx'

const FloatingEventProgress = () => {
  const [open, setOpen] = React.useState(false)

  const dispatch = useAppDispatch()

  const eventRequestState = useAppSelector(
    (state) => state.event.eventRequestState,
  )
  const eventRequestProgress = useAppSelector(
    (state) => state.event.eventRequestProgress,
  )

  const isIdle = eventRequestState === EventRequestState.idle
  const isSuccess = eventRequestState === EventRequestState.success
  const isCreating = eventRequestState === EventRequestState.creating
  const isError = eventRequestState === EventRequestState.error

  const handleClose = (
    event: React.SyntheticEvent<any> | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return null
    }
    setOpen(false)
  }

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isCreating) {
      setOpen(true)
      dispatch(updateEventRequestProgress())

      interval = setInterval(() => {
        dispatch(updateEventRequestProgress())
      }, 600)

      return () => {
        clearInterval(interval)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isCreating])

  React.useEffect(() => {
    if (isSuccess) {
      setOpen(true)

      setTimeout(() => {
        setOpen(false)
      }, 6000)
    }
  }, [isSuccess])

  React.useEffect(() => {
    if (isError) {
      setOpen(true)

      setTimeout(() => {
        setOpen(false)
      }, 6000)
    }
  }, [isError])

  if (isIdle) return null

  return (
    <Snackbar
      open={open}
      autoHideDuration={null}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{ bottom: 24, right: 24, left: 24 }}
      className="w-[256px] lg:px-0 sm:w-[440px]"
    >
      <div className="w-full">
        {isError && (
          <div className="bg-[#29283C] border-4 border-[#ff5245] shadow-[inset_0px_0px__20px_5px_#ff524588,0px_0px_20px_5px_#ff524588] px-[10px] py-6 rounded-[20px]">
            <div className="flex flex-col gap-4 items-center">
              <div className="text-white text-center flex gap-1 items-center">
                <span className="bg-[#ffffff0d] w-[22px] h-[22px] hidden md:inline-flex text-[8px] justify-center items-center p-2 rounded-full">
                  <WarningAmberRounded fontSize="inherit" color="error" />
                </span>
                <p className="text-[10px] md:text-base">
                  An error occurred when creating your service offer
                </p>
              </div>
              <button
                onClick={() => { }}
                className="btn-error min-w-[200px] btn-sm px-6"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!isError && (
          <div className="bg-[#29283C] border-4 border-[#337ff5] shadow-[inset_0px_0px__20px_5px_#337ff588,0px_0px_20px_5px_#337ff588] px-2 md:px-8 py-6 rounded-[20px]">
            <div className="flex flex-col gap-4 items-center">
              <p className="text-white text-center text-xs md:text-base">
                <span className="text-[#337ff5] text-xs md:text-lg">
                  {eventRequestProgress} %{' '}
                </span>
                {isCreating && 'of your service has been created'}
                {isSuccess && 'of your service offer has been created'}
              </p>
              {isCreating && (
                <div className="relative bg-[#ffffff0d] h-4 w-full rounded-sm overflow-hidden">
                  <div
                    style={{
                      width: eventRequestProgress + '%',
                      transition: 'width 0.4s ease',
                    }}
                    className="bg-gradient-to-r from-[#6590ff] to-[#337ff5] h-full absolute top-0 left-0"
                  />
                </div>
              )}

              {isSuccess && (
                <button className="btn-primary btn-sm px-6">
                  View Event Page
                </button>
              )}

              {isError && (
                <button className="btn-error btn-sm px-6">Try Again</button>
              )}
            </div>
          </div>
        )}
      </div>
    </Snackbar>
  )
}

export default FloatingEventProgress
