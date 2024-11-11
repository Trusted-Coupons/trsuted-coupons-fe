'use client';
import { Store } from '@/types/api.types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface StoresListProps {
  storesList: Store[];
  category: string;
}

const StoresByCategory: FC<StoresListProps> = ({ storesList, category }) => {
  // Limit to a maximum of 6 stores
  const limitedStoresList = storesList.slice(0, 6);

  const storesWithHighestRatedCoupons = storesList.map((store) => {
    // Find the coupon with the highest rating in the current store's coupons array
    const highestRatedCoupon = store.coupons.reduce((highest, current) => {
      if (current.rating > (highest?.rating || 0)) {
        return current;
      }
      return highest;
    }, store.coupons[0]);

    // Return a new object with the store name, id, and the highest-rated coupon
    return {
      store: store.store,
      id: store.id,
      highestRatedCoupon
    };
  });

  // Sort the stores based on the highest-rated coupon's rating in descending order
  const sortedStores = storesWithHighestRatedCoupons.sort((a, b) => {
    return b.highestRatedCoupon.rating - a.highestRatedCoupon.rating;
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-1 text-black max-w-7xl py-2">
          <h2 className="font-medium text-xl md:text-2xl">
            {category} <span className="text-primary">Stores</span>
          </h2>
          <h3 className="opacity-70 text-sm font-light md:text-lg">
            Look for your favorite store and save yourself some money
          </h3>
        </div>
      </div>

      {/* Grid for stores */}
      <div className="grid grid-cols-2 gap-4 justify-center">
        {limitedStoresList.map((store) => (
          <Link
            href={`/stores/${store.id}`}
            key={store.id}
            className="text-center border border-black/10 rounded-3xl p-2 cursor-pointer">
            <div className=" h-[90px] flex justify-center items-center">
              <Image
                className="max-w-[5rem]"
                src={`https://logo.clearbit.com/${store.store}?height=160`}
                width={160}
                height={30}
                alt={store.store}
              />
            </div>
            <p className="text-small">{store.store}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoresByCategory;
