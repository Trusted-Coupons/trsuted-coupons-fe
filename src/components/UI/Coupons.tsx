'use client';

import { useState, FC, PropsWithChildren } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Store, Coupon } from '@/types/api.types';

import Image from 'next/image';
import CouponModal from './CouponModal';

interface CouponsProps {
  bestCoupons: Coupon[];
  bestStores: Store[];
  withoutHeader?: boolean;
}

const Coupons: FC<PropsWithChildren<CouponsProps>> = ({
  children,
  bestCoupons,
  bestStores,
  withoutHeader
}) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  const [modalIsOpen, setIsOpen] = useState(-1);

  function closeModal() {
    setIsOpen(-1);
  }

  return (
    <div className={`flex flex-col ${withoutHeader && 'pt-0 lg:pt-12'}`}>
      {!withoutHeader && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-1 mb-6 text-black max-w-7xl py-4 lg:mb-0 lg:py-12 lg:gap-y-3">
            <h4 className="uppercase text-xs font-medium md:text-base">
              Saving your money since 2024
            </h4>
            <h2 className="font-medium text-lg md:text-4xl">
              Popular <span className="text-primary">coupons</span>
            </h2>
            <h3 className="opacity-70 text-sm font-light md:text-lg">
              Look for your favorite store and save yourself some money
            </h3>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-x-6 gap-y-6">
        {children}
        <div className="w-full flex-col md:flex md:max-w-[20rem] lg:max-w-[25rem] lg:gap-y-6">
          <div className="border-1 mb-8 border-gray rounded-3xl p-6 lg:p-8 lg:mb-0">
            <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">Best Coupons</h3>
            {bestCoupons.map(({ id, title, brand_logo, label, description, code, end_date }) => (
              <div
                key={id}
                className="flex items-center gap-x-3 mb-2 border-1 border-gray rounded-3xl overflow-hidden py-2 px-4 hover:cursor-pointer"
                onClick={() => setIsOpen(id)}>
                <Image className="h-5 w-5" src={brand_logo} width={16} height={16} alt={title} />
                {id == modalIsOpen && (
                  <CouponModal
                    title={title}
                    logo={brand_logo}
                    label={label}
                    description={description}
                    code={code}
                    valid={end_date}
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                  />
                )}
                <span className="text-xs lg:text-sm">{title}</span>
              </div>
            ))}
          </div>
          <div className="border-1 border-gray rounded-3xl p-6 lg:p-8 mb-8 lg:mb-0">
            <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">Best Stores</h3>
            <div className="grid grid-cols-5 gap-3 mb-1 border-1 border-gray rounded-3xl overflow-hidden py-2 px-4 hover:cursor-pointer">
              {bestStores.map(({ id, store, icon }) => (
                <Image
                  key={id}
                  src={`https://logo.clearbit.com/${store}?height=15`}
                  height={15}
                  width={40}
                  alt={store}
                  onClick={() => router.push(`/${params.lang}/stores/${id}`)}
                />
              ))}
            </div>
          </div>
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
