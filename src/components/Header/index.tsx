import React, { useState } from 'react'
// import { useMediaQuery } from 'react-responsive'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  styled,
  useMediaQuery,
} from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import LandingIcon from 'assets/svg/logo-landing.svg'
import styles from './index.module.css'

interface Props {
  handleLogin: any
  handleSignUp: any
}
export default function Header({ handleLogin, handleSignUp }: Props) {
  //   const isonBigScreen = useMediaQuery({ query: '(min-width: 1600px)' })
  //   const isonMiddleScreen = useMediaQuery({ query: '(max-width: 1368px)' })
  //   const isonTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  //   const isonPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  //   const isonRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  const isonTabletOrMobile = useMediaQuery('(max-width: 768px)')
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsMobileMenu(open)
    }

  const MobileSideBarMenu = styled(Drawer)<{ component?: React.ElementType }>({
    '& .MuiDrawer-paper': {
      background: '#FFFFFF1A',
      color: '#fff',
      padding: '50px 0px',
    },
  })
  const MenuItem = styled(ListItemButton)<{ component?: React.ElementType }>({
    '&': {
      padding: '8px 24px',
    },
  })

  return (
    <div className={styles.root}>
      <div className="absolute h-[1px] bottom-0 w-full white-gradient"></div>

      {isonTabletOrMobile ? (
        <div className="flex w-full px-[24px] justify-between">
          <img src={LandingIcon} alt="logo" />
          <button
            className="w-[48px] h-[48px] rounded-full bg-[#A7B4CD0D] text-white/80 border border-[#9B96B00D]"
            onClick={toggleDrawer(true)}
          >
            <MenuOutlined width={12} height={12} />
          </button>
          <MobileSideBarMenu
            open={isMobileMenu}
            onClose={toggleDrawer(false)}
            anchor="right"
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List component="nav" aria-label="main mailbox folders">
                <MenuItem>
                  <ListItemText primary="About us" />
                </MenuItem>
                <MenuItem>
                  <ListItemText primary="Features" />
                </MenuItem>
                <MenuItem>
                  <ListItemText primary="How it works" />
                </MenuItem>
                <MenuItem>
                  <ListItemText primary="Reviews" />
                </MenuItem>
                <MenuItem>
                  <ListItemText primary="FAQ" />
                </MenuItem>
              </List>
              <Divider color="#383838" />
              <List component="nav" aria-label="main mailbox folders">
                <MenuItem onClick={handleLogin}>
                  <ListItemText primary="Log in" />
                </MenuItem>
                {/* <MenuItem onClick={handleSignUp}>
                  <ListItemText primary="Sign up" />
                </MenuItem> */}
              </List>
            </Box>
          </MobileSideBarMenu>
        </div>
      ) : (
        <>
          <img src={LandingIcon} alt="logo" className="mr-[220px]" />
          <div className={styles.menu}>
            <a className={styles.menuitem} href="#aboutus">
              About us
            </a>
            <a className={styles.menuitem} href="#features">
              Features
            </a>
            <a className={styles.menuitem} href="#howitworks">
              How it works
            </a>
            <a className={styles.menuitem} href="#reviews">
              Reviews
            </a>
            <a className={styles.menuitem} href="#faq">
              FAQ
            </a>
          </div>
          <div className="flex gap-[12px] text-white text-[14px]">
            <button className="bg-none p-[12px_36px]" onClick={handleLogin}>
              Log in
            </button>
            {/* <button
              className="bg-[#110A21] border border-[#2e68ff] rounded-[8px] p-[12px_36px]"
              onClick={handleSignUp}
            >
              Sign up
            </button> */}
          </div>
        </>
      )}
    </div>
  )
}
