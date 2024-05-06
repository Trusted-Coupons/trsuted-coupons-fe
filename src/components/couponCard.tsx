import React from 'react';
import moment from 'moment';

import Image from 'next/image';

type CouponCardProps = {
  couponImageUrl: string;
  title: string;
  description: string;
  code: string;
  expireDate: string;
  setIsOpen: (open: boolean) => void;
};

const CouponCard = ({
  title,
  couponImageUrl,
  description,
  code,
  expireDate,
  setIsOpen
}: CouponCardProps) => {
  return (
    <div className="flex p-12 w-full gap-5 border-1 border-gray rounded-3xl">
      <div className="p-5">
        <Image src={couponImageUrl} width={200} height={40} alt="coupon card" />
      </div>
      <div className="flex flex-col gap-y-5">
        <h3 className="h3 text-2xl font-medium">{title}</h3>
        <p className="font-light">{description}</p>
        <div className="flex gap-x-3 items-center">
          <button
            className="h-fit pr-4 flex items-center font-medium bg-gray-300 rounded-full text-nowrap"
            onClick={() => setIsOpen(true)}>
            <span className="bg-primary py-2 px-4 rounded-full text-white">SHOW CODE</span>
            {code.slice(code.length - 3)}
          </button>
          <span className="text-gray-300">Expire: {moment(expireDate).format('DD/MM/YYYY')}</span>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
