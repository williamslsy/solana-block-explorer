import { WalletModalContext, WalletModalProviderProps } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { CustomWalletModal } from '../components/custom-wallet-modal';

export const WalletModalProvider: React.FC<WalletModalProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
      {visible && <CustomWalletModal />}
    </WalletModalContext.Provider>
  );
};
