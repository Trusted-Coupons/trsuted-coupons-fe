'use client';

import { FC, ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Dialog, Disclosure, Popover } from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../public/images/logo.png';
import luckyGirlImg from '../../public/images/lucky-girl.png';

const products = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: ChartPieIcon
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: FingerPrintIcon
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: ArrowPathIcon
  }
];
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon }
];

const headers = (alpha: string) => [
  { label: 'Home', href: `/${alpha}` },
  { label: 'Categories', href: `/${alpha}/categories` },
  { label: 'Stores', href: `/${alpha}/stores` },
  { label: 'About', href: `/${alpha}/about` }
];

interface HeaderProps {
  alpha: string;
  kicker: string;
  title: ReactNode;
  subtitle: string;
}

const Header: FC<HeaderProps> = ({ alpha, title, subtitle, kicker }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative">
      <Image className="w-full" src={luckyGirlImg} alt="Lucky girl" />
      <div className="absolute w-full top-0">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:p-6 lg:px-8"
          aria-label="Global">
          <div className="flex lg:mr-10">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Trusted Coupons</span>
              <Image
                width={200}
                height={120}
                className="h-6 md:h-12 w-auto"
                src={logoImg}
                alt="Trusted Coupons"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12 lg:pl-20">
            {headers(alpha).map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`text-sm font-semibold leading-6 px-2.5 py-1 text-white ${pathname == href && 'bg-primary rounded-full'}`}>
                {label}
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
      </div>
      <div className="absolute w-full transform -translate-y-1/2 top-1/2">
        <div className="mx-auto flex flex-col gap-y-1 text-white max-w-7xl p-2 lg:p-6 lg:gap-y-3 lg:px-8">
          <h3 className="h3 uppercase invisible text-xs font-medium md:visible md:text-base">
            {kicker}
          </h3>
          <h1 className="h1 font-medium invisible text-lg md:w-[35rem] md:visible md:text-6xl">
            {title}
          </h1>
          <h2 className="h2 opacity-70 text-sm w-[15rem] md:w-[20rem] md:text-xl">{subtitle}</h2>
          <div className="flex gap-x-2 lg:gap-x-4 pt-2">
            <button className="bg-primary text-xs font-medium rounded-full px-2 py-1 lg:text-base lg:px-4 lg:py-2">
              Find your Coupon
            </button>
            <button className="bg-white text-xs text-black font-medium rounded-full px-2 py-1 lg:text-base lg:px-4 lg:py-2">
              Find favorite store
            </button>
          </div>
        </div>
      </div>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Trusted Coupons</span>
              <Image
                width={200}
                height={120}
                className="h-8 lg:h-12 w-auto"
                src={logoImg}
                alt="Trusted Coupons"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href={'/en-US/home'}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Home
                </Link>
                <Link
                  href={'/en-US/categories'}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Categories
                </Link>
                <Link
                  href={'/en-US/store'}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Store
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href={'/en-US/about'}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  About
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
        e
      </Dialog>
    </header>
  );
};

export default Header;
