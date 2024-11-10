'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

import blocks from '@/constants/blocks.json';
import { Card, CardHeader } from '@/components/ui/card';

import { formatDateUTC, truncateHash } from '@/lib/utils';

import InfoCard from '@/components/ui/info-card';
import { useTimeAgo } from '@/hooks/useTimeAgo';

interface BlockDetailsProps {
  params: {
    slot: string;
  };
}

export default function BlockDetails({ params }: BlockDetailsProps) {
  const router = useRouter();
  const block = blocks.find((b) => b.slot.toString() === params.slot);

  if (!block) {
    notFound();
  }

  const timeAgo = useTimeAgo(block.timestamp);

  const sortedBlocks = blocks.sort((a, b) => a.slot - b.slot);

  const currentIndex = sortedBlocks.findIndex((b) => b.slot === block.slot);

  const previousBlock = currentIndex > 0 ? sortedBlocks[currentIndex - 1] : null;
  const nextBlock = currentIndex < sortedBlocks.length - 1 ? sortedBlocks[currentIndex + 1] : null;

  const handleNavigation = (slot: number) => {
    router.push(`/block/${slot}`);
  };

  return (
    <div className="max-w-[800px] mx-auto mt-[72px]">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="flex items-center justify-center p-6 w-16 h-[105px] bg-translucent rounded-2xl transition-transform duration-200 hover:-translate-x-2">
          <Image src="/assets/arrow-left.svg" alt="Back" width={24} height={24} />
        </button>

        <Card className="relative flex h-[105px] w-full items-center justify-between rounded-2xl border border-titanium bg-dark">
          <CardHeader className="flex flex-row items-center gap-4 p-6">
            <Image src="/assets/Solana.svg" alt="Block" width={40} height={40} />
            <div>
              <div className="text-white_primary text-2xl">Block #{block.slot}</div>
              <p className="text-white_secondary text-sm mt-2">Check the block details.</p>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-10">
          <InfoCard
            title="Block"
            content={
              <div className="flex items-center gap-2">
                {previousBlock && (
                  <button onClick={() => handleNavigation(previousBlock.slot)} className="hover:text-white_secondary">
                    <Image src="/assets/arrow-left.svg" alt="Previous" width={16} height={16} />
                  </button>
                )}
                <span>#{block.slot}</span>
                {nextBlock && (
                  <button onClick={() => handleNavigation(nextBlock.slot)} className="hover:text-white_secondary">
                    <Image src="/assets/arrow-right.svg" alt="Next" width={16} height={16} />
                  </button>
                )}
              </div>
            }
          />
          <InfoCard title="Timestamp" content={timeAgo} />
          <InfoCard title="Date (UTC)" content={formatDateUTC(block.timestamp)} />
          <InfoCard title="Transactions" content={block.txCount.toString()} />
        </div>

        <InfoCard title="Block hash" content={block.blockHash} fullWidth />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard
            title="Leader"
            content={
              <div className="flex items-center gap-2">
                <span className="text-green_primary">{truncateHash(block.leader)}</span>
                <button className="text-white_secondary hover:text-white_primary">
                  <Image src="/assets/copy.svg" alt="Copy" width={16} height={16} />
                </button>
              </div>
            }
            highlighted={true}
          />
          <InfoCard
            title="Reward"
            content={
              <div className="flex items-center gap-2">
                <Image src="/assets/Solana.svg" alt="Solana" width={16} height={16} />
                <span className="text-white_primary font-medium">{block.rewardSol.toFixed(4)} SOL</span>
                <span className="text-white_secondary">
                  (${block.rewardUsd.toFixed(2)} @ ${block.solanaPriceUsd})
                </span>
              </div>
            }
          />
        </div>

        <InfoCard title="Previous Block Hash" content={block.prevBlockHash} fullWidth />
      </div>
    </div>
  );
}
