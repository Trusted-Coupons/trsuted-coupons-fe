import React, { useState, Fragment, FC } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface CouponModalProps {
  title: string;
  description: string;
  code: string;
  valid: string;
  modalIsOpen: number;
  closeModal: () => void;
}

const CouponModal: FC<CouponModalProps> = ({
  title,
  description,
  code,
  valid,
  modalIsOpen,
  closeModal
}) => {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{code}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{valid}</p>
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
