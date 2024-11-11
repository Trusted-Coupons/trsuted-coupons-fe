'use client';

import { Fragment, useState, FC, useEffect } from 'react';
import type { Coupon } from '@/types/api.types';

import CouponCard from './CouponCard';
import CouponModal from './CouponModal';
import { useSearchParams } from 'next/navigation';
import { LinkIcon } from '@heroicons/react/16/solid';

interface CouponListProps {
  coupons: Coupon[];
  store: string;
  description: string;
}

const CouponList: FC<CouponListProps> = ({ coupons, store, description }) => {
  // State to track which coupon's modal is open (-1 means no modal is open)
  const [modalIsOpen, setIsOpen] = useState<number | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionLimit = 250;

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // Using Next.js hook to get query parameters
  const searchParams = useSearchParams();

  // Function to close the modal
  function closeModal() {
    setIsOpen(null);
  }

  // useEffect to check query params when component mounts in the new tab
  useEffect(() => {
    const showModal = searchParams.get('showModal');
    const couponId = searchParams.get('couponId');

    if (showModal === 'true' && couponId) {
      // Convert couponId to number and open the modal for that coupon
      setIsOpen(Number(couponId));
    }
  }, [searchParams]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full flex flex-col flex-1 items-start justify-end gap-2">
        <div className="flex justify-start mb-8">
          <div className="border border-gray rounded-[24px] p-5">
            <img
              src={`https://logo.clearbit.com/${store}?height=200`}
              alt={`${store} logo`}
              className="min-h-[130px] min-w-[130px] rounded-[24px]"
            />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center max-w-[800px] w-full lg:p-4 rounded-2xl p-4">
            <h1 className="font-bold text-[30px]">Benetton Coupons</h1>
            <a
              href={`https://www.${store}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-orange underline flex gap-1 justify-center items-center">
              www.{store}
              <LinkIcon height={20} width={20} />
            </a>
          </div>
        </div>
        {/* <div className="flex flex-col gap-4 items-center justify-center max-w-[800px] w-full lg:p-4 border-1 border-gray rounded-2xl p-4">
          <div className="flex flex-col items-center justify-center">
            <img
              src={`https://logo.clearbit.com/${store}?height=200`}
              alt={`${store} logo`}
              className="h-24 w-24 mb-4"
            />

            <h2 className="text-xl font-semibold mb-2 text-center">{store}</h2>
          </div>
          <div className="flex flex-col items-start justify-end border-1 border-gray rounded-2xl p-4">
            <p className="text-gray-600 text-sm">
              {isExpanded
                ? description
                : description.slice(0, descriptionLimit) +
                  (description.length > descriptionLimit ? '...' : '')}
            </p>

            {description.length > descriptionLimit && (
              <button
                onClick={toggleReadMore}
                className="text-primary font-semibold text-sm mt-2 hover:underline">
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div> */}
        {coupons.map((coupon) => (
          <Fragment key={coupon.id}>
            <CouponCard
              title={coupon.title}
              store={coupon.store}
              url={coupon.affiliate_link}
              description={coupon.description}
              code={coupon.code}
              expireDate={coupon.end_date}
              couponImageUrl={coupon.brand_logo}
              couponId={coupon.id}
              // Open the modal for this coupon
              setIsOpen={() => setIsOpen(coupon.id)}
            />
            {/* Conditionally render the modal */}
            {coupon.id === modalIsOpen && (
              <CouponModal
                id={coupon.id}
                couponTable={coupon.table_name}
                store={coupon.store}
                title={coupon.title}
                clicked={coupon.rating}
                label={coupon.label}
                description={coupon.description}
                code={coupon.code}
                valid={coupon.end_date}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CouponList;
