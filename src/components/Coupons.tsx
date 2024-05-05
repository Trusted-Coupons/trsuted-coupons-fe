'use client';

import React, { FC, Fragment, useState } from 'react';
import CouponCard from '@/components/couponCard';
import CouponModal from '@/components/couponModal';
import placeholder from '../../public/images/coupon_placeholder_01.jpg';
import Image from 'next/image';

const couponList = [
  {
    couponImageUrl: 'https://example.com/image1.jpg',
    title: '50% Off on Electronics',
    description: 'Get 50% off on all electronics items. Limited time offer!',
    code: 'ELECTRO50',
    expireDate: '2024-12-10'
  },
  {
    couponImageUrl: 'https://example.com/image2.jpg',
    title: 'Free Shipping on Orders Over $50',
    description: 'Enjoy free shipping on all orders over $50. Hurry, shop now!',
    code: 'SHIPFREE',
    expireDate: '2024-11-30'
  },
  {
    couponImageUrl: 'https://example.com/image3.jpg',
    title: '20% Off on Clothing',
    description: "Take 20% off on all clothing items. Don't miss out!",
    code: 'CLOTHING20',
    expireDate: '2024-12-15'
  },
  {
    couponImageUrl: 'https://example.com/image4.jpg',
    title: '$10 Off on Beauty Products',
    description: 'Save $10 on all beauty products. Limited stock available!',
    code: 'BEAUTY10',
    expireDate: '2024-11-25'
  },
  {
    couponImageUrl: 'https://example.com/image5.jpg',
    title: 'Buy One, Get One Free on Books',
    description: 'Buy one book and get another one free. Limited offer!',
    code: 'BOOKSBOGO',
    expireDate: '2024-12-05'
  }
];

interface CouponsProps {}

const Coupons: FC<CouponsProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col mb-4 gap-y-1 text-black max-w-7xl p-2 pb-8 lg:gap-y-3">
          <h3 className="h3 uppercase text-xs font-medium md:text-base">
            Saving your money since 2024
          </h3>
          <h1 className="h1 font-medium text-lg md:text-4xl">Popular coupons</h1>
          <h2 className="h2 opacity-70 text-sm md:text-xl">
            Look for your favorite store and save yourself some money
          </h2>
        </div>
        <div className="flex gap-2 justify-center"></div>
      </div>
      <div className="flex gap-x-14">
        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="w-full flex flex-col flex-1 items-start gap-8">
            {couponList &&
              couponList?.map((coupon, index) => {
                return (
                  <Fragment key={index}>
                    <CouponCard
                      title={coupon.title}
                      description={coupon.description}
                      code={coupon.code}
                      expireDate={coupon.expireDate}
                      couponImageUrl={coupon.couponImageUrl}
                      setIsOpen={setIsOpen}
                    />
                    <CouponModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
                  </Fragment>
                );
              })}
          </div>
        </div>
        {/* Sidebar */}
        <div className="flex-col hidden md:flex max-w-[25rem] gap-y-6">
          <div className="border-2 border-gray-300 rounded-3xl p-4">
            <h3 className="text-2xl pb-6">Best Coupons</h3>
            <div className="flex gap-x-3 mb-1 border-2 border-gray-300 rounded-3xl overflow-hidden py-2 px-4">
              <Image src={placeholder} width={16} height={16} alt="coupon card" />
              <span>sdaadsa dsadas sda dasd asd asdsaas</span>
            </div>
            <div className="flex gap-x-3 mb-1 border-2 border-gray-300 rounded-3xl overflow-hidden py-2 px-4">
              <Image src={placeholder} width={16} height={16} alt="coupon card" />
              <span>sdaadsa dsadas sda dasd asd asdsaas</span>
            </div>
            <div className="flex gap-x-3 mb-1 border-2 border-gray-300 rounded-3xl overflow-hidden py-2 px-4">
              <Image src={placeholder} width={16} height={16} alt="coupon card" />
              <span>sdaadsa dsadas sda dasd asd asdsaas</span>
            </div>
            <div className="flex gap-x-3 mb-1 border-2 border-gray-300 rounded-3xl overflow-hidden py-2 px-4">
              <Image src={placeholder} width={16} height={16} alt="coupon card" />
              <span>sdaadsa dsadas sda dasd asd asdsaas</span>
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-3xl p-4">
            <h3 className="text-2xl pb-6">Best Stores</h3>
          </div>

          <div className="border-2 border-gray-300 rounded-3xl p-4">
            <h3 className="text-2xl pb-6">Email Newsletter</h3>
            <p className="font-light">
              Your email is safe with us and we hate spam as much as you do. Lorem ipsum dolor sit
              amet et dolore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
