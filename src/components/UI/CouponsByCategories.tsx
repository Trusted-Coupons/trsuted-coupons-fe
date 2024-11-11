'use client';
import { Store } from '@/types/api.types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import CouponSmallCard from './CouponCardSmall';

interface StoresListProps {
  storesList: Store[];
  category: string;
}

const CouponsByCategories: FC<StoresListProps> = ({ storesList, category }) => {
  // Limit to a maximum of 6 stores
  const limitedStoresList = storesList.slice(0, 6);

  // Find the highest-rated coupon for each store
  const storesWithHighestRatedCoupons = limitedStoresList.map((store) => {
    const highestRatedCoupon = store.coupons.reduce((highest, current) => {
      return current.rating > (highest?.rating || 0) ? current : highest;
    }, store.coupons[0]);

    return {
      store: store.store,
      id: store.id,
      highestRatedCoupon
    };
  });

  // Sort stores by the highest-rated coupon in descending order
  const sortedStores = storesWithHighestRatedCoupons.sort((a, b) => {
    return b.highestRatedCoupon.rating - a.highestRatedCoupon.rating;
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-1 text-black max-w-7xl py-2">
          <h2 className="font-medium text-xl md:text-2xl">
            Popular {category} <span className="text-primary">Coupons</span>
          </h2>
          <h3 className="opacity-70 text-sm font-light md:text-lg">
            Check out the most popular coupons
          </h3>
        </div>
      </div>

      {/* Grid for stores */}
      <div className="grid grid-cols-2 gap-4 justify-center">
        {sortedStores.map(({ id, highestRatedCoupon }) => (
          <CouponSmallCard highestRatedCoupon={highestRatedCoupon} id={id} />
        ))}
      </div>
    </div>
  );
};

export default CouponsByCategories;
