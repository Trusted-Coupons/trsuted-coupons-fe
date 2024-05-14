'use client';

import { useState, FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Store } from '@/types/api.types';

import Image from 'next/image';

interface StoresProps {
  alphabetStores: Record<string, Store[]>;
}

const alphabet = ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))];

const Stores: FC<StoresProps> = ({ alphabetStores }) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  const [selectedChar, setSelectedChar] = useState('All');

  const renderList = () => {
    if (selectedChar == 'All') {
      return Object.entries(alphabetStores).map(([key, stores]) => (
        <div key={key} className="flex flex-col">
          <span className="pb-2">{key.toUpperCase()}</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 border-solid border-0 border-t border-gray py-2">
            {stores.map(({ id, icon, store, coupons }) => (
              <div
                key={id}
                className="flex items-center bg-light-gray p-4 text-sm gap-x-4 hover:cursor-pointer"
                onClick={() => router.push(`/${params.lang}/stores/${id}`)}>
                <Image
                  src={`https://logo.clearbit.com/${store}?height=30`}
                  width={30}
                  height={30}
                  alt={store}
                />
                <span className="mr-auto">{store}</span>
                <span className="text-black opacity-60">({coupons.length} coupons)</span>
              </div>
            ))}
          </div>
          {stores.length == 0 && (
            <span className="opacity-40 ml-auto mr-auto text-xs lg:text-sm">No stores to show</span>
          )}
        </div>
      ));
    }

    return (
      <div className="flex flex-col">
        <span className="pb-2">{selectedChar.toUpperCase()}</span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 border-solid border-0 border-t border-gray py-2">
          {alphabetStores[selectedChar as keyof typeof alphabetStores].map(
            ({ id, icon, store, coupons }) => (
              <div
                key={id}
                className="flex items-center bg-light-gray p-4 text-sm gap-x-4 hover:cursor-pointer"
                onClick={() => router.push(`/${params.lang}/stores/${id}`)}>
                <Image
                  src={`https://logo.clearbit.com/${store}?height=30`}
                  width={30}
                  height={30}
                  alt={store}
                />
                <span className="mr-auto">{store}</span>
                <span className="text-black opacity-60">({coupons.length} coupons)</span>
              </div>
            )
          )}
        </div>
        {alphabetStores[selectedChar as keyof typeof alphabetStores].length == 0 && (
          <span className="opacity-40 ml-auto mr-auto text-xs lg:text-sm">No stores to show</span>
        )}
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
            {char.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-y-4 px-8 py-4">{renderList()}</div>
    </div>
  );
};

export default Stores;
