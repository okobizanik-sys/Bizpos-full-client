"use client";

import React, { useState, useEffect } from "react";
import {  motion } from "framer-motion";
import {  TShopSideBar } from "@/types";
import { usePathname } from "next/navigation";
import { getShopSidebar } from "@/services/shopSidebar";
import ShopPageSidebar from "./ShopPageSidebar";
import AllPageSidebar from "./AllPageSidebar";

type ResponsiveNavSidBarProps = {
  onClose: () => void;
};

const ResponsiveNavSidBar: React.FC<ResponsiveNavSidBarProps> = ({
  onClose,
}) => {
  const pathname = usePathname();
  const [shopSideBar, setShopSideBar] = useState<TShopSideBar[]>([]);


  useEffect(() => {
    getShopSidebar()
      .then((res) => {
        if (res?.data) setShopSideBar(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const isShopPage = pathname === "/shop";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        className="w-[70%] lg:w-[20%] bg-white h-screen fixed top-[60px] left-0 z-30"
      >
        <h2 className="md:px-10 px-4 py-4 text-xl font-medium inline-flex relative">
          Categories
          <span className="absolute md:left-10 left-5 bottom-3 w-10 h-0.5 bg-[#231E1F]"></span>
        </h2>

        {isShopPage ? (
          <ShopPageSidebar shopSideBar={shopSideBar} />
        ) : (
          <AllPageSidebar shopSideBar={shopSideBar} />
        )}
        
      </motion.div>
    </>
  );
};

export default ResponsiveNavSidBar;
