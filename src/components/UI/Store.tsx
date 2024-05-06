import type { FC } from 'react';
import Image from 'next/image';

import placeholderImg from '../../../public/images/placeholder_store_01.jpeg';
import Link from 'next/link';

interface StoreProps {}

const Store: FC<StoreProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center border-1 border-gray rounded-3xl p-8">
      <Image className="h-36 w-36" height={200} width={200} src={placeholderImg} alt="Store" />
      <h3>Store</h3>
      <Link href="/">https:///dsasd.acom</Link>
      <p>sdadsaadsdasads sad asdas dasd as</p>
    </div>
  );
};

export default Store;
