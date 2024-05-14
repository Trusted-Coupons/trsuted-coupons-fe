'use client';

import { Fragment, useState, FC } from 'react';
import { Coupon } from '@/types/api.types';

import CouponCard from './CouponCard';
import CouponModal from './CouponModal';
import Pagination from './Pagination';

interface CouponListProps {
  coupons: Coupon[];
  dict: any;
  id?: number | undefined;
}

const CouponList: FC<CouponListProps> = ({ coupons, dict, id }) => {
  const [modalIsOpen, setIsOpen] = useState(-1);

  function closeModal() {
    setIsOpen(-1);
  }

  const totalPages = Math.ceil(Number(coupons[0]?.total_coupons_count) / 10);

  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full flex flex-col flex-1 items-start gap-6">
        {coupons?.map((coupon, index) => {
          return (
            <Fragment key={index}>
              <CouponCard
                title={coupon.title}
                url={coupon.affiliate_link}
                description={coupon.description}
                code={coupon.code}
                expireDate={coupon.end_date}
                couponImageUrl={coupon.brand_logo}
                setIsOpen={() => setIsOpen(coupon.id)}
                dict={dict}
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
                  dict={dict}
                />
              )}
            </Fragment>
          );
        })}
      </div>
      {coupons.length > 0 ? (
        <Pagination totalPages={totalPages} id={id !== undefined ? id : 0} />
      ) : null}
    </div>
  );
};

export default CouponList;
