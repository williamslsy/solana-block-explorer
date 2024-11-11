import { TokenPrices } from './types';

export const fetchTokenPrices = async (): Promise<TokenPrices> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,usd-coin,tether,ethereum&vs_currencies=usd', { next: { revalidate: 300 } });

    if (!response.ok) {
      throw new Error('Failed to fetch token prices');
    }

    const data = await response.json();

    const tokenPrices: TokenPrices = {
      SOL: data.solana.usd,
      USDC: data['usd-coin'].usd,
      USDT: data.tether.usd,
      ETH: data.ethereum.usd,
    };

    return tokenPrices;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw error;
  }
};
