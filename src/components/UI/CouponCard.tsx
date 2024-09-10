import React, { useState } from 'react';
import moment from 'moment';
import Image from 'next/image';

type CouponCardProps = {
  couponImageUrl: string;
  title: string;
  store: string;
  description: string;
  url: string;
  code: string;
  expireDate: string;
  setIsOpen: (open: boolean) => void;
};

const CouponCard = ({
  title,
  store,
  description,
  code,
  url,
  expireDate,
  setIsOpen
}: CouponCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex max-w-[800px] w-full gap-5 border-1 border-gray rounded-3xl p-6 lg:p-8">
      <div className="hidden lg:block p-5">
        <Image
          className="max-w-[5rem]"
          src={`https://logo.clearbit.com/${store}?height=200`}
          width={200}
          height={40}
          alt={store}
        />
      </div>
      <div className="flex flex-col gap-y-5">
        <h3 className="text-base lg:text-2xl font-medium">{title}</h3>
        <div className="flex flex-col gap-y-4 lg:flex-row gap-x-3 items-center">
          <button
            className="h-fit pr-4 flex items-center font-medium bg-gray-300 rounded-full text-nowrap"
            onClick={handleClick}>
            <span className="bg-primary py-2 px-4 rounded-full text-sm lg:text-base text-white">
              SHOW CODE
            </span>
            {code.slice(code.length - 3)}
          </button>
          <span className="text-gray-300 text-sm lg:text-base">
            Expire: {moment(expireDate).format('DD/MM/YYYY')}
          </span>
        </div>
        <button
          className="text-primary font-medium text-sm lg:text-base mt-4"
          onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && <p className="font-light text-sm lg:text-base">{description}</p>}
      </div>
    </div>
  );
};

export default CouponCard;
