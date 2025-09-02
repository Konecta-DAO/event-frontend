import { MoreVert } from '@mui/icons-material'
import { Box, Modal, useMediaQuery } from '@mui/material'
import UserIcon from 'assets/img/user.png'
import { TokenLedgerModel } from 'entity/token-ledger.model.ts'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setWalletArr } from 'reduxStore/auth/authAction.tsx'
import { useAppSelector } from 'reduxStore/hooks.tsx'
import { RootState } from 'reduxStore/store.tsx'
import ledgerActorServiceInstance from 'services/ledgerService.tsx'
import nfidServiceInstance from 'services/nfidServices.tsx'
import userActorServiceInstance from 'services/userService.tsx'

interface Props {
  isOpen: boolean
  coins: TokenLedgerModel[]
  selectedCoin: any
  handleClose: any
  setSelectedCoin: any
}

export default function WalletList({
  isOpen,
  coins,
  selectedCoin,
  setSelectedCoin,
  handleClose,
}: Props) {
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const userProfile = useAppSelector(
    (state: RootState) => state.user.userProfile,
  )
  const walletArr = useAppSelector((state: RootState) => state.auth.walletArr)
  const principalId = useAppSelector((state) => state.auth.pid)

  const dispatch = useDispatch()

  useEffect(() => {
    const getSubAccountBalance = async () => {
      try {
        if (!nfidServiceInstance.nfid) {
          return
        }

        if (nfidServiceInstance.nfid.getIdentity()) {
          const tokenArray =
            await ledgerActorServiceInstance.getAllAccountBalance(principalId)
          dispatch(setWalletArr(tokenArray))
          console.log('tokenArray - getSubAccountBalance111', tokenArray)
        }
      } catch (e) {
        console.log('WalletList error - getSubAccountBalance111', e)
      }
    }

    getSubAccountBalance()
  }, [dispatch])

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: `${isonTabletOrMobile ? '110px' : '139px'}`,
          left: `${isonTabletOrMobile ? 'none' : '24px'}`,
          right: `${isonTabletOrMobile ? '26px' : 'none'}`,
          width: 'fit-content',
        }}
      >
        <div className="flex flex-col gap-[4px] w-[243px] max-md:w-[198px]">
          <div
            className="flex justify-between items-center bg-[#212037] p-[12px] max-md:p-[10px] rounded-[10px] max-md:rounded-[8px] w-full"
            onClick={() => {
              handleClose()
            }}
          >
            <img
              src={
                userProfile && userProfile.profilepic.length > 0
                  ? userActorServiceInstance.getUserImageUrl(
                    userProfile.canister_id.toString(),
                    userProfile.profilepic,
                  )
                  : UserIcon
              }
              alt="user icon"
              width={`${isonTabletOrMobile ? 32 : 38}`}
              height={`${isonTabletOrMobile ? 32 : 38}`}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-[16px] text-white max-md:text-[13px]">
                {userProfile
                  ? `${userProfile.firstname} ${userProfile.lastname}`
                  : ''}
              </p>
              <p className="text-[#A9A9B1] text-[14px] max-md:text-[11px]">
                {selectedCoin ? selectedCoin.addr : '7ab21f534behdjf4e...'}
              </p>
            </div>
            <p className="opacity-20 text-white">
              <MoreVert />
            </p>
          </div>
          {walletArr.map((coin, index) => (
            <div
              className="flex items-center gap-[8px] bg-[#212037] hover:bg-[#302e4b] p-[12px] max-md:p-[10px] rounded-[10px] max-md:rounded-[8px] w-full"
              key={index}
              onClick={() => {
                setSelectedCoin(coin)
                handleClose()
              }}
            >
              {coin.icon}
              <div className="flex flex-col">
                <p className="text-[16px] text-[16px] text-white max-md:text-[13px]">
                  {coin.token}
                </p>
                <p className="text-[#A9A9B1] text-[14px] text-[16px] max-md:text-[11px]">
                  {coin.balance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  )
}
