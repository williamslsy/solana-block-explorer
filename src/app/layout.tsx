import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import { Header } from '@/components/header';
import { SolanaWalletProvider } from '@/contexts/WalletProvider';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Sol Block Explorer',
  description: 'a simple sol block explorer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={openSans.className}>
        <SolanaWalletProvider>
          <Header />
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
