import Image, { StaticImageData } from 'next/image';
import React from 'react';

import placeholderImg from '../../public/images/placeholder_store_01.jpeg';

type CategoryProps = {
  categorieImg: StaticImageData;
  categorieName: string;
};

const categories: CategoryProps[] = [
  {
    categorieImg: placeholderImg,
    categorieName: 'Business'
  },
  {
    categorieImg: placeholderImg,
    categorieName: 'Tech'
  },
  {
    categorieImg: placeholderImg,
    categorieName: 'LifeStyle'
  }
];

const PopularCategories = () => {
  return (
    <div className="flex flex-col gap-4 border-2 border-gray-300 rounded-3xl p-12">
      <h3 className="text-3xl pb-10">Popular Categories</h3>
      <div className="flex gap-4">
        {categories.map((category: CategoryProps, index) => {
          return (
            <div key={index} className="flex flex-1 gap-2 border-2 py-1 px-4 rounded-full">
              <Image src={category.categorieImg} width={16} height={16} alt="coupon card" />
              <span>{category.categorieName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
