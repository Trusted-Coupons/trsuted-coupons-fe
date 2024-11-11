'use client';

import { useState, FC, PropsWithChildren } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Store, Coupon } from '@/types/api.types';

import Image from 'next/image';
import CouponModal from './CouponModal';

import tagImg from '../../../public/images/tag.png';
import PopularCategories from './PopularCategories';

interface CouponsProps {
  bestCoupons?: Coupon[];
  bestStores?: Store[];
  withoutHeader?: boolean;
}

const Coupons: FC<PropsWithChildren<CouponsProps>> = ({ children }) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  const [modalIsOpen, setIsOpen] = useState(-1);

  function closeModal() {
    setIsOpen(-1);
  }

  return (
    <div className={`flex flex-col`}>
      <div className="flex flex-col md:flex-row gap-x-10 gap-y-10 justify-center">
        <div className="flex flex-col gap-10">{children}</div>
        <div className="w-full flex-col md:flex md:max-w-[20rem] lg:max-w-[25rem] lg:gap-y-6">
          <div className="border-1 mb-8 border-gray rounded-3xl p-6 lg:p-8 lg:mb-0">
            {/* sidebar */}
            <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
              Welcome to trusted.<span className="text-primary">coupons</span>
            </h3>
            <p>
              We provide you with a huge selection of vouchers and voucher codes for the most
              popular online shops across 94 countries!
              <br />
              <br />
              Savings portal trusted.coupons – save money with vouchers when shopping smart
              Trusted.coupons is a leading global savings portal. By using the free vouchers and
              voucher codes on our website, clever shoppers can save money on every purchase in
              numerous online shops worldwide. There are many good reasons to use savings portals in
              general and trusted.coupons in particular.
            </p>
          </div>
          {/* <PopularCategories /> */}
          <div className="flex flex-col border-1 border-gray rounded-3xl p-6 lg:p-8">
            <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">Email Newsletter</h3>
            <p className="font-light text-xs lg:text-sm opacity-60 mb-6">
              Your email is safe with us and we hate spam as much as you do. Lorem ipsum dolor sit
              amet et dolore.
            </p>
            <input
              className="bg-gray rounded-full p-2 px-6 text-sm outline-none mb-4 opacity-60"
              placeholder="Enter your name..."
            />
            <input
              className="bg-gray rounded-full py-2 px-6 text-sm outline-none mb-4 opacity-60"
              placeholder="Enter your email..."
            />
            <button className="bg-primary rounded-full py-2 text-white text-sm">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
