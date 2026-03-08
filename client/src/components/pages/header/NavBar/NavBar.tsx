"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/assets/logo/main.png";
import SearchForm from "../SearchForm/SearchForm";
import { menuList } from "@/utilits/menuList";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { RiCloseFill, RiMenuAddFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { AnimatePresence, motion } from "framer-motion";
import ResponsiveSearchForm from "../ResponsiveSearchForm/ResponsiveSearchForm";
import ResponsiveNavSidBar from "../ResponsiveNavSidBar/ResponsiveNavSidBar";
import "../NavBar/NavBar.css";

import { getShopSidebar } from "@/services/shopSidebar";
// import { getCartProducts } from "@/services/cart";
import { getUser, setCorrelation } from "@/services/auth";

import { TUser } from "@/types";
import { usePathname } from "next/navigation";
import { getBizposPosUrl } from "@/config/config";

// import { useCartRefresh } from "@/context/CartRefreshContext";

interface NavBarProps {
  userCartProducts: {
    cartDetails: any[]; // Replace 'any' with the specific type if known
  };
  userId?: string;
  logoUrl?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  userCartProducts,
  userId,
  logoUrl,
}) => {
  // const { shouldRefresh, doneRefresh } = useCartRefresh();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopSidebarData, setShopSidebarData] = useState(null);
  // const [productsByUser, setProductsByUser] = useState<{
  //   cartDetails: any[];
  // } | null>(null);
  const [usersId, setUsersId] = useState<TUser | null>(null);

  const pathname = usePathname();
  const isShopPage = pathname === "/shop";
  // const { shouldRefresh, doneRefresh } = useCartRefresh();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setShowSideMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const { data } = await getShopSidebar();
        setShopSidebarData(data);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, []);

  useEffect(() => {
    const userData = async () => {
      try {
        const user = await getUser();

        setUsersId(user);
      } catch (error) {
        console.error("get user:", error);
      }
    };

    userData();
  }, []);

  // const userId = usersId?.id;
  const posUrl = getBizposPosUrl(userId || usersId?.id);
  const resolvedLogo = logoUrl || logo;
  // const coupon = "";
  // useEffect(() => {
  //   const userProducts = async () => {
  //     try {
  //       const { data: products } = await getCartProducts(userId, coupon);
  //       setProductsByUser(products || []);
  //       // doneRefresh();
  //     } catch (error) {
  //       console.error("user by products:", error);
  //     }
  //   };

  //   userProducts();
  // }, []);

  useEffect(() => {
    const setCorrelationAsync = async () => {
      await setCorrelation();
    };
    setCorrelationAsync();
  }, []);

  return (
    <>
      <div
        className={`hidden lg:block w-full py-4 z-40 shadow bg-white transition-all duration-300 ${
          isScrolled
            ? "opacity-0 -translate-y-full fixed"
            : "opacity-100 translate-y-0 relative"
        }`}
      >
        <div className="Container">
          <div className="flex items-center justify-between relative">
            <div>
              <div className="flex items-center lg:gap-0 gap-2">
                <div
                  onClick={() => setShowSideMenu(!showSideMenu)}
                  className="lg:hidden"
                >
                  {showSideMenu ? (
                    <RiCloseFill className="text-2xl" />
                  ) : (
                    <RiMenuAddFill className="text-2xl" />
                  )}
                </div>
                <div className="w-[180px] lg:w-[160px] 2xl:w-[180px] h-[44px]">
                  <Link href="/" className="block w-full h-full">
                    <Image
                      src={resolvedLogo}
                      alt="Unicrescent | Best E-commerce platform in BD"
                      width={180}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center  2xl:gap-16   gap-2 xl:relative">
              <div className="">
                <SearchForm onClose={() => {}} />
              </div>
              <div className="lg:flex hidden items-center justify-center xl:gap-4 gap-2 ml-8">
                {menuList?.map((menu, index) => (
                  <div
                    onMouseEnter={() => setActiveMenu(menu.title)}
                    onMouseLeave={() => setActiveMenu(null)}
                    key={index}
                  >
                    {/* <Link href={menu.link}>
                      <li className="list-none py-4  hover:text-[#1E3E96] tracking-wider duration-300 menuTitle">
                        {menu.title}
                      </li>
                    </Link> */}

                    <Link href={menu.link}>
                      <li
                        className={`list-none absolute hover:text-[#1E3E96] tracking-wider duration-300 menuTitle ${
                          index === menuList.length - 1
                            ? "bg-[#1E3E96] text-[#fff] hover:text-[#fff] px-2 py-2 text-[12px] rounded-tl-xl rounded-br-xl"
                            : ""
                        }`}
                      >
                        {menu.title}
                      </li>
                    </Link>

                    {menu.subMenu === true && activeMenu === menu.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-12 xl:w-[840px]"
                      >
                        {shopSidebarData && (
                          <DropDownMenu menu={shopSidebarData} />
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center xl:gap-4 gap-2">
              <div
                onClick={() => setShowSearch(true)}
                className="px-2 py-2 border rounded lg:hidden"
              >
                <IoSearchOutline />
              </div>
              <Link href={posUrl}>
                <div className="px-2 py-2 border rounded relative">
                  <BsCart2 />

                  <p className="top-[-12px] right-[-8px] absolute w-[20px] h-[20px] text-sm text-[#fff] text-center rounded-full bg-[red]">
                    {userCartProducts?.cartDetails?.length || 0}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`py-3 px-4 shadow-md border border-gray-200 fixed w-full z-30 top-0 bg-white transition-all duration-300 `}
      >
        <div className="">
          <div className="flex items-center justify-between relative">
            <div className="flex space-x-3 lg:gap-0 gap-2">
              <div
                onClick={() => setShowSideMenu(!showSideMenu)}
                className={`pr-3 border-r border-gray-300 cursor-pointer ${
                  isShopPage ? "lg:hidden" : "lg:block"
                }`}
              >
                {showSideMenu ? (
                  <RiCloseFill className="text-2xl" />
                ) : (
                  <RiMenuAddFill className="text-2xl" />
                )}
              </div>

              <div className="md:w-[180px] w-[140px] h-[36px] pl-3">
                <Link href="/" className="block w-full h-full">
                  <Image
                    src={resolvedLogo}
                    alt="Unicrescent | Best E-commerce platform in BD"
                    width={180}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center 2xl:gap-16 xl:gap-8 lg:gap-4 gap-2 xl:relative">
              <div className="flex items-center justify-center xl:gap-4 gap-2">
                <div
                  onClick={() => setShowSearch(true)}
                  className="px-2 py-2 border rounded cursor-pointer"
                >
                  <IoSearchOutline />
                </div>
                <Link href={posUrl}>
                  <div className="px-2 py-2 border rounded relative">
                    <BsCart2 />

                    <p className="top-[-12px] right-[-8px] absolute w-[20px] h-[20px] text-sm text-[#fff] text-center rounded-full bg-[red]">
                      {userCartProducts?.cartDetails?.length || 0}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSearch && (
          <ResponsiveSearchForm onClose={() => setShowSearch(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSideMenu && (
          <ResponsiveNavSidBar
            // menuList={menuList}
            onClose={() => setShowSideMenu(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
