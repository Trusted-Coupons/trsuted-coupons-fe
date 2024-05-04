"use client";
import CouponCard from "@/components/couponCard";
import CouponListMain from "@/components/couponListMain";
import CouponModal from "@/components/couponModal";
import Header from "@/components/header";
import PopularCategories from "@/components/popularCategories";
import PopularStores from "@/components/popularStores";
import React, { useState } from "react";

const couponList = [
  {
    couponImageUrl: "https://example.com/image1.jpg",
    title: "50% Off on Electronics",
    description: "Get 50% off on all electronics items. Limited time offer!",
    code: "ELECTRO50",
    expireDate: "2024-12-10",
  },
  {
    couponImageUrl: "https://example.com/image2.jpg",
    title: "Free Shipping on Orders Over $50",
    description: "Enjoy free shipping on all orders over $50. Hurry, shop now!",
    code: "SHIPFREE",
    expireDate: "2024-11-30",
  },
  {
    couponImageUrl: "https://example.com/image3.jpg",
    title: "20% Off on Clothing",
    description: "Take 20% off on all clothing items. Don't miss out!",
    code: "CLOTHING20",
    expireDate: "2024-12-15",
  },
  {
    couponImageUrl: "https://example.com/image4.jpg",
    title: "$10 Off on Beauty Products",
    description: "Save $10 on all beauty products. Limited stock available!",
    code: "BEAUTY10",
    expireDate: "2024-11-25",
  },
  {
    couponImageUrl: "https://example.com/image5.jpg",
    title: "Buy One, Get One Free on Books",
    description: "Buy one book and get another one free. Limited offer!",
    code: "BOOKSBOGO",
    expireDate: "2024-12-05",
  },
];

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="relative flex h-[500px] w-full bg-blue-200 justify-center">
        <div className="absolute bottom-4">
          <PopularStores />
        </div>
      </div>
      <div className="flex flex-col w-full items-center">
        <PopularCategories />
      </div>
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 flex justify-center">
          <div className="flex flex-col flex-1 justify-center items-start p-10 gap-2 max-w-[750px]">
            {couponList &&
              couponList?.map((coupon, index) => {
                return (
                  <div key={index}>
                    <CouponCard
                      title={coupon.title}
                      description={coupon.description}
                      code={coupon.code}
                      expireDate={coupon.expireDate}
                      couponImageUrl={coupon.couponImageUrl}
                      setIsOpen={setIsOpen}
                    />
                    <CouponModal
                      modalIsOpen={modalIsOpen}
                      closeModal={closeModal}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        {/* Sidebar */}
        <div className="bg-gray-800 text-gray-100 py-6 hidden md:block w-64">
          <div className="px-8">
            <h2 className="text-lg font-semibold">Sidebar</h2>
            <ul className="mt-4">
              <li>
                <a href="#" className="block hover:text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
