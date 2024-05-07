'use client';

import { Fragment, useState, FC } from 'react';
import { Coupon } from '@/types/api.types';

import { Tab } from '@headlessui/react';
import CouponCard from './CouponCard';
import CouponModal from './CouponModal';

interface CouponListProps {
  coupons: Coupon[];
}

const CouponList: FC<CouponListProps> = ({ coupons }) => {
  const [modalIsOpen, setIsOpen] = useState(-1);

  function closeModal() {
    setIsOpen(-1);
  }

  return (
    <div className="flex-1 flex flex-col">
      <Tab.Group>
        <Tab.List className="flex mb-12 space-x-1 mr-auto ml-auto">
          <Tab
            className={({ selected }) =>
              `w-fit rounded-full py-3 px-12 font-medium leading-5 outline-none ${
                selected ? 'bg-primary text-white' : 'text-black hover:opacity-60'
              }`
            }>
            Active Coupons
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-fit rounded-full py-3 px-12 font-medium leading-5 outline-none ${
                selected ? 'bg-primary text-white' : 'text-black hover:opacity-60'
              }`
            }>
            Unreliable Coupons
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-fit rounded-full py-3 px-12 font-medium leading-5 outline-none ${
                selected ? 'bg-primary text-white' : 'text-black hover:opacity-60'
              }`
            }>
            Printable Coupons
          </Tab>
        </Tab.List>
      </Tab.Group>
      <div className="w-full flex flex-col flex-1 items-start gap-8">
        {coupons.map((coupon, index) => {
          return (
            <Fragment key={index}>
              <CouponCard
                title={coupon.title}
                description={coupon.description}
                code={coupon.code}
                expireDate={coupon.end_date}
                couponImageUrl={coupon.brand_logo}
                setIsOpen={() => setIsOpen(coupon.id)}
              />
              {coupon.id == modalIsOpen && (
                <CouponModal
                  title={coupon.title}
                  logo={coupon.brand_logo}
                  label={coupon.label}
                  description={coupon.description}
                  code={coupon.code}
                  valid={coupon.end_date}
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CouponList;
