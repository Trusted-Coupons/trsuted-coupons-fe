'use client';

import type { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Store } from '@/types/api.types';
import Slider from "react-slick";
import Image from 'next/image';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PopularStoresProps {
  stores: Store[];
}

const PopularStores: FC<PopularStoresProps> = ({ stores }) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
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
      <Slider {...settings}>
      {stores.map(({ id, icon, store }) => (
           <div className='hover:cursor-pointer flex justify-center' key={id}>
            
              <Image
                className="h-10"
                height={20}
                width={45}
                onClick={() => router.push(`/${params.lang}/stores/${id}`)}
                src={`https://logo.clearbit.com/${store}?height=40`}
                alt={store}
              />
           </div>
          
          ))}

        </Slider>
    </div>
  );
};

export default PopularStores;
