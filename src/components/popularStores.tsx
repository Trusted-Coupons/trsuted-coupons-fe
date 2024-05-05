import Image from 'next/image';
import React from 'react';
import placeholderImg from '../../public/images/placeholder_store_01.jpeg';

type StoreProps = {
  storeImg: string;
  storeName: string;
};

const stores: StoreProps[] = [
  {
    storeImg: '/images/placeholder_store_01.jpeg',
    storeName: 'Addidas.com'
  },
  {
    storeImg: '/images/placeholder_store_01.jpeg',
    storeName: 'Nike.com'
  },
  {
    storeImg: '/images/placeholder_store_01.jpeg',
    storeName: 'Google.com'
  },
  {
    storeImg: '/images/placeholder_store_01.jpeg',
    storeName: 'Amazon.com'
  },
  {
    storeImg: '/images/placeholder_store_01.jpeg',
    storeName: 'Zara.com'
  },
  { storeImg: '/images/placeholder_store_01.jpeg', storeName: 'Telekom.com' }
];

const PopularStores = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-16 gap-y-1 text-black max-w-7xl p-2 lg:p-6 lg:gap-y-3 lg:px-8">
        <h3 className="h3 uppercase text-xs font-medium md:text-base">
          Saving your money since 2024
        </h3>
        <h1 className="h1 font-medium text-lg md:text-4xl">Popular stores</h1>
        <h2 className="h2 opacity-70 text-sm md:text-xl">
          Look for your favorite store and save yourself some money
        </h2>
      </div>
      <div className="flex gap-2 justify-center">
        {stores.map((store: StoreProps, index) => {
          return (
            <div key={index} className="flex flex-col gap-2 items-center">
              <Image src={placeholderImg} width={158} height={94} alt="popular stores" />
              {store.storeName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularStores;
