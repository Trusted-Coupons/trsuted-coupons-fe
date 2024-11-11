'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface StoresListProps {
  storesList: any;
}

const MostSearchedStoresList: FC<StoresListProps> = ({ storesList }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-y-1 text-black max-w-7xl py-2">
        <h4 className="uppercase text-xs font-medium md:text-base">Find the best deals in 2024</h4>
        <h2 className="font-medium text-lg md:text-4xl">
          The most searched <span className="text-primary">stores</span>
        </h2>
        <h3 className="opacity-70 text-sm font-light md:text-lg">
          Look for your favorite store and save yourself some money
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {storesList.slice(0, 8).map(
          (
            store: any,
            index: any // Display 8 items (2 rows, 4 columns)
          ) => (
            <Link
              href={`/stores/${store.id}`}
              key={store.id}
              className="text-center border border-black/10 rounded-3xl p-6 cursor-pointer">
              <div className="w-[120px] h-[100px] flex justify-center items-center mx-auto">
                <Image
                  className="max-w-[4rem]"
                  src={`https://logo.clearbit.com/${store.store}?height=200`}
                  width={120}
                  height={100}
                  alt={store.store}
                />
              </div>
              <p className="mt-4">{store.store}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default MostSearchedStoresList;
