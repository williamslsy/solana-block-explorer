import { useBalanceContext } from '@/hooks/useBalanceContext';
import { BalanceCard } from './ui/balance-card';

const UserBalances = () => {
  const { tokenPrices, solBalance, tokenBalances, loading } = useBalanceContext();

  if (loading) {
    return <p>Loading balances...</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 max-h-[400px] overflow-y-auto w-[286px]">
      {solBalance !== null && tokenPrices && <BalanceCard tokenSymbol="SOL" tokenBalance={solBalance} tokenLogoURI="/assets/Solana.svg" tokenPrice={tokenPrices.SOL} />}

      {tokenBalances.map((token, index) => (
        <BalanceCard
          key={index}
          tokenSymbol={token.tokenSymbol}
          tokenBalance={token.tokenBalance}
          tokenLogoURI={token.tokenLogoURI}
          tokenPrice={tokenPrices?.[token.tokenSymbol as keyof typeof tokenPrices] || 0}
        />
      ))}
    </div>
  );
};

export default UserBalances;
