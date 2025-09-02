import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CloseOutlined, FilterAltOutlined } from '@mui/icons-material'
import { Box, Modal, useMediaQuery } from '@mui/material'
import CreateEvent from 'views/CreateEvent/index.tsx'
import { CalendarIcon } from 'utils/svg-icons.tsx'

interface Props {
  isOpen: boolean
  handleClose: any
  setFiltersShow: any
}

const MobileActions = ({ isOpen, setFiltersShow, handleClose }: Props) => {
  const [createEventModal, setCreateEventModal] = useState(false)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const navigate = useNavigate()

  const location = useLocation()

  const handleCreateEvent = () => {
    if (isonTabletOrMobile) setCreateEventModal(true)
    else navigate('/create-events')
    handleClose()
  }

  const hideFilterButton = location.pathname.startsWith('/calendar')

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: 'fit-content',
          }}
        >
          <div className="flex flex-col w-fit gap-[16px]">
            {!hideFilterButton ? (
              <div className="flex items-center w-fit h-fit gap-[14px] text-white font-[500] text-[13px]">
                <p>Filter</p>
                <button
                  className="bg-[#FFFFFF0D] text-center text-white border-none w-[40px] h-[40px] rounded-[10px]"
                  onClick={() => {
                    setFiltersShow(true)
                    handleClose()
                  }}
                >
                  <FilterAltOutlined />
                </button>
              </div>
            ) : null}
            <div className="flex items-center w-fit h-fit gap-[14px] text-white font-[500] text-[13px]">
              <p>Event</p>
              <button
                className="flex items-center justify-center bg-[#337FF5] text-center text-white border-none w-[40px] h-[40px] rounded-[10px]"
                onClick={handleCreateEvent}
              >
                <span>
                  <CalendarIcon width={18} height={20} />
                </span>
              </button>
            </div>
            <div className="flex flex-col w-full">
              <button
                className="flex self-end items-center justify-center bg-[#337FF5] text-center text-white border-none w-[40px] h-[40px] rounded-[10px]"
                onClick={handleClose}
              >
                <CloseOutlined sx={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <CreateEvent
        isOpen={createEventModal}
        handleClose={() => setCreateEventModal(false)}
      />
    </>
  )
}

export default MobileActions
