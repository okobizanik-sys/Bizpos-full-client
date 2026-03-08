"use client";
import CartDelete from "@/components/actionButton/CartDelete";
import { resolveBizposMediaUrl } from "@/config/config";
import Image from "next/image";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TCartDetails } from "@/types";

interface Props {
  cartProducts: TCartDetails;
}

const CartSideBar: React.FC<Props> = ({ cartProducts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed top-[30vh]  right-0 z-20">
        <div
          className="bg-[#1F4095]  p-2 text-[#fff] rounded-l cursor-pointer"
          onClick={menuClick}
        >
          <IoCart className="text-xl" />
        </div>
        <p className="bg-[red] text-center mx-0 text-white w-[20px] h-[26px] p-1 text-sm mt-1 ml-2 rounded">
          {cartProducts?.cartDetails?.length}
        </p>
      </div>

      {/* Overlay - prevents interaction with background when sidebar is open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-26" onClick={menuClick} />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed right-0 top-0 h-full xl:w-[20%] lg:w-[30%] md:w-[40%] w-[70%] bg-[#EBEBEB] z-26 overflow-auto pt-18"
          >
            {/* Header */}
            <div className="bg-[#333333] w-full flex items-center px-4 py-2 text-[#fff]">
              <p className="text-xl cursor-pointer" onClick={menuClick}>
                <FaXmark />
              </p>
              <h2 className="text-center mx-auto uppercase font-semibold">
                Cart
              </h2>
            </div>
            {/* Cart Items */}
            <div className="p-4">
              {cartProducts?.cartDetails?.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col mb-5 bg-[#fcf9f9] hover:bg-[#E6E6E6] transition-colors duration-200 rounded"
                >
                  <div className="bg-[#F6F6F6] flex justify-between border-t border-black/5 py-3 px-3 rounded-t">
                    <div className="font-bold text-[15px]">
                      <p className="text-[#2287e0] hover:underline hover:text-[#014C8C] px-1">
                        {product?.product?.name}
                      </p>
                    </div>

                    {product?.product?.thumbnailImage && (
                      <Image
                        height={100}
                        width={100}
                        src={resolveBizposMediaUrl(
                          product?.product?.thumbnailImage
                        )}
                        alt={product?.product?.name}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </div>

                  <div className="hover:bg-[#E6E6E6] rounded-b">
                    <div className="flex justify-between border-t border-black/5 py-3 px-3">
                      <p className="font-bold text-[15px]">Price</p>
                      <div className="flex gap-2">
                        <p>৳ {product?.product?.price}</p>
                        <p className="text-red-600 line-through">
                          ৳ {product?.product?.mrpPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-black/5 py-3 px-3">
                      <p className="font-bold text-[15px]">Size</p>
                      <p>Premium 2XL</p>
                    </div>

                    <div className="flex justify-between border-t border-black/5 py-3 px-3">
                      <p className="font-bold text-[15px]">Quantity</p>
                      {product?.quantity || "N/A"}
                    </div>

                    <div className="flex justify-between border-t border-black/5 py-3 px-3">
                      <p className="font-bold text-[15px]">Subtotal</p>
                      <div className="flex gap-2">
                        <p>৳ {product?.subtotal}</p>
                      </div>
                    </div>

                    <CartDelete cardId={product?.cartId} />
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 bg-[#fff] z-[999] w-full flex items-center">
              <div className="flex items-center flex-col xl:w-[200px] lg:w-[180px] md:w-[200px] w-[160px] ">
                <p className="font-semibold text-[12px]">cart total</p>
                <p>৳ {cartProducts?.totalPrice}</p>
              </div>
              <Link href="/checkout">
                <div className="w-[165px]  bg-[#1F4095] py-2 flex items-center justify-center gap-2 text-[#fff] cursor-pointer">
                  <p>Checkout</p>
                  <p>
                    <IoIosArrowForward />
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSideBar;
