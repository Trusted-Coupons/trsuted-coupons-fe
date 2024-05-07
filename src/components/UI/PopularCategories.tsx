import { FC } from 'react';
import type { Coupon } from '@/types/api.types';

import Image from 'next/image';
import checkImg from '../../../public/images/check.png';

interface PopularCategoriesProps {
  categories: Coupon[];
}

const PopularCategories: FC<PopularCategoriesProps> = ({ categories }) => {
  return (
    <div className="flex flex-col gap-4 border-1 border-gray rounded-3xl p-12">
      <h3 className="text-2xl pb-8 text-primary font-medium">Popular Categories</h3>
      <div className="grid grid-cols-4 text-sm gap-4">
        {categories.map(({ id, title, brand_logo }) => {
          return (
            <div
              key={id}
              className="flex items-center gap-2 border-1 border-gray py-1 px-4 rounded-full">
              <Image className="h-4 w-4" src={checkImg} width={16} height={16} alt="coupon card" />
              <span>{title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
