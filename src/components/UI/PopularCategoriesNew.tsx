'use client';

import { FC } from 'react';
import type { Category } from '@/types/api.types';

import Image from 'next/image';
import Link from 'next/link';
import checkImg from '../../../public/images/check.png';
import { useParams } from 'next/navigation';

interface PopularCategoriesProps {
  categories: any;
}

const PopularCategoriesNew: FC<PopularCategoriesProps> = ({ categories }) => {
  const params = useParams<{ lang: string }>();
  // Replace single quotes with double quotes for valid JSON
  const jsonString = categories.replace(/'/g, '"');
  // Parse the JSON string into an array
  const arrayData = JSON.parse(jsonString);

  return (
    <div className="flex flex-col gap-2 border-1 border-gray rounded-3xl p-2 lg:p-4">
      <h3 className="text-lg pb-3 text-primary font-medium md:text-xl lg:text-2xl">
        Related Categories
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 text-xs lg:text-sm gap-4">
        {arrayData.map((category: any, index: any) => {
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

export default PopularCategoriesNew;
