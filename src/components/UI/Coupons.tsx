'use client';
import { useState, FC, PropsWithChildren, useEffect, Fragment } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Store, Coupon } from '@/types/api.types';
import Image from 'next/image';
import CouponModal from './CouponModal';

interface CouponsProps {
  bestCoupons: Coupon[];
  bestStores: Store[];
  withoutHeader?: boolean;
  dict: any;
}

const Coupons: FC<PropsWithChildren<CouponsProps>> = ({
  children,
  bestCoupons,
  bestStores,
  withoutHeader,
  dict
}) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [couponSession, setCouponSession] = useState<Coupon | null>(null);
  const couponOpen = typeof window !== 'undefined' ? localStorage.getItem('bestCouponOpen') : '';
  const coupon = typeof window !== 'undefined' ? localStorage.getItem('bestCoupon') || '' : '';

  const handleClick = (coupon: Coupon) => {
    setIsOpen(true);
    window.open(window.location.href, '_blank');
    localStorage.setItem('bestCoupon', JSON.stringify(coupon));
    localStorage.setItem('bestCouponOpen', JSON.stringify(true));
    router.push(coupon.url);
    window.open(coupon.url, '_blank', 'noreferrer');
  };

  function closeModal() {
    localStorage.removeItem('bestCouponOpen');
    localStorage.removeItem('bestCoupon');
    setIsOpen(false);
  }

  useEffect(() => {
    if (coupon && couponOpen) {
      if (coupon !== '') {
        setIsOpen(true);
        setCouponSession(JSON.parse(coupon));
      }
    }
  }, []);

  return (
    <div className={`flex flex-col ${withoutHeader && 'pt-0 lg:pt-12'}`}>
      {!withoutHeader && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-1 mb-6 text-black max-w-7xl py-4 lg:mb-0 lg:py-12 lg:gap-y-3">
            <h2 className="font-medium text-lg md:text-4xl">{dict.heading.popular_coupons}</h2>
            <h3 className="opacity-70 text-sm font-light md:text-lg">
              {dict.heading.find_best_coupons}
            </h3>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-x-6 gap-y-6">
        {children}
        <div className="w-full flex-col md:flex md:max-w-[20rem] lg:max-w-[25rem] lg:gap-y-6">
          {bestCoupons.length > 0 ? (
            <div className="border-1 mb-8 border-gray rounded-3xl p-6 lg:p-8 lg:mb-0">
              <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
                {dict.heading.best_coupons}
              </h3>
              {bestCoupons?.map((coupon: Coupon, index) => (
                <Fragment key={index}>
                  <div
                    key={coupon.id}
                    onClick={() => handleClick(coupon)}
                    className="flex items-center gap-x-3 mb-2 border-1 z-0 border-gray rounded-3xl overflow-hidden py-2 px-4 hover:cursor-pointer">
                    <Image
                      className="h-8 w-8"
                      src={`https://logo.clearbit.com/${coupon.store}?height=15`}
                      width={26}
                      height={26}
                      alt={'image'}
                    />
                    <span className="text-xs lg:text-sm">{coupon.title}</span>
                  </div>
                  {modalIsOpen && (
                    <CouponModal
                      coupon={couponSession}
                      modalIsOpen={modalIsOpen}
                      closeModal={closeModal}
                      dict={dict}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          ) : (
            ''
          )}
          {bestStores.length > 0 ? (
            <div className="border-1 border-gray rounded-3xl p-6 lg:p-8 mb-8 lg:mb-0">
              <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
                {dict.heading.best_stores}
              </h3>
              <div className="grid grid-cols-5 gap-3 mb-1 border-1 border-gray rounded-3xl overflow-hidden py-2 px-4 hover:cursor-pointer">
                {bestStores?.map(({ id, store, icon }) => (
                  <Image
                    key={id}
                    src={`https://logo.clearbit.com/${store}?height=15`}
                    height={15}
                    width={40}
                    alt="image"
                    onClick={() => router.push(`/${params.lang}/stores/${store}?id=${id}`)}
                  />
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="flex flex-col border-1 border-gray rounded-3xl p-6 lg:p-8">
            <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
              {dict.newsletter.heading}
            </h3>
            <p className="font-light text-xs lg:text-sm opacity-60 mb-6">
              {dict.newsletter.description}
            </p>
            <input
              className="bg-gray rounded-full p-2 px-6 text-sm outline-none mb-4 opacity-60"
              placeholder={`${dict.newsletter.placeholder_name}`}
            />
            <input
              className="bg-gray rounded-full py-2 px-6 text-sm outline-none mb-4 opacity-60"
              placeholder={`${dict.newsletter.placeholder_email}`}
            />
            <button className="bg-primary rounded-full py-2 text-white text-sm">
              {dict.newsletter.button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
