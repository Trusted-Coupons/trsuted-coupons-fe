import type { FC, ReactNode } from 'react';
import Link from 'next/link';

interface JumbotronProps {
  kicker: string;
  title: ReactNode;
  subtitle: string;
}

const Jumbotron: FC<JumbotronProps> = ({ kicker, title, subtitle }) => {
  return (
    <div className="absolute w-full transform -translate-y-1/2 top-1/2">
      <div className="mx-auto flex flex-col gap-y-1 text-white max-w-7xl p-2 lg:p-6 lg:gap-y-3 lg:px-8">
        <h3 className="h3 uppercase invisible text-xs font-medium md:visible md:text-base">
          {kicker}
        </h3>
        <h1 className="h1 font-medium invisible text-lg md:w-[45rem] md:visible md:text-6xl">
          {title}
        </h1>
        <h2 className="h2 opacity-70 text-sm w-[15rem] md:w-[35rem] md:text-xl">{subtitle}</h2>
        <div className="flex gap-x-2 lg:gap-x-4 pt-2">
          <Link
            className="bg-primary text-xs font-medium rounded-full px-2 py-1 lg:text-base lg:px-4 lg:py-2"
            href="/">
            Find your Coupon
          </Link>
          <Link
            className="bg-white text-xs text-black font-medium rounded-full px-2 py-1 lg:text-base lg:px-4 lg:py-2"
            href="/stores">
            Find favorite store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;