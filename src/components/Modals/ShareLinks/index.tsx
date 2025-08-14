import { Close } from '@mui/icons-material'
import { Box, Modal, useMediaQuery } from '@mui/material'
import { FacebookShareButton, TwitterShareButton } from 'react-share'

import { useState } from 'react'
import { CopyIcon, FaceBookIcon, TwitterIcon } from 'utils/svg-icons'

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

export default function ShareLinks({ isOpen, handleClose }: Props) {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const link = window.location.href
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const buttonClass = 'btn-secondary w-full justify-start'

  const handleClickBtn = () => {
    handleClose()
  }

  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="relative flex flex-col bg-[#201F34] px-[32px] max-md:p-[20px_32px] pt-[24px] rounded-[12px] w-[600px] max-md:w-[310px] text-white select-none">
          <div className="flex justify-between items-center border-[#363548] pb-[20px] max-md:pb-[10px] border-b">
            <h1 className="!text-left text-[26px] max-md:text-[20px]">
              Share link
            </h1>
            <button onClick={handleClose} className={'btn-secondary p-[10px]'}>
              <Close
                sx={{
                  width: { sm: '14px', md: '20px' },
                  height: { sm: '14px', md: '20px' },
                }}
              />
            </button>
          </div>
          <div className="flex flex-col gap-[12px] py-[32px] max-md:py-[20px] w-full text-[16px] text-white max-md:text-[12px]">
            {/* <button onClick={handleClickBtn} className={buttonClass}>
              <UsersIcon
                width={isonTabletOrMobile ? 16 : 21}
                height={isonTabletOrMobile ? 16 : 20}
              />
              <p>Invite Konecta users</p>
            </button> */}

            <FacebookShareButton url={link} onClick={handleClose}>
              <button className={buttonClass}>
                <FaceBookIcon
                  width={isonTabletOrMobile ? 16 : 21}
                  height={isonTabletOrMobile ? 16 : 20}
                />
                <p>Share to a Facebook</p>
              </button>
            </FacebookShareButton>

            <TwitterShareButton url={link}>
              <button onClick={handleClickBtn} className={buttonClass}>
                <TwitterIcon
                  width={isonTabletOrMobile ? 16 : 21}
                  height={isonTabletOrMobile ? 16 : 20}
                />
                <p>Share to a Twitter</p>
              </button>
            </TwitterShareButton>

            {/* <button onClick={handleClickBtn} className={buttonClass}>
              <DiscordIcon
                width={isonTabletOrMobile ? 16 : 21}
                height={isonTabletOrMobile ? 16 : 20}
              />
              <p>Share to a Discord</p>
            </button> */}
            <button onClick={copyLink} className={buttonClass}>
              <CopyIcon
                width={isonTabletOrMobile ? 16 : 21}
                height={isonTabletOrMobile ? 16 : 20}
              />

              {isCopied ? <p>Copied!</p> : <p>Copy a link</p>}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
