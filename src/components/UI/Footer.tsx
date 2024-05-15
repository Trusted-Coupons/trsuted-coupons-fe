'use client';

import React, { FC } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/16/solid';
import { routes } from '@/utils/routes';
import Link from 'next/link';
import Image from 'next/image';
import placeholder from '../../../public/images/coupon_placeholder_01.jpg';

interface FooterProps {
  alpha: string;
  dict: any;
}

const callsToAction = [
  {
    name: 'Watch demo dsads adsa asdas dasd asdasdasdasd asdasdasd as dsadadad ad ad asd a',
    href: '#',
    icon: PlayCircleIcon
  },
  { name: 'Contact sales', href: '#', icon: PhoneIcon }
];

const faqs = [
  {
    question: 'How to use coupon codes?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiolore consectetur adipisicing elit, sed do eiusmod tempor ut labore'
  },
  {
    question: 'Can I submit my coupons?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiolore consectetur adipisicing elit, sed do eiusmod tempor ut labore'
  },
  {
    question: 'Coupon submissions fee?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiolore consectetur adipisicing elit, sed do eiusmod tempor ut labore'
  }
];

const Footer: FC<FooterProps> = ({ alpha, dict }) => {
  return (
    <footer className="mt-20 flex flex-col gap-y-20 bg-secondary text-white pt-10 lg:pt-24">
      <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-32 max-w-[1280px] p-4 mr-auto ml-auto">
        <div className="flex flex-1 flex-col">
          <h5 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
            {dict.newsletter.heading}
          </h5>
          <p className="max-w-80 opacity-60 text-sm lg:text-base pb-6">
            {dict.newsletter.description}
          </p>
          <input
            className="bg-black p-2 px-6 text-sm outline-none mb-4 opacity-30"
            placeholder={`${dict.newsletter.placeholder_name}`}
          />
          <input
            className="bg-black py-2 px-6 text-sm outline-none mb-4 opacity-30"
            placeholder={`${dict.newsletter.placeholder_email}`}
          />
          <button className="bg-primary w-fit py-2 text-white text-sm px-8">
            {dict.newsletter.button}
          </button>
        </div>
        <div className="flex-1">
          <ul className="flex flex-col gap-y-4 opacity-60">
            <li className="border-b-1 pb-2 text-sm lg:text-base">
              <Link href={`/${alpha}`}>{dict.navigation.home}</Link>
            </li>
            <li className="border-b-1 pb-2 text-sm lg:text-base">
              <Link href={`/${alpha}/${dict.navigation.categories}`}>
                {dict.navigation.categories}
              </Link>
            </li>
            <li className="border-b-1 pb-2 text-sm lg:text-base">
              <Link href={`/${alpha}/${dict.navigation.stores}`}>{dict.navigation.stores}</Link>
            </li>
            <li className="border-b-1 pb-2 text-sm lg:text-base">
              <Link href={`/${alpha}/${dict.navigation.about}`}>{dict.navigation.about}</Link>
            </li>
          </ul>
        </div>
        <div className="max-w-96">
          <h5 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">{dict.faq.heading}</h5>
          <div className="flex flex-col gap-y-3">
            <Disclosure as="div" className="-mx-3 opacity-60">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-96 items-center justify-between py-2 pl-3 pr-3.5 text-sm lg:text-base leading-7 text-white bg-tertiary">
                    <span>{dict.faq.question_1}</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="max-w-96 text-sm py-2 pl-3 pr-3.5 space-y-2">
                    {dict.faq.answer_1}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="-mx-3 opacity-60">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-96 items-center justify-between py-2 pl-3 pr-3.5 text-sm lg:text-base leading-7 text-white bg-tertiary">
                    <span>{dict.faq.question_2}</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="max-w-96 text-sm py-2 pl-3 pr-3.5 space-y-2">
                    {dict.faq.answer_2}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="-mx-3 opacity-60">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-96 items-center justify-between py-2 pl-3 pr-3.5 text-sm lg:text-base leading-7 text-white bg-tertiary">
                    <span>{dict.faq.question_3}</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="max-w-96 text-sm py-2 pl-3 pr-3.5 space-y-2">
                    {dict.faq.answer_3}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
      <div className="bg-tertiary">
        <div className="flex flex-col gap-y-4 p-8 max-w-[1280px] mr-auto ml-auto">
          <span className="text-sm opacity-60">Trusted Coupons &copy; 2024 - Scale IT APP</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
