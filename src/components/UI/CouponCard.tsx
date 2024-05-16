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
      <div className="hidden lg:block p-5">
        <Image src={coupon.brand_logo} width={200} height={40} alt="coupon card" />
      </div>
      <div className="flex flex-col gap-y-5">
        <h3 className="text-base lg:text-2xl font-medium">{coupon.title}</h3>
        <p className="font-light text-sm lg:text-base">{coupon.description}</p>
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
