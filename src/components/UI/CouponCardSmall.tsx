'use client';
import { Coupon, Store } from '@/types/api.types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface StoresListProps {
  highestRatedCoupon: Coupon;
  id: number;
}

const CouponSmallCard: FC<StoresListProps> = ({ highestRatedCoupon, id }) => {
  // Check for percentage discount
  const discountPercentageMatch = highestRatedCoupon.title.match(/(\d+)%/);
  const discountPercentageText = discountPercentageMatch ? (
    <>
      {discountPercentageMatch[1]}%<br />
      Discount
    </>
  ) : null;

  // Check for dollar discount
  const discountDollarMatch = highestRatedCoupon.title.match(/\$(\d+)/);
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
    (highestRatedCoupon.title.toLowerCase().includes('sale') ||
    highestRatedCoupon.title.toLowerCase().includes('discount') ? (
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

  const handleClick = (storeId: any, couponId: any) => {
    const cleanUrl = new URL(
      `http://localhost:3000/en-US/stores/${storeId}?showModal=true&couponId=${couponId}`
    );
    cleanUrl.search = ''; // Clears all query parameters

    // Now, append the new query parameters
    cleanUrl.searchParams.append('showModal', 'true');
    cleanUrl.searchParams.append('couponId', couponId);

    const newTabUrl = cleanUrl.toString();
    window.open(newTabUrl, '_blank', 'noopener,noreferrer');
    window.location.href = highestRatedCoupon.affiliate_link;
  };

  return (
    <div
      key={id}
      className="text-center border border-black/10 rounded-3xl p-2 cursor-pointer flex flex-col justify-center items-center">
      <div className="hidden lg:block p-2">
        <div className="flex flex-col w-[140px] text-center justify-center items-center text-2xl font-bold text-primary-orange border-1 border-gray rounded-2xl p-4">
          {discountText}
        </div>
      </div>
      <p className="text-small font-semibold">{highestRatedCoupon.store}</p>
      {/* Display the highest-rated coupon details */}
      <div className="mt-2">
        <p className="font-semibold">{highestRatedCoupon.label}</p>
      </div>
      <button
        className="h-fit flex items-center font-medium bg-gray-300 rounded-full text-nowrap my-2"
        onClick={() => handleClick(id, highestRatedCoupon.id)}>
        <span className="bg-primary py-2 px-4 rounded-full text-sm text-white">SHOW CODE</span>
      </button>
    </div>
  );
};

export default CouponSmallCard;
