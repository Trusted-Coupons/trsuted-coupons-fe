"use client";
import React from "react";
import placeholder from "../../public/images/coupon_placeholder_01.jpg";
import Image from "next/image";

type CouponCardProps = {
  couponImageUrl: string;
  title: string;
  description: string;
  code: string;
  expireDate: string;
  setIsOpen: (open: boolean) => void;
};

const CouponCard = ({
  title,
  couponImageUrl,
  description,
  code,
  expireDate,
  setIsOpen,
}: CouponCardProps) => {
  return (
    <div className="flex max-w-[750px] w-full gap-5">
      <div>
        <Image src={placeholder} width={210} height={124} alt="coupon card" />
      </div>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <button onClick={() => setIsOpen(true)}>
          SHOW CODE:<span className="bg-green-100">{code}</span>
        </button>
        <div>Expire: {expireDate}</div>
      </div>
    </div>
  );
};

export default CouponCard;
