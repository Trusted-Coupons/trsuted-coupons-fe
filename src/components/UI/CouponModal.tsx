import { FC, useState } from 'react';
import useClipboard from '@/hooks/useClipboard';
import Image from 'next/image';
import moment from 'moment';
import { Coupon } from '@/types/api.types';
import ReactModal from 'react-modal';

interface CouponModalProps {
  coupon: Coupon | null;
  modalIsOpen: boolean;
  closeModal: () => void;
  dict: any;
}

const CouponModal: FC<CouponModalProps> = ({ coupon, modalIsOpen, closeModal, dict }) => {
  const [copyValue, handleCopy] = useClipboard();

  function closeModall() {
    closeModal();
  }
  const [couponClickedTimes, setCouponClickedTimes] = useState(coupon?.rating || 0);

  const [couponClicked, setCouponClicked] = useState(false);

  const handleClicked = async (couponCode: string) => {
    await handleCopy(couponCode ? couponCode : '');
    if (!couponClicked) {
      try {
        await fetch(`${process.env.API_URL}/coupon/rate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ coupons_table: coupon?.table_name, coupon_id: coupon?.id })
        });
        setCouponClickedTimes(couponClickedTimes + 1);
        setCouponClicked(true);
      } catch (e) {
        if (coupon) {
          setCouponClickedTimes(
            coupon?.rating != couponClickedTimes ? couponClickedTimes - 1 : couponClickedTimes
          );
        }
      }
    }
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      contentLabel="Minimal Modal Example"
      onRequestClose={closeModall}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(119, 119, 119, 0.05)'
        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '448px',
          overflow: 'hidden',
          borderRadius: '16px',
          backgroundColor: 'white',
          padding: '40px',
          textAlign: 'left',
          verticalAlign: 'middle',
          display: 'flex',
          height: 'fit-content'
        }
      }}>
      <div>
        <div className="flex items-center justify-between gap-x-3 px-3 pb-8">
          <Image
            className="w-20"
            width={100}
            height={50}
            src={`https://logo.clearbit.com/${coupon?.store}?height=15`}
            alt={'image'}
          />
          <span className="text-primary text-xs lg:text-sm uppercase font-semibold">
            {coupon?.label}
          </span>
        </div>
        <h3 className="text-base lg:text-lg font-medium leading-6">{coupon?.title}</h3>
        <div className="mt-6">
          <p className="text-sm lg:text-base font-light">{coupon?.description}</p>
          <span className="block text-xs lg:text-sm font-light opacity-60 mt-2">
            Clicked: {couponClickedTimes}
          </span>
        </div>
        <div className="mt-6 flex flex-col">
          <span
            className={`p-4 text-center text-sm lg:text-base border-dashed border-1 text-primary ${copyValue && 'bg-gray text-white'} hover:cursor-pointer`}
            onClick={() => handleClicked(coupon?.code ? coupon?.code : '')}>
            {coupon?.code}
          </span>
          <span className="pt-3 text-xs lg:text-sm font-light text-center opacity-60">
            {dict.modal.click_to_copy}
          </span>
        </div>
        <div className="mt-8 flex justify-center">
          <span className="text-xs lg:text-sm font-light opacity-60">
            {dict.modal.valid_until} {moment(coupon?.end_date).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
    </ReactModal>
  );
};

export default CouponModal;
