'use client';

import { useState, FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Store } from '@/types/api.types';

import Image from 'next/image';
import tagImage from '../../../public/images/tag.png';

interface CouponsProps {
  stores: Store[];
}

const stores = {
  A: [
    { id: 89, img: '', title: 'Halo', stores: 20 },
    { id: 89, img: '', title: 'Halo', stores: 20 },
    { id: 89, img: '', title: 'Halo', stores: 20 },
    { id: 89, img: '', title: 'Halo', stores: 20 },
    { id: 89, img: '', title: 'Halo', stores: 20 },
    { id: 89, img: '', title: 'Halo', stores: 20 }
  ],
  B: [{ id: 30, img: '', title: 'Halo', stores: 98 }],
  C: [{ id: 3, img: '', title: 'Halo', stores: 1 }]
};

const alphabet = [
  'All',
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i).toUpperCase())
];

const Stores: FC<CouponsProps> = () => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  const [selectedChar, setSelectedChar] = useState('All');

  const renderList = () => {
    if (selectedChar == 'All') {
      return Object.entries(stores).map(([key, stores]) => (
        <div key={key} className="flex flex-col">
          <span className="pb-2">{key}</span>
          <div className="grid grid-cols-2 gap-1 border-solid border-0 border-t border-gray py-2">
            {stores.map((store) => (
              <div
                key={store.id}
                className="flex bg-light-gray p-4 text-sm gap-x-4 hover:cursor-pointer"
                onClick={() => router.push(`/${params.lang}/stores/${store.id}`)}>
                <Image src={tagImage} alt="image" />
                <span className="mr-auto">{store.title}</span>
                <span className="text-black opacity-60">({store.stores} coupons)</span>
              </div>
            ))}
          </div>
        </div>
      ));
    }

    return (
      <div className="flex flex-col">
        <span className="pb-2">{selectedChar}</span>
        <div className="grid grid-cols-2 gap-1 border-solid border-0 border-t border-gray py-2">
          {stores[selectedChar as keyof typeof stores].map((store) => (
            <div
              key={store.id}
              className="flex bg-light-gray p-2 text-sm"
              onClick={() => router.push(`/${params.lang}/stores/${store.id}`)}>
              <Image src={tagImage} alt="image" />
              <span className="mr-auto">{store.title}</span>
              <span>{store.stores}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col border-1 border-gray rounded-3xl">
      <div className="flex flex-wrap gap-x-6 ml-auto mr-auto opacity-60 px-8 pt-4">
        {alphabet.map((char) => (
          <span
            key={char}
            className="hover:cursor-pointer pb-4"
            onClick={() => setSelectedChar(char)}>
            {char}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-y-4 px-8 py-4">{renderList()}</div>
    </div>
  );
};

export default Stores;
