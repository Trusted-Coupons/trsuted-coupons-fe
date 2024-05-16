'use client';
import { Fragment, useState, FC, useEffect } from 'react';
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [couponSession, setCouponSession] = useState<Coupon | null>(null);
  const couponOpen = typeof window !== 'undefined' ? localStorage.getItem('couponOpen') : '';
  const coupon = typeof window !== 'undefined' ? localStorage.getItem('coupon') || '' : '';

  function closeModal() {
    localStorage.removeItem('couponOpen');
    localStorage.removeItem('coupon');

    setIsOpen(false);
  }
  console.log(coupons[0].id);
  console.log(modalIsOpen);

  const totalPages = Math.ceil(Number(coupons[0]?.total_coupons_count) / 10);

  useEffect(() => {
    if (coupon && couponOpen) {
      if (coupon !== '') {
        setIsOpen(true);
        setCouponSession(JSON.parse(coupon));
      }
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full flex flex-col flex-1 items-start gap-6">
        {coupons?.map((coupon: Coupon, index) => {
          return (
            <Fragment key={index}>
              <CouponCard coupon={coupon} setIsOpen={() => setIsOpen(true)} dict={dict} />
              {modalIsOpen && (
                <CouponModal
                  coupon={couponSession}
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
