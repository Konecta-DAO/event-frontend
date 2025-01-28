import { Box, Modal } from '@mui/material'
import { Link } from 'react-router-dom'

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

export default function Congrates({ isOpen, handleClose }: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col w-[600px] min-h-[450px] rounded-[12px] pt-[60px] pb-[40px] px-[24px] bg-[#201F34] relative text-white items-center select-none text-center">
          <h1 className="text-[32px] mb-[12px] font-[600]">
            Congratulations! <br /> Your account has been <br /> successfully
            created
          </h1>

          <p className="text-[16px] mb-[40px] text-[#BCBCC2]">
            Your answers to the following questions will help us generate ideas
            for you.
          </p>
          <div className="w-full h-[1.5px] bg-[#29283C] mx-[-24px] mb-[40px]" />
          <div className="flex w-full gap-[24px] font-[400]">
            <Link
              to={'/create-event'}
              className="w-full p-[20px] bg-[#FFFFFF0D] text-white text-[16px] rounded-[8px]"
            >
              Create event
            </Link>
            <Link
              to={'/calendar'}
              className="w-full p-[20px] bg-[#337FF5] text-white text-[16px] rounded-[8px]"
            >
              Browse events
            </Link>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
