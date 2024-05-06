import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';
import placeholderImg from '../../../public/images/placeholder_store_01.jpeg';
import { Coupon } from '@/app/[lang]/page';

type StoreProps = {
  storeImg: StaticImageData;
  storeName: string;
};

const stores: StoreProps[] = [
  {
    storeImg: placeholderImg,
    storeName: 'Addidas.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Nike.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Google.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Amazon.com'
  },
  {
    storeImg: placeholderImg,
    storeName: 'Zara.com'
  },
  { storeImg: placeholderImg, storeName: 'Telekom.com' }
];

interface PopularStoresProps {
  stores: Coupon[];
}

const PopularStores: FC<PopularStoresProps> = ({ stores }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-8 gap-y-1 text-black max-w-7xl py-12 lg:gap-y-3">
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
          {stores.map(({ brand_logo, title }) => (
            <li className="border-1 border-gray p-4 rounded-md">
              <Image className="h-10" height={30} width={120} src={brand_logo} alt={title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularStores;
