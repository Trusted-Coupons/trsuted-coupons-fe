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

const Footer: FC<FooterProps> = ({ alpha }) => {
  return (
    <footer className="mt-20 flex flex-col gap-y-20 bg-secondary text-white pt-10 lg:pt-24">
      <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-32 max-w-[1280px] p-4 mr-auto ml-auto">
        <div className="flex flex-1 flex-col">
          <h5 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">Email Newsletter</h5>
          <p className="max-w-80 opacity-60 text-sm lg:text-base pb-6">
            Your email is safe with us and we hate spam as much as you do. Lorem ipsum dolor sit
            amet et dolore.
          </p>
          <input
            className="bg-black p-2 px-6 text-sm outline-none mb-4 opacity-30"
            placeholder="Enter your name..."
          />
          <input
            className="bg-black py-2 px-6 text-sm outline-none mb-4 opacity-30"
            placeholder="Enter your email..."
          />
          <button className="bg-primary w-fit py-2 text-white text-sm px-8">Subscribe</button>
        </div>
        <div className="flex-1">
          <h5 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">Company Info</h5>
          <ul className="flex flex-col gap-y-4 opacity-60">
            {routes(alpha).map(({ label, href }) => (
              <li key={label} className="border-b-1 pb-2 text-sm lg:text-base">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-96">
          <h5 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
            Frequently Asked Questions?
          </h5>
          <div className="flex flex-col gap-y-3">
            {faqs.map(({ question, answer }) => (
              <Disclosure key={question} as="div" className="-mx-3 opacity-60">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-96 items-center justify-between py-2 pl-3 pr-3.5 text-sm lg:text-base leading-7 text-white bg-tertiary">
                      <span>{question}</span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="max-w-96 text-sm py-2 pl-3 pr-3.5 space-y-2">
                      {answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-tertiary">
        <div className="flex flex-col gap-y-4 p-8 max-w-[1280px] mr-auto ml-auto">
          <div className="flex justify-between">
            <div className="inline-flex opacity-60 text-sm gap-x-6">
              {routes(alpha).map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex gap-x-2">
              <Image
                className="h-7 w-7 rounded-md"
                src={placeholder}
                width={30}
                height={30}
                alt="coupon card"
              />
              <Image
                className="h-7 w-7 rounded-md"
                src={placeholder}
                width={30}
                height={30}
                alt="coupon card"
              />
              <Image
                className="h-7 w-7 rounded-md"
                src={placeholder}
                width={30}
                height={30}
                alt="coupon card"
              />
            </div>
          </div>
          <span className="text-sm opacity-60">YourCoupon &copy; 2024 - ScaleApp</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
