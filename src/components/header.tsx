import { BalanceProvider } from '@/contexts/BalanceProvider';
import Login from './login';
import Logo from './ui/logo';
import { fetchTokenPrices } from '@/lib/server-utils';

export const Header = async () => {
  const initialTokenPrices = await fetchTokenPrices();

  return (
    <header className="flex justify-between items-center px-12 py-8 border border-titanium">
      <Logo />
      <BalanceProvider initialPrices={initialTokenPrices}>
        <Login />
      </BalanceProvider>
    </header>
  );
};
