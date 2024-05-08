'use client';

import { useState, FC, PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/utils/routes';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import logo1Img from '../../../public/images/logo-1.png';
import logo2Img from '../../../public/images/logo-2.png';

interface HeaderProps {
  alpha: string;
  jumbotronSrc?: StaticImageData;
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({ children, alpha, jumbotronSrc }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`relative ${!jumbotronSrc && 'mb-16 lg:mb-24'}`}>
      {jumbotronSrc && <Image className="w-full" src={jumbotronSrc} alt="Jumbotron" />}
      {children}
      <div className={`absolute w-full top-0 ${!jumbotronSrc && 'border-b-1 border-gray'}`}>
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
          aria-label="Global">
          <div className="flex lg:mr-10">
            <Link href="/public" className="-m-1.5 p-1.5">
              <span className="sr-only">Trusted Coupons</span>
              <Image
                width={100}
                height={40}
                className="h-6 md:h-10 w-auto"
                src={jumbotronSrc ? logo1Img : logo2Img}
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
              <Bars3Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12 lg:pl-20">
            {routes(alpha).map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`text-sm font-semibold leading-6 px-2.5 py-1 ${jumbotronSrc ? 'text-white' : 'text-black'} ${pathname == href && 'bg-primary rounded-full'}`}>
                {label}
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
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
                src={logo2Img}
                alt="Trusted Coupons"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {routes(alpha).map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="-mx-3 block rounded-lg px-3 text-sm font-semibold leading-5 hover:bg-gray-50">
                    {label}
                  </Link>
                ))}
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
