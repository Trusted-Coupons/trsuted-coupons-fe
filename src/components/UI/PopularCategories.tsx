'use client';

import { FC } from 'react';
import type { Category } from '@/types/api.types';

import Image from 'next/image';
import Link from 'next/link';
import checkImg from '../../../public/images/check.png';
import { useParams } from 'next/navigation';

interface PopularCategoriesProps {
  categories: Category[];
}

const PopularCategories: FC<PopularCategoriesProps> = ({ categories }) => {
  const params = useParams<{ lang: string }>();

  return (
    <div className="flex flex-col gap-4 border-1 border-gray rounded-3xl p-6 lg:p-8">
      <h3 className="text-lg pb-6 text-primary font-medium md:text-xl lg:text-2xl">
        Popular Categories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-xs lg:text-sm gap-4">
        {categories.map(({ id, category }) => {
          return (
            <div
              key={id}
              className="flex items-center gap-2 border-1 border-gray py-1 px-4 rounded-full hover:cursor-pointer">
              <Image className="h-4 w-4" src={checkImg} width={16} height={16} alt={category} />
              <Link href={`/${params.lang}/categories/${id}`}>{category}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
