import { Fragment, FC, useState } from 'react';
import moment from 'moment';
import useClipboard from '@/hooks/useClipboard';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface CouponModalProps {
  id: number;
  title: string;
  store: string;
  description: string;
  clicked: number;
  label: string;
  code: string;
  valid: string;
  couponTable: string;
  modalIsOpen: number;
  closeModal: () => void;
}

const CouponModal: FC<CouponModalProps> = ({
  id,
  title,
  description,
  store,
  clicked,
  couponTable,
  code,
  label,
  valid,
  modalIsOpen,
  closeModal
}) => {
  const [couponClickedTimes, setCouponClickedTimes] = useState(clicked);
  const [copyValue, handleCopy] = useClipboard();

  const handleClicked = async () => {
    try {
      await handleCopy(code);
      await fetch(`${process.env.API_URL}/coupon/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coupons_table: couponTable, coupon_id: id })
      });
      setCouponClickedTimes(couponClickedTimes + 1);
    } catch (e) {
      setCouponClickedTimes(
        clicked != couponClickedTimes ? couponClickedTimes - 1 : couponClickedTimes
      );
    }
  };

  return (
    <Transition appear show={Boolean(modalIsOpen)} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-secondary/40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center justify-between gap-x-3 pb-8">
                  <Image
                    className="max-w-[5rem]"
                    src={`https://logo.clearbit.com/${store}?height=250`}
                    width={250}
                    height={250}
                    alt={store}
                  />
                  <span className="text-xs lg:text-sm uppercase font-semibold">{label}</span>
                </div>
                <Dialog.Title as="h3" className="text-base lg:text-lg font-medium leading-6">
                  {title}
                </Dialog.Title>
                <div className="mt-6">
                  <p className="text-sm lg:text-base font-light">{description}</p>
                  <span className="block text-xs lg:text-sm font-light opacity-60 mt-2">
                    Clicked: {couponClickedTimes}
                  </span>
                </div>
                <div className="mt-6 flex flex-col">
                  <span
                    className={`p-4 text-center text-sm lg:text-base border-dashed border-1 text-primary ${copyValue && 'bg-gray text-white'} hover:cursor-pointer`}
                    onClick={handleClicked}>
                    {code}
                  </span>
                  <span className="pt-3 text-xs lg:text-sm font-light text-center opacity-60">
                    Click to Copy
                  </span>
                </div>
                <div className="mt-8 flex justify-center">
                  <span className="text-xs lg:text-sm font-light opacity-60">
                    Valid until {moment(valid).format('DD MMM YYYY')}
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CouponModal;
