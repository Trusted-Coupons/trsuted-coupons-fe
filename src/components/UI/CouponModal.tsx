import { FC } from 'react';
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
        </div>
        <div className="mt-6 flex flex-col">
          <span
            className={`p-4 text-center text-sm lg:text-base border-dashed border-1 text-primary ${copyValue && 'bg-gray text-white'} hover:cursor-pointer`}
            onClick={() => handleCopy(coupon?.code ? coupon?.code : '')}>
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

{
  /* {coupon ? (
        <Transition appear show={modalIsOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 " />
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-md transition-all">
                    <div className="flex items-center justify-between gap-x-3 px-3 pb-8">
                      <Image
                        className="w-20"
                        width={100}
                        height={50}
                        src={coupon.brand_logo}
                        alt={'image'}
                      />
                      <span className="text-xs lg:text-sm uppercase font-semibold">
                        {coupon.label}
                      </span>
                    </div>
                    <Dialog.Title as="h3" className="text-base lg:text-lg font-medium leading-6">
                      {coupon.title}
                    </Dialog.Title>
                    <div className="mt-6">
                      <p className="text-sm lg:text-base font-light">{coupon.description}</p>
                    </div>
                    <div className="mt-6 flex flex-col">
                      <span
                        className={`p-4 text-center text-sm lg:text-base border-dashed border-1 text-primary ${copyValue && 'bg-gray text-white'} hover:cursor-pointer`}
                        onClick={() => handleCopy(coupon.code)}>
                        {coupon.code}
                      </span>
                      <span className="pt-3 text-xs lg:text-sm font-light text-center opacity-60">
                        {dict.modal.click_to_copy}
                      </span>
                    </div>
                    <div className="mt-8 flex justify-center">
                      <span className="text-xs lg:text-sm font-light opacity-60">
                        {dict.modal.valid_until} {moment(coupon.end_date).format('DD MMM YYYY')}
                      </span>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : null} */
}
