import Image from "next/image";
import React from "react";
import placeholderImg from "../../public/images/promo_placeholder_01.png";

type CategorieProps = {
  categorieImg: string;
  categorieName: string;
};

const categories: CategorieProps[] = [
  {
    categorieImg: "/images/placeholder_store_01.jpeg",
    categorieName: "Business",
  },
  {
    categorieImg: "/images/placeholder_store_01.jpeg",
    categorieName: "Tech",
  },
  {
    categorieImg: "/images/placeholder_store_01.jpeg",
    categorieName: "LifeStyle",
  },
];

const PopularCategories = () => {
  return (
    <div className="flex gap-2">
      {categories.map((categorie: CategorieProps, index) => {
        return (
          <div key={index} className="flex flex-col gap-2 relative">
            <Image
              src={placeholderImg}
              width={360}
              height={242}
              alt="categorie"
            />
            <div className="flex absolute w-full h-1/3 bg-[#383838] bottom-0 text-white text-[21px] justify-center items-center">
              Shop for {categorie.categorieName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularCategories;
