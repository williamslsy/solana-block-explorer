'use client';

import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { FC, useMemo } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletModalProvider } from './WalletModalProvider';

type Props = {
  children?: React.ReactNode;
};

export const SolanaWalletProvider: FC<Props> = ({ children }) => {
  const MAINNET_URL = 'https://solana-mainnet.g.alchemy.com';

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={MAINNET_URL}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
