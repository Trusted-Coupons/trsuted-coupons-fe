'use client';

import type { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Store } from '@/types/api.types';

import Image from 'next/image';

interface PopularStoresProps {
  stores: Store[];
}

const PopularStores: FC<PopularStoresProps> = ({ stores }) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-1 mb-6 text-black max-w-7xl py-4 lg:mb-0 lg:py-12 lg:gap-y-3">
        <h4 className="uppercase text-xs font-medium md:text-base">Saving your money since 2024</h4>
        <h2 className="font-medium text-lg md:text-4xl">
          Popular <span className="text-primary">stores</span>
        </h2>
        <h3 className="opacity-70 text-sm font-light md:text-lg">
          Look for your favorite store and save yourself some money
        </h3>
      </div>
      <div
        x-data="{}"
        x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
    })"
        className="w-full inline-flex flex-nowrap justify-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul
          x-ref="logos"
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          {stores.map(({ id, icon, store }) => (
            <li
              key={id}
              className="border-1 border-gray py-4 px-12 rounded-md hover:cursor-pointer"
              onClick={() => router.push(`/${params.lang}/stores/${id}`)}>
              <Image
                className="h-10"
                height={20}
                width={45}
                src={`https://logo.clearbit.com/${store}?height=40`}
                alt={store}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularStores;
