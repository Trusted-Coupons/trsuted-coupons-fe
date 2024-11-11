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
  couponId: any;
  setIsOpen: (open: boolean) => void;
};

const CouponCard = ({
  title,
  store,
  description,
  code,
  url,
  expireDate,
  setIsOpen,
  couponId
}: CouponCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Check for percentage discount
  const discountPercentageMatch = title.match(/(\d+)%/);
  const discountPercentageText = discountPercentageMatch ? (
    <>
      {discountPercentageMatch[1]}%<br />
      Discount
    </>
  ) : null;

  // Check for dollar discount
  const discountDollarMatch = title.match(/\$(\d+)/);
  const discountDollarText = discountDollarMatch ? (
    <>
      {discountDollarMatch[1]}$<br />
      Discount
    </>
  ) : null;

  // Check for words "sale" or "discount" if no percentage or dollar is found
  const generalSaleOrDiscountText =
    !discountPercentageText &&
    !discountDollarText &&
    (title.toLowerCase().includes('sale') || title.toLowerCase().includes('discount') ? (
      <>
        <span className="text-2xl">Discount</span>
      </>
    ) : (
      <>
        <span className="text-3xl">Sale</span>
      </>
    ));

  // Combine all discount-related text
  const discountText = discountPercentageText || discountDollarText || generalSaleOrDiscountText;

  const handleClick = () => {
    const cleanUrl = new URL(window.location.href);
    cleanUrl.search = ''; // Clears all query parameters

    // Now, append the new query parameters
    cleanUrl.searchParams.append('showModal', 'true');
    cleanUrl.searchParams.append('couponId', couponId);

    const newTabUrl = cleanUrl.toString();
    window.open(newTabUrl, '_blank', 'noopener,noreferrer');
    window.location.href = url;
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex max-w-[800px] w-full gap-5 border-1 border-gray rounded-3xl p-4 lg:p-6">
      <div className="hidden lg:block p-2">
        {discountText ? (
          <div className="flex flex-col w-[140px] text-center justify-center items-center text-2xl font-bold text-primary-orange border-1 border-gray rounded-2xl p-4">
            {discountText}
          </div>
        ) : (
          <div className="flex flex-col w-[140px] text-center justify-center items-center text-2xl font-bold text-primary-orange border-1 border-gray rounded-2xl p-4">
            <Image
              className="max-w-[5rem]"
              src={`https://logo.clearbit.com/${store}?height=200`}
              width={200}
              height={40}
              alt={store}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-5">
        <h3 className="text-base lg:text-xl font-medium">{title}</h3>
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
          className="h-fit px-4 text-primary-orange underline flex items-center font-medium bg-gray-300 rounded-full text-nowrap"
          onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && <p className="font-light text-sm lg:text-base">{description}</p>}
      </div>
    </div>
  );
};

export default CouponCard;
