import { Fragment, FC } from 'react';
import useClipboard from '@/hooks/useClipboard';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import moment from 'moment';

interface CouponModalProps {
  title: string;
  logo: string;
  description: string;
  label: string;
  code: string;
  valid: string;
  modalIsOpen: number;
  closeModal: () => void;
}

const CouponModal: FC<CouponModalProps> = ({
  title,
  description,
  code,
  logo,
  label,
  valid,
  modalIsOpen,
  closeModal
}) => {
  const [copyValue, handleCopy] = useClipboard();

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
                <div className="flex items-center justify-between gap-x-3 px-3 pb-8">
                  <Image className="w-20" width={100} height={50} src={logo} alt={title} />
                  <span className="text-xs lg:text-sm uppercase font-semibold">{label}</span>
                </div>
                <Dialog.Title as="h3" className="text-base lg:text-lg font-medium leading-6">
                  {title}
                </Dialog.Title>
                <div className="mt-6">
                  <p className="text-sm lg:text-base font-light">{description}</p>
                </div>
                <div className="mt-6 flex flex-col">
                  <span
                    className={`p-4 text-center text-sm lg:text-base border-dashed border-1 text-primary ${copyValue && 'bg-gray text-white'} hover:cursor-pointer`}
                    onClick={() => handleCopy(code)}>
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
