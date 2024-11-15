'use client';

import { FC } from 'react';
import type { Category } from '@/types/api.types';

import Image from 'next/image';
import Link from 'next/link';
import checkImg from '../../../public/images/check.png';
import { useParams } from 'next/navigation';

interface PopularCategoriesProps {
  categories: any[];
}

const PopularCategories: FC<PopularCategoriesProps> = ({ categories }) => {
  const params = useParams<{ lang: string }>();

  return (
    <div className="flex flex-col gap-4 border-1 border-gray rounded-3xl p-6 lg:p-8">
      <h3 className="text-lg pb-6 text-primary font-medium md:text-xl lg:text-2xl">
        Popular Categories
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 text-xs lg:text-sm gap-4">
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className="flex gap-1 items-center rounded-full hover:cursor-pointer hover:underline">
              <Image className="h-4 w-4" src={checkImg} width={12} height={12} alt={category} />
              <Link href={`/${params.lang}/categories/${category}`}>{category}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
