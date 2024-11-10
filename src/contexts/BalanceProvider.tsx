'use client';

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTokenData } from '@/hooks/useTokenData';
import { TokenBalance, TokenPrices } from '@/lib/types';

interface BalanceContextProps {
  tokenPrices: TokenPrices | null;
  solBalance: number | null;
  tokenBalances: TokenBalance[];
  totalBalance: number;
  loading: boolean;
}

export const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode; initialPrices: TokenPrices }> = ({ children, initialPrices }) => {
  const { publicKey } = useWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [tokenPrices] = useState<TokenPrices>(initialPrices);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const tokens = useTokenData();

  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey || tokens.length === 0) return;

      const connection = new Connection(`https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, 'confirmed');

      try {
        const balanceLamports = await connection.getBalance(publicKey);
        const solBalanceInUSD = (balanceLamports / LAMPORTS_PER_SOL) * (tokenPrices.SOL || 0);
        setSolBalance(parseFloat((balanceLamports / LAMPORTS_PER_SOL).toFixed(4)));

        const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        const fetchedTokens = response.value.map((tokenAccountInfo) => {
          const accountData = tokenAccountInfo.account.data.parsed.info;
          const mintAddress = accountData.mint;
          const tokenBalance = accountData.tokenAmount.uiAmount;

          const tokenInfo = tokens.find((t) => t.address === mintAddress);
          if (tokenInfo && tokenPrices[tokenInfo.symbol as keyof TokenPrices]) {
            return {
              tokenSymbol: tokenInfo.symbol,
              tokenBalance: parseFloat(tokenBalance.toFixed(4)),
              tokenLogoURI: tokenInfo.logoURI || '/assets/Solana.svg',
            };
          }
          return null;
        });

        const validTokenBalances = fetchedTokens.filter(Boolean) as TokenBalance[];
        setTokenBalances(validTokenBalances);

        const tokenValuesInUSD = validTokenBalances.reduce((acc, token) => {
          const price = tokenPrices[token.tokenSymbol as keyof TokenPrices] || 0;
          return acc + token.tokenBalance * price;
        }, 0);

        setTotalBalance(parseFloat((solBalanceInUSD + tokenValuesInUSD).toFixed(1)));
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setLoading(false);
      }
    };

    if (publicKey && tokens.length > 0) {
      fetchBalances();
    }
  }, [publicKey, tokens, tokenPrices]);

  return <BalanceContext.Provider value={{ tokenPrices, solBalance, tokenBalances, totalBalance, loading }}>{children}</BalanceContext.Provider>;
};
