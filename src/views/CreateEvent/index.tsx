import { Drawer, styled, useMediaQuery } from '@mui/material'
import EventForm from './EventForm'

const MobileCreateEvents = styled(Drawer)<{ component?: React.ElementType }>({
  '& .MuiDrawer-paper': {
    background: 'none',
    maxHeight: '80%',
    width: '100%',
    overflow: 'hidden',
  },
})

export default function CreateEvent({ isOpen, handleClose }: any) {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      {isonTabletOrMobile ? (
        <MobileCreateEvents open={isOpen} onClose={handleClose} anchor="bottom">
          <EventForm handleClose={handleClose} />
        </MobileCreateEvents>
      ) : (
        <EventForm />
      )}
      {/* <Success isOpen={showSuccess} handleClose={handleCloseShowSuccess} /> */}
    </>
  )
}
