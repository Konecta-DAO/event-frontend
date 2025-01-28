import { MoreVert } from '@mui/icons-material'
import { Avatar, Skeleton, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import UserIcon from 'assets/img/user.png'
import LogoIcon from 'assets/svg/logo-landing.svg'
import WalletList from 'components/WalletList/indext'
import { BackArrowIcon } from 'utils/svg-icons'
import { menuItems } from 'utils/values'

import styles from './style.module.css'
import nfidServiceInstance from 'services/nfidServices'
import Button from 'components/Button'
import { useAppSelector } from 'reduxStore/hooks'
import userActorServiceInstance from 'services/userService'
import indexActorServiceInstance from 'services/indexService'
import { tokenLedgerArr } from 'services/values'
import { useIdentityKit } from '@nfid/identitykit/react'

const SideBar = ({ handleSidebarClose }: any) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [walletShow, setWalletShow] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState<any>(null)
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const [isLoading, setIsLoading] = useState(true)
  const userProfile = useAppSelector((state) => state.user.userProfile)
  const address = useAppSelector((state) => state.auth.address)

  const { identity, user, disconnect } = useIdentityKit()

  const isAuthenticated =
    identity && user?.principal && user.principal.toText() !== '2vxsx-fae'

  console.log(
    'isAuthenticated111 - address - SideBar',
    isAuthenticated,
    address,
  )

  const handleWalletClose = () => {
    setWalletShow(false)
  }

  const handleLogoutClick = async () => {
    await disconnect()
    navigate('landing', { replace: true })
    console.log('logout111 called')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1)

    return () => clearTimeout(timer)
  }, [])

  const toggleWalletShow = () => {
    setWalletShow(!walletShow)
  }

  if (!userProfile) {
    console.log('userprofile not loaded in redux')
    return <Navigate to={'/login'} />
  }

  return (
    <div className={styles.sidebar}>
      <div className="flex flex-col h-full">
        {isonTabletOrMobile ? (
          <div className="flex justify-between items-center mb-[25px]">
            <button
              className="bg-[#363548] p-[8px] rounded-[6px] text-white"
              onClick={handleSidebarClose}
            >
              <BackArrowIcon width={12} height={12} />
            </button>
            <img src={LogoIcon} alt="logo" width={124} height={34} />
          </div>
        ) : (
          <Link to={'/calendar'}>
            <img
              className="mb-[29px]"
              src={LogoIcon}
              alt="logo"
              width={164}
              height={44}
            />
          </Link>
        )}

        <div className="bg-[#363548] mx-[-24px] mb-[32px] max-md:mb-[24px] h-[2px]"></div>
        {!walletShow ? (
          <button
            className="flex flex-row justify-start items-center bg-[white]/[0.04] mb-[10px] max-md:mb-[24px] rounded-[10px] w-full btn-ghost"
            onClick={toggleWalletShow}
          >
            {isLoading ? (
              <Skeleton variant="circular" sx={{ bgcolor: 'gray.900' }}>
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar
                src={
                  typeof userProfile !== 'undefined' &&
                  userProfile.profilepic.length > 0 &&
                  typeof userProfile.profilepic[0] !== 'undefined' &&
                  userProfile.profilepic[0].fileId.length > 0
                    ? userActorServiceInstance.getUserImageUrl(
                        indexActorServiceInstance.userCanisterId,
                        userProfile.profilepic[0].fileId,
                      )
                    : UserIcon
                }
                sx={{ width: { xs: 32, md: 38 }, height: { xs: 32, md: 38 } }}
              />
            )}
            <div className="flex flex-col flex-1 justify-center items-start h-full text-left break-all">
              {isLoading ? (
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              ) : (
                <p className="line-clamp-1 text-[16px] text-white max-md:text-[13px]">
                  {userProfile
                    ? `${userProfile.firstname} ${userProfile.lastname}`
                    : ''}
                </p>
              )}
              {isLoading ? (
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              ) : (
                <p className="line-clamp-1 text-[#A9A9B1] text-[14px] max-md:text-[11px]">
                  {/* {selectedCoin
                    ? selectedCoin.addr
                    : '7ab21f534behdjf4e7ab21f534behdjf'} */}
                  {address}
                </p>
              )}
            </div>
            <p
              className="p-[0px] btn-ghost btn-icon"
              onClick={toggleWalletShow}
            >
              <MoreVert />
            </p>
          </button>
        ) : (
          <div className="mb-[32px] max-md:mb-[24px] w-full h-[69px] max-md:h-[52px]"></div>
        )}
        <div className="flex flex-col flex-1 gap-[2px] mb-[30px] w-full font-[500] text-[18px] select-none">
          {menuItems.map((item, indx) => {
            const destinationRoute =
              typeof item.router === 'function'
                ? item.router(userProfile.username)
                : item.router

            const isActiveRoute = location.pathname.startsWith(destinationRoute)
            return (
              <Link
                className={`${
                  isActiveRoute
                    ? 'btn-primary font-[500] text-[18px]'
                    : 'btn-ghost'
                } justify-start`}
                onClick={handleSidebarClose}
                to={destinationRoute}
                key={indx}
              >
                {React.cloneElement(item.icon, {
                  width: `${isonTabletOrMobile ? 18 : 24}`,
                  height: `${isonTabletOrMobile ? 18 : 24}`,
                  stroke: `${isActiveRoute ? 'white' : '#BCBCC2'}`,
                })}
                {item.title}
              </Link>
            )
          })}
        </div>
        {isAuthenticated && (
          <button onClick={handleLogoutClick} className="btn-ghost">
            Logout
          </button>
        )}
      </div>
      {/* <div>
        <div className="bg-[#FFFFFF1A] mx-[-24px] mb-[24px] h-[1.5px]"></div>
        <ul className="flex flex-col gap-[22px] w-full">
          {categories
            .sort((a, b) => b.value - a.value)
            .map((category, index) => (
              <li
                className="flex justify-between items-center w-full text-[#BCBCC2] cursor-pointer"
                key={index}
              >
                <div className="flex items-center gap-[12px]">
                  <div
                    className={`${
                      styles[category.caption.toLowerCase()]
                    } w-[8px] h-[8px] rounded-[100%]`}
                  ></div>
                  <p className="text-[16px] max-md:text-[13px]">
                    {category.caption}
                  </p>
                </div>
                <p className="flex bg-[#363548] p-[2px_6px] rounded-[5px] text-[14px] text-center max-md:text-[13px]">
                  {category.value}
                </p>
              </li>
            ))}
        </ul>
      </div> */}

      <WalletList
        isOpen={walletShow}
        coins={tokenLedgerArr}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        handleClose={handleWalletClose}
      />
    </div>
  )
}

export default SideBar
