'use client';
import type { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Store } from '@/types/api.types';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useScreenSize from '@/helpers/screenSize';
import { useIsClient } from '@/helpers/isClientCtx';

interface PopularStoresProps {
  stores: Store[];
  dict: any;
}

const PopularStores: FC<PopularStoresProps> = ({ stores, dict }) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const isClient = useIsClient();
  const screenSize = useScreenSize();

  const getSlidesToShow = () => {
    if (isClient && screenSize.width && typeof screenSize.width === 'number') {
      if (screenSize.width > 1200) return 5;
      if (screenSize.width > 768) return 4;
      if (screenSize.width > 650) return 3;
      return 2;
    } else {
      return 3;
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear'
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-1 mb-6 text-black max-w-7xl py-4 lg:mb-0 lg:py-12 lg:gap-y-3">
        <h2 className="font-medium text-lg md:text-4xl">{dict.heading.popular_stores}</h2>
        <h3 className="opacity-70 text-sm font-light md:text-lg">
          {dict.heading.look_for_favorite_store}
        </h3>
      </div>
      <Slider {...settings}>
        {stores?.map(({ id, store }) => (
          <div key={id} className="flex justify-center items-center cursor-pointer">
            <div className="text-center">
              <div className="inline-block">
                <Image
                  className="xl:h-[100px] md:h-[70px] h-[50px] w-full"
                  height={20}
                  width={45}
                  onClick={() => router.push(`/${params.lang}/stores/${store}?id=${id}`)}
                  src={`https://logo.clearbit.com/${store}?size=800`}
                  alt="image"
                />
                <div>{store}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularStores;
