import React, { useCallback, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';

export const CustomWalletModal = () => {
  const { wallets, select } = useWallet();
  const { setVisible } = useWalletModal();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleWalletClick = useCallback(
    (walletName: WalletName) => {
      select(walletName);
      handleClose();
    },
    [select, handleClose]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <Card ref={cardRef} className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center mb-4 p-1">
          <span onClick={handleClose} className="p-2 hover:text-white_secondary transition-colors cursor-pointer">
            <Image src="/assets/arrow-left.svg" alt="Back" width={24} height={24} />
          </span>
          <h2 className="text-base font-medium text-white text-center flex-1 mr-8">Connect a Solana Wallet to continue</h2>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
          {wallets.map((wallet) => (
            <WalletOption key={wallet.adapter.name} name={wallet.adapter.name} icon={wallet.adapter.icon} onClick={() => handleWalletClick(wallet.adapter.name as WalletName)} />
          ))}
        </div>
      </Card>
    </div>
  );
};

const WalletOption = ({ name, icon, onClick }: { name: string; icon: string; onClick: () => void }) => (
  <button onClick={onClick} style={{ gap: '0.75rem' }} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] transition-colors duration-200 text-left">
    <Image src={icon} alt={name} width={24} height={24} className="rounded-full" />
    <span className="text-sm font-medium text-white">{name}</span>
  </button>
);
