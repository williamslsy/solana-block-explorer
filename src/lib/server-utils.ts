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

// import { TokenPrices } from './types';
// import { TokenInfo } from '@solana/spl-token-registry';

// export const fetchTokenPrices = async (tokens: TokenInfo[]): Promise<TokenPrices> => {
//   try {
//     // Create a comma-separated list of token symbols or Coingecko IDs
//     const tokenIds = tokens
//       .map((token) => token.extensions?.coingeckoId)
//       .filter(Boolean)
//       .join(',');

//     const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd`, { next: { revalidate: 300 } });

//     if (!response.ok) {
//       throw new Error('Failed to fetch token prices');
//     }

//     const data = await response.json();

//     // Map the fetched data to TokenPrices format
//     const tokenPrices: TokenPrices = tokens.reduce((acc, token) => {
//       const coingeckoId = token.extensions?.coingeckoId;
//       if (coingeckoId && data[coingeckoId]) {
//         acc[token.symbol] = data[coingeckoId].usd;
//       }
//       return acc;
//     }, {} as TokenPrices);

//     return tokenPrices;
//   } catch (error) {
//     console.error('Error fetching token prices:', error);
//     throw error;
//   }
// };
