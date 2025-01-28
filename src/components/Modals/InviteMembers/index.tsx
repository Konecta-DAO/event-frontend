import { Search, Close } from '@mui/icons-material'
import { Input, InputAdornment, useMediaQuery, Box, Modal } from '@mui/material'
import CheckBox from 'components/CheckBox'
import Button from 'components/Button'
import UserIcon from 'assets/img/user.png'
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

export default function InviteMembers({ isOpen, handleClose }: Props) {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')

  const handleClickBtn = () => {
    // console.log("hi");
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
        <div className="flex flex-col w-[560px] max-md:w-[310px] rounded-[12px] px-[32px] pt-[24px] max-md:pt-[20px] bg-[#201F34] relative text-white select-none">
          <button
            onClick={handleClose}
            className="bg-[#29283C] rounded-[8px] fixed top-[24px] max-md:top-[20px] right-[24px] max-md:right-[32px] w-[40px] max-md:w-[28px] h-[40px] max-md:h-[28px]"
          >
            <Close sx={{ width: { xs: '14px' }, height: { xs: '14px' } }} />
          </button>
          <div className="border-b border-[#363548] pb-[20px] max-md:text-[10px]">
            <h1 className="!text-left text-[26px] max-md:text-[20px]">
              Invite members
            </h1>
          </div>
          <div className="w-full flex flex-col gap-[32px] text-white text-[16px] py-[32px] max-md:pt-[20px] max-md:pb-[0px]">
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start" className="!text-white">
                  <Search
                    sx={{ width: { xs: '18px' }, height: { xs: '18px' } }}
                  />
                </InputAdornment>
              }
              className="outline-none bg-[#FFFFFF0F] !text-white text-[16px] max-md:!text-[12px] p-[12px] max-md:p-[8px_12px] rounded-[8px] w-full"
              placeholder="Search"
            />
            <div className="flex flex-col gap-[32px] max-h-[280px] overflow-y-auto">
              <div className="flex flex-col gap-[16px] pb-[32px] border-b border-[#FFFFFF1A]">
                <p className="flex gap-[8px] items-center text-[#FFFFFFB2] max-md:text-[12px]">
                  Selected
                  <span className="rounded-[3px] bg-[#337FF51A] text-[#337FF5CC] px-[10px]">
                    1
                  </span>
                </p>
                <CheckBox
                  caption={
                    <div className="flex gap-[16px] items-center">
                      <img
                        src={UserIcon}
                        width={isonTabletOrMobile ? 35 : 50}
                        height={isonTabletOrMobile ? 35 : 50}
                        alt="user icon"
                      />
                      <div className="flex flex-col gap-[5px]">
                        <p className="text-white text-[18px] max-md:text-[13px]">
                          Jeremy Pope
                        </p>
                        <p className="text-[#FFFFFF99] text-[14px] max-md:text-[12px]">
                          4,643 Followers
                        </p>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex flex-col gap-[16px] pb-[32px] border-b border-[#FFFFFF1A]">
                <p className="flex gap-[8px] items-center text-[#FFFFFFB2] max-md:text-[12px]">
                  Recent
                  <span className="rounded-[3px] bg-[#337FF51A] text-[#337FF5CC] px-[10px]">
                    2
                  </span>
                </p>
                <CheckBox
                  caption={
                    <div className="flex gap-[16px] items-center">
                      <img
                        src={UserIcon}
                        width={isonTabletOrMobile ? 35 : 50}
                        height={isonTabletOrMobile ? 35 : 50}
                        alt="user icon"
                      />
                      <div className="flex flex-col gap-[5px]">
                        <p className="text-white text-[18px] max-md:text-[13px]">
                          Jeremy Pope
                        </p>
                        <p className="text-[#FFFFFF99] text-[14px] max-md:text-[12px]">
                          4,643 Followers
                        </p>
                      </div>
                    </div>
                  }
                />
                <CheckBox
                  caption={
                    <div className="flex gap-[16px] items-center">
                      <img
                        src={UserIcon}
                        width={isonTabletOrMobile ? 35 : 50}
                        height={isonTabletOrMobile ? 35 : 50}
                        alt="user icon"
                      />
                      <div className="flex flex-col gap-[5px]">
                        <p className="text-white text-[18px] max-md:text-[13px]">
                          Jeremy Pope
                        </p>
                        <p className="text-[#FFFFFF99] text-[14px] max-md:text-[12px]">
                          4,643 Followers
                        </p>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex flex-col gap-[16px] pb-[32px]">
                <p className="flex gap-[8px] items-center text-[#FFFFFFB2] max-md:text-[12px]">
                  People
                  <span className="rounded-[3px] bg-[#337FF51A] text-[#337FF5CC] px-[10px]">
                    94513
                  </span>
                </p>
                <CheckBox
                  caption={
                    <div className="flex gap-[16px] items-center">
                      <img
                        src={UserIcon}
                        width={isonTabletOrMobile ? 35 : 50}
                        height={isonTabletOrMobile ? 35 : 50}
                        alt="user icon"
                      />
                      <div className="flex flex-col gap-[5px]">
                        <p className="text-white text-[18px] max-md:text-[13px]">
                          Jeremy Pope
                        </p>
                        <p className="text-[#FFFFFF99] text-[14px] max-md:text-[12px]">
                          4,643 Followers
                        </p>
                      </div>
                    </div>
                  }
                />
                <CheckBox
                  caption={
                    <div className="flex gap-[16px] items-center">
                      <img
                        src={UserIcon}
                        width={isonTabletOrMobile ? 35 : 50}
                        height={isonTabletOrMobile ? 35 : 50}
                        alt="user icon"
                      />
                      <div className="flex flex-col gap-[5px]">
                        <p className="text-white text-[18px] max-md:text-[13px]">
                          Jeremy Pope
                        </p>
                        <p className="text-[#FFFFFF99] text-[14px] max-md:text-[12px]">
                          4,643 Followers
                        </p>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="border-t border-[#FFFFFF1A]">
              <div className="flex max-md:flex-col-reverse gap-[12px] w-full px-[32px] pt-[40px] max-md:py-[10px]">
                <Button text={'Cancel'} width="full" onClick={handleClose} />
                <Button text={'Send Invite'} variant="accent" width="full" />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
