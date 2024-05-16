'use client';
import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Coupon } from '@/types/api.types';

type CouponCardProps = {
  coupon: Coupon;
  setIsOpen: (open: boolean) => void;
  dict: any;
};

const CouponCard = ({ coupon, setIsOpen, dict }: CouponCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(true);
    window.open(window.location.href, '_blank');
    localStorage.setItem('coupon', JSON.stringify(coupon));
    localStorage.setItem('couponOpen', JSON.stringify(true));
    router.push(coupon.url);
    window.open(coupon.url, '_blank', 'noreferrer');
  };

  return (
    <div className="flex w-full gap-5 border-1 border-gray rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col justify-center items-center basis-1/5 p-5">
        <Image
          className="h-16 w-16"
          src={`https://logo.clearbit.com/${coupon.store}?height=15`}
          width={46}
          height={46}
          alt={'image'}
        />
        <label className="text-primary text-center">{coupon.label}</label>
      </div>
      <div className=" basis-4/5 flex flex-col gap-y-5">
        <h3 className="text-[20px] font-medium">{coupon.title}</h3>
        <p className="font-light text-[16px]">{coupon.description}</p>
        <div className="flex flex-col gap-y-4 lg:flex-row gap-x-3 items-center">
          <button
            className="h-fit pr-4 flex items-center font-medium bg-gray-300 rounded-full text-nowrap"
            onClick={handleClick}>
            <span className="bg-primary py-2 px-4 rounded-full text-sm lg:text-base text-white">
              {dict.button.show_code}
            </span>
            {coupon.code.slice(coupon.code.length - 3)}
          </button>
          <span className="text-gray-300 text-sm lg:text-base">
            {dict.label.expire}: {moment(coupon.end_date).format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
