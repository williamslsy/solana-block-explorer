'use client';

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from './ui/button';
import Wallet from './ui/wallet';
import Account from './account';
import { useBalanceContext } from '@/hooks/useBalanceContext';

function Login() {
  const { disconnect, connected } = useWallet();
  const { totalBalance } = useBalanceContext();
  const { setVisible } = useWalletModal();
  const [walletLoading, setWalletLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (connected !== undefined) {
      setWalletLoading(false);
    }
  }, [connected]);

  const openWalletModal = () => {
    setIsSheetOpen(false);
    setTimeout(() => setVisible(true), 200);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        {walletLoading ? (
          <div className="rounded-2xl w-12 h-11" />
        ) : connected ? (
          <Button className="rounded-2xl">
            <Wallet />
          </Button>
        ) : (
          <Button className="rounded-2xl" variant="default">
            <Wallet />
            <span className="text-sm font-medium">Login</span>
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="bg-background border-0 text-white flex flex-col lg:w-[350px]">
        <div className="flex items-center justify-between mb-6">
          {connected && (
            <SheetTrigger asChild>
              <div className="flex items-center cursor-pointer transition-transform duration-200 hover:-translate-x-1">
                <Image src="/assets/arrow-left.svg" alt="Back" width={24} height={24} />
              </div>
            </SheetTrigger>
          )}

          <div className="flex flex-col items-center flex-grow">
            <SheetTitle className="font-light text-base text-[#9592A0]">Total balance</SheetTitle>
            <div className="mt-2 text-white_primary text-4xl font-semibold">${connected ? totalBalance?.toFixed(1) : '0.0'}</div>
          </div>

          {connected && (
            <div onClick={disconnect} className="cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:text-white_secondary">
              <Image src="/assets/logout.svg" alt="Logout" width={24} height={24} />
            </div>
          )}
        </div>

        {connected ? (
          <Account />
        ) : (
          <div className="flex mx-auto my-auto">
            <Button onClick={openWalletModal} className="rounded-2xl">
              <Wallet />
              <span className="">Connect</span>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Login;
