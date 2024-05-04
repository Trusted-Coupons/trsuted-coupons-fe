import Image from "next/image";
import React from "react";
import placeholderImg from "../../public/images/placeholder_store_01.jpeg";

type StoreProps = {
  storeImg: string;
  storeName: string;
};

const stores: StoreProps[] = [
  {
    storeImg: "/images/placeholder_store_01.jpeg",
    storeName: "Addidas.com",
  },
  {
    storeImg: "/images/placeholder_store_01.jpeg",
    storeName: "Nike.com",
  },
  {
    storeImg: "/images/placeholder_store_01.jpeg",
    storeName: "Google.com",
  },
  {
    storeImg: "/images/placeholder_store_01.jpeg",
    storeName: "Amazon.com",
  },
  {
    storeImg: "/images/placeholder_store_01.jpeg",
    storeName: "Zara.com",
  },
  { storeImg: "/images/placeholder_store_01.jpeg", storeName: "Telekom.com" },
];

const PopularStores = () => {
  return (
    <div className="flex gap-2 justify-center">
      {stores.map((store: StoreProps, index) => {
        return (
          <div key={index} className="flex flex-col gap-2 items-center">
            <Image
              src={placeholderImg}
              width={158}
              height={94}
              alt="popular stores"
            />
            {store.storeName}
          </div>
        );
      })}
    </div>
  );
};

export default PopularStores;
