'use client';

import React, { FC, Fragment, useState } from 'react';
import { Coupon } from '@/app/[lang]/page';

import Image from 'next/image';
import CouponCard from '@/components/couponCard';
import CouponModal from '@/components/couponModal';
import tagImage from '../../../public/images/tag.png';

interface CouponsProps {
  coupons: Coupon[];
  bestCoupons: Coupon[];
  bestStores: Coupon[];
}

const Coupons: FC<CouponsProps> = ({ coupons, bestCoupons, bestStores }) => {
  const [modalIsOpen, setIsOpen] = useState(-1);

  function closeModal() {
    setIsOpen(-1);
  }

  return (
    <div className="flex flex-col p-14">
      <div className="flex gap-x-14">
        <div className="flex flex-col flex-1 border-1 border-gray rounded-3xl">
          <div className="flex gap-x-6 ml-auto mr-auto opacity-60 px-8 pt-4">
            <span className="">All</span>
            <span>A</span>
            <span>A</span>
            <span>A</span>
            <span>A</span>
            <span>A</span>
            <span>A</span>
          </div>
          <div className="flex flex-col gap-y-4 px-8">
            <div className="flex flex-col">
              <span className="pb-2">All</span>
              <div className="grid grid-cols-2 gap-x-1 border-solid border-0 border-t border-gray py-2">
                <div className="flex bg-gray p-2 text-sm">
                  <Image src={tagImage} alt="image" />
                  <span className="mr-auto">Google</span>
                  <span>(28 coupons)</span>
                </div>
                <div className="flex bg-gray p-2 text-sm">
                  <Image src={tagImage} alt="image" />
                  <span className="mr-auto">Google</span>
                  <span>(28 coupons)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="pb-2">All</span>
              <div className="grid grid-cols-2 gap-x-1 border-solid border-0 border-t border-gray py-2">
                <div className="flex bg-gray p-2 text-sm">
                  <Image src={tagImage} alt="image" />
                  <span className="mr-auto">Google</span>
                  <span>(28 coupons)</span>
                </div>
                <div className="flex bg-gray p-2 text-sm">
                  <Image src={tagImage} alt="image" />
                  <span className="mr-auto">Google</span>
                  <span>(28 coupons)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="pb-2">All</span>
              <div className="grid grid-cols-2 gap-x-1 border-solid border-0 border-t border-gray py-2">
                <div className="flex bg-gray p-2 text-sm">
                  <Image src={tagImage} alt="image" />
                  <span className="mr-auto">Google</span>
                  <span>(28 coupons)</span>
                </div>
                <div className="flex bg-gray p-2 text-sm">
                  <Image src={tagImage} alt="image" />
                  <span className="mr-auto">Google</span>
                  <span>(28 coupons)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="flex-1 flex">*/}
        {/*  <div className="w-full flex flex-col flex-1 items-start gap-8">*/}
        {/*    {coupons.map((coupon, index) => {*/}
        {/*      return (*/}
        {/*        <Fragment key={index}>*/}
        {/*          <CouponCard*/}
        {/*            title={coupon.title}*/}
        {/*            description={coupon.description}*/}
        {/*            code={coupon.code}*/}
        {/*            expireDate={coupon.end_date}*/}
        {/*            couponImageUrl={coupon.brand_logo}*/}
        {/*            setIsOpen={() => setIsOpen(coupon.id)}*/}
        {/*          />*/}
        {/*          {coupon.id == modalIsOpen && (*/}
        {/*            <CouponModal*/}
        {/*              title={coupon.title}*/}
        {/*              description={coupon.description}*/}
        {/*              code={coupon.code}*/}
        {/*              valid={coupon.end_date}*/}
        {/*              modalIsOpen={modalIsOpen}*/}
        {/*              closeModal={closeModal}*/}
        {/*            />*/}
        {/*          )}*/}
        {/*        </Fragment>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="flex-col hidden md:flex max-w-[25rem] gap-y-10">
          <div className="border-1 border-gray rounded-3xl p-8">
            <h3 className="text-2xl pb-6 font-medium">Best Coupons</h3>
            {bestCoupons.map(({ id, title }) => (
              <div
                key={id}
                className="flex items-center gap-x-3 mb-2 border-1 border-gray rounded-3xl overflow-hidden py-2 px-4 hover:cursor-pointer">
                <Image
                  className="h-5 w-5"
                  src={tagImage}
                  width={16}
                  height={16}
                  alt="coupon card"
                />
                <span className="text-sm">{title}</span>
              </div>
            ))}
          </div>
          <div className="border-1 border-gray rounded-3xl p-8">
            <h3 className="text-2xl pb-6 font-medium">Best Stores</h3>
            <div className="grid grid-cols-2 gap-3 mb-1 border-1 border-gray rounded-3xl overflow-hidden py-2 px-4">
              {bestStores.map(({ id, brand_logo }) => (
                <Image key={id} src={tagImage} width={120} height={80} alt="coupon card" />
              ))}
            </div>
          </div>
          <div className="border-1 border-gray rounded-3xl p-8">
            <h3 className="text-2xl pb-8 font-mediumy">Email Newsletter</h3>
            <p className="font-light text-sm opacity-60">
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
