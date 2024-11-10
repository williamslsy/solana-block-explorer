import BlockTable from '@/components/block-table';
import HeadLine from '@/components/headline';

export default function Home() {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <HeadLine />
      <BlockTable />
    </div>
  );
}
