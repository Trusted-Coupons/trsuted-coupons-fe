import React from 'react';
import moment from 'moment';

import Image from 'next/image';

type CouponCardProps = {
  couponImageUrl: string;
  title: string;
  description: string;
  url: string;
  code: string;
  expireDate: string;
  setIsOpen: (open: boolean) => void;
  dict: any;
};

const CouponCard = ({
  title,
  couponImageUrl,
  description,
  code,
  url,
  expireDate,
  setIsOpen,
  dict
}: CouponCardProps) => {
  const handleClick = () => {
    setIsOpen(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex w-full gap-5 border-1 border-gray rounded-3xl p-6 lg:p-8">
      <div className="hidden lg:block p-5">
        <Image src={couponImageUrl} width={200} height={40} alt="coupon card" />
      </div>
      <div className="flex flex-col gap-y-5">
        <h3 className="text-base lg:text-2xl font-medium">{title}</h3>
        <p className="font-light text-sm lg:text-base">{description}</p>
        <div className="flex flex-col gap-y-4 lg:flex-row gap-x-3 items-center">
          <button
            className="h-fit pr-4 flex items-center font-medium bg-gray-300 rounded-full text-nowrap"
            onClick={handleClick}>
            <span className="bg-primary py-2 px-4 rounded-full text-sm lg:text-base text-white">
              {dict.button.show_code}
            </span>
            {code.slice(code.length - 3)}
          </button>
          <span className="text-gray-300 text-sm lg:text-base">
            {dict.label.expire}: {moment(expireDate).format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
