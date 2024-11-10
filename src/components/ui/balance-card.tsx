import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface BalanceCardProps {
  tokenSymbol: string;
  tokenBalance: number;
  tokenLogoURI: string;
  tokenPrice: number;
}

export const BalanceCard = ({ tokenSymbol, tokenBalance, tokenLogoURI, tokenPrice }: BalanceCardProps) => {
  return (
    <Card className="bg-translucent rounded-xl px-4 py-2 w-full border-none">
      <CardContent>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <Image src={tokenLogoURI} alt={tokenSymbol} width={24} height={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-white">{tokenSymbol}</span>
              <p className="text-xs font-light text-gray-400">{tokenBalance.toFixed(4)}</p>
            </div>
          </div>
          <div className="text-lg font-semibold text-white">${(tokenBalance * tokenPrice).toFixed(2)}</div>
        </div>
      </CardContent>
    </Card>
  );
};
