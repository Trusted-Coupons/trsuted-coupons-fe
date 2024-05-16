'use client';
import { FC } from 'react';
import type { Category } from '@/types/api.types';
import Image from 'next/image';
import checkImg from '../../../public/images/check.png';
import { useParams, useRouter } from 'next/navigation';
import { CategoriesLangKeys } from '@/types/categoriesLangKeys';

interface PopularCategoriesProps {
  categories: Category[];
  dict: any;
}

const PopularCategories: FC<PopularCategoriesProps> = ({ categories, dict }) => {
  const router = useRouter();
  const params = useParams<{ lang: string }>();

  const returnCategorieKey = (catId: number) => {
    const result = CategoriesLangKeys.find((categorie) => categorie.id === catId);
    if (result) {
      return dict.category[result.categorieKey];
    } else {
      return '';
    }
  };

  returnCategorieKey(2);
  return (
    <div className="flex flex-col gap-4 border-1 border-gray rounded-3xl p-6 lg:p-8">
      <h3 className="text-lg pb-6 text-primary font-medium md:text-xl lg:text-2xl">
        {dict.heading.popular_categories}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-xs lg:text-sm gap-4">
        {categories?.map(({ id }) => {
          return (
            <div
              key={id}
              onClick={() => router.push(`/${params.lang}/categories/${id}`)}
              className="flex items-center gap-2 border-1 border-gray py-1 px-4 rounded-full hover:cursor-pointer">
              <Image className="h-4 w-4" src={checkImg} width={16} height={16} alt="coupon card" />
              <span>{returnCategorieKey(id)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
