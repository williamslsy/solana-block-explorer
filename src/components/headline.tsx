import React from 'react';
import { Card } from './ui/card';
import Image from 'next/image';

export default function HeadLine() {
  return (
    <Card className="w-full max-w-[800px] h-[105px] border border-titanium rounded-2xl flex items-center px-4 md:px-6 bg-[rgba(255,255,255,0.02)] mt-[72px]">
      <div className="flex items-center gap-4">
        <Image src="/assets/Solana.svg" alt="Solana" width={56} height={56} />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white md:text-xl">Solana block explorer</span>
          <p className="text-sm text-white_secondary opacity-70 mt-2">Check list of blocks and detailed view.</p>
        </div>
      </div>
    </Card>
  );
}
