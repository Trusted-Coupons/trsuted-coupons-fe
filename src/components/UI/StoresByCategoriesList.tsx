'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface StoresListProps {
  storeByCategorie: any;
  storeHeading: string;
}

const StoresByCategoriesList: FC<StoresListProps> = ({ storeByCategorie, storeHeading }) => {
  // Filter and collect stores related to 'travel'

  const result: any[] = [];
  for (const category in storeByCategorie) {
    const stores = storeByCategorie[category];
    if (stores.length > 0) {
      stores.forEach((store: any) => {
        result.push(store);
      });
    }
  }

  // Slice the result to get only the first 8 stores
  const limitedStores = result.slice(0, 8);

  // Create rows with 4 stores per row
  const rows = [];
  for (let i = 0; i < limitedStores.length; i += 4) {
    rows.push(limitedStores.slice(i, i + 4));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-1 text-black max-w-7xl py-2">
          <h4 className="uppercase text-xs font-medium md:text-base">
            Find the best deals in 2024
          </h4>
          <h2 className="font-medium text-lg md:text-4xl">
            {storeHeading} <span className="text-primary">Stores</span>
          </h2>
          <h3 className="opacity-70 text-sm font-light md:text-lg">
            Look for your favorite store and save yourself some money
          </h3>
        </div>
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row gap-4 mb-4">
          {row.map((store: any) => (
            <Link
              href={`/stores/${store.id}`}
              key={store.id}
              className="flex-1 text-center border border-black/10 rounded-3xl p-2 cursor-pointer max-w-[215px]">
              <div className="max-w-[215px] h-[130px] flex justify-center items-center">
                <Image
                  className="max-w-[5rem]"
                  src={`https://logo.clearbit.com/${store.store}?height=200`}
                  width={200}
                  height={40}
                  alt={store}
                />
              </div>
              {store.store}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StoresByCategoriesList;
