import { Modal } from '@mui/material'
import { useNavigate } from 'react-router'

import LoginBox from 'components/LoginBox/LoginBox'

interface Props {
  isOpen: boolean
  handleClose: () => void
  handleSignUpFormOpen: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
}

export default function Login({
  isOpen,
  handleClose,
  handleSignUpFormOpen,
}: Props) {
  const navigate = useNavigate()

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <LoginBox
        onSignUpRequired={handleSignUpFormOpen}
        onLoginSuccess={() => {
          navigate('/calendar')
        }}
        style={style}
        onClose={handleClose}
        showCloseButton={true}
        setShouldInvokeLogin={() => {}}
      />
    </Modal>
  )
}
