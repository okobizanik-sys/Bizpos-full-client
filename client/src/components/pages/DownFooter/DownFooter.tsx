"use client";
import React, { useEffect, useState } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { AiOutlineShopping } from "react-icons/ai";
import { RiFileInfoLine } from "react-icons/ri";

import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { getBizposPosUrl } from "@/config/config";
interface FooterProps {
  userCartProducts: {
    cartDetails: any[]; // Replace 'any' with the specific type if known
  };
  userId?: string;
}
const DownFooter: React.FC<FooterProps> = ({ userCartProducts, userId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [posUrl, setPosUrl] = useState(getBizposPosUrl(userId));

  useEffect(() => {
    setPosUrl(getBizposPosUrl(userId));
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled past 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check if the user has reached the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;

      if (isBottom) {
        setIsVisible(false); // Hide the footer when at the bottom of the page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    // <div className="fixed bottom-0 md:py-12 py-2 w-full bg-[#fff] shadow-2xl z-[999]">
    <div
      className={`fixed  bottom-0 md:py-12 py-4 w-full bg-[#fff] shadow-2xl border-t border-[#1D4095] z-[999]  transition-transform duration-300 ${
        isVisible ? "translate-y-0 " : "translate-y-full"
      } md:hidden`}
    >
      <div className="px-12 flex items-center justify-between">
        {/* <Link href="/contact">
          <div className="flex flex-col items-center justify-between capitalize text-sm font-semibold">
            <p>
              <LuContact className="text-lg text-[#1D4095]" />
            </p>
            <p className="text-[#1D4095]"> Contact</p>
          </div>
        </Link> */}

        <Link href="/">
          <div className="flex flex-col items-center justify-between capitalize text-sm font-semibold">
            <p>
              <LiaHomeSolid className="text-lg text-[#1D4095]" />
            </p>
            <p className="text-[#1D4095]">Home</p>
          </div>
        </Link>

        <Link href="/about">
          <div className="flex flex-col items-center justify-between capitalize text-sm font-semibold">
            <p>
              <RiFileInfoLine className="text-lg text-[#1D4095]" />
            </p>
            <p className="text-[#1D4095]">About</p>
          </div>
        </Link>

        <Link href="/shop">
          <div className="flex flex-col items-center justify-between capitalize text-sm font-semibold">
            <p>
              <AiOutlineShopping className="text-lg text-[#1D4095]" />
            </p>
            <p className="text-[#1D4095]"> Shop</p>
          </div>
        </Link>

        <Link href={posUrl}>
          <div className="flex flex-col items-center justify-between capitalize text-sm font-semibold">
            <p className="relative">
              <BsCart2 className="text-lg text-[#1D4095]" />
              <span className="top-[-12px] right-[-8px] absolute w-[20px] h-[20px] text-sm text-[#fff] text-center rounded-full bg-[red]">
                {userCartProducts?.cartDetails?.length || 0}
              </span>
            </p>
            <p className="text-[#1D4095]">Cart</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DownFooter;
