'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Logo() {
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <div onClick={navigateHome} className="cursor-pointer">
      <Image src="/assets/Solana.svg" width={40} height={40} alt="logo" priority />
    </div>
  );
}

export default Logo;
