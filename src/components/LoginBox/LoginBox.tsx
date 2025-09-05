import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { Close } from '@mui/icons-material';
import GoogleLoginIcon from 'assets/svg/googleLogin.svg';
import LogoIcon from 'assets/svg/logo.svg';
import { ConnectWallet, useAuth, useIsInitializing } from '@nfid/identitykit/react';
import Spinner from 'components/Spinner/index.tsx';

interface LoginBoxProps {
  style?: SxProps<Theme>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  showCloseButton?: boolean;
}

const LoginBox = (props: LoginBoxProps) => {
  const { style, onClose, showCloseButton = false } = props;
  const connectWalletRef = React.useRef<HTMLDivElement>(null);

  const { isConnecting } = useAuth();
  const isInitializing = useIsInitializing();
  const isLoading = isConnecting || isInitializing;

  const handleConnect = () => {
    if (isLoading) return; // Prevent clicks while loading
    if (connectWalletRef.current) {
      const button = connectWalletRef.current.querySelector('button');
      if (button) {
        button.click();
      }
    }
  };

  return (
    <Box sx={style}>
      <div className="relative flex flex-col items-center bg-[#201F34] max-md:px-[24px] p-[40px] max-md:pt-[56px] pb-[48px] rounded-[12px] w-[600px] max-md:w-[310px] text-white select-none">
        {showCloseButton ? (
          <button
            onClick={onClose}
            className="top-[40px] max-md:top-[24px] right-[40px] max-md:right-[20px] absolute bg-[#29283C] rounded-[8px] w-[40px] max-md:w-[28px] h-[40px] max-md:h-[28px] text-[14px]"
          >
            <Close />
          </button>
        ) : null}
        <img className="mb-[8px] w-[56px] h-[56px]" src={LogoIcon} alt="logo" />
        <h1 className="mb-[22px] max-md:mb-[18px] text-[26px] text-center max-md:text-[20px]">
          Log in to KonectA with
        </h1>
        <div className="flex flex-col gap-[10px] max-md:gap-[12px] mb-[34px] max-md:mb-[20px] w-full text-[16px] text-white">
          <div
            onClick={handleConnect}
            className="flex justify-between items-center bg-[#29283C] max-md:py-[8px] p-[11px_16px] rounded-[11px] w-full h-[60px] max-md:text-[13px] cursor-pointer"
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? <p>Connecting...</p> : <p>NFID & Google</p>}
            {isLoading ? <Spinner size="small" /> : <img src={GoogleLoginIcon} alt="google" />}
          </div>
        </div>
        <p className="mt-[-8px] mb-[34px] max-md:mb-[20px] text-center max-md:text-[13px]">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
        <div ref={connectWalletRef} style={{ display: 'none' }}>
          <ConnectWallet />
        </div>
      </div>
    </Box>
  );
};

export default LoginBox;