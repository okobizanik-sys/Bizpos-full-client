"use client";

import { apiBaseUrl } from "@/config/config";
import { TBanner } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";

interface BannerProps {
  banners: TBanner[];
}

const UpcomingSideBanner: React.FC<BannerProps> = ({ banners }) => {
  const [isOpen, setIsOpen] = useState(false);

  const upcomingBanner = banners?.filter(
    (banner) => banner.type === "UPCOMING BANNER"
  );

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => {
      setIsOpen(true);
    }, 100); // Slight delay for smooth slide-in
  }, []);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-30 bg-[#1E3E96]/10 transition-opacity duration-500
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
         `}
      ></div>
      <div
        className={` transition-all duration-500 fixed top-0 border-t rounded right-0 z-20 h-screen bg-white border-l border-[#262626] shadow   md:w-[50vh] w-[25vh]
           ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-center mt-23 md:text-xl text-md font-semibold capitalize">
          Upcoming products
        </h2>

        {/* Toggle button */}
        {/* <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-[30px] h-[30px] border bg-[#1F4095] cursor-pointer text-[#fff] rounded flex items-center justify-center absolute left-[-35px] mt-8 z-[99] transition-transform duration-500 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <HiOutlineXMark />
        </div> */}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-[30px] h-[30px] border bg-[red] border-[#262626]/20 cursor-pointer text-[#fff] rounded flex items-center justify-center absolute left-[-35px] mt-[-30px] z-28 transition-transform duration-500 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          {isOpen ? (
            <HiOutlineXMark className="text-lg" />
          ) : (
            <IoIosArrowForward className="text-lg" />
          )}
        </div>

        {/* Banners */}
        <div className="overflow-y-auto mt-4 px-2 pb-8 max-h-[calc(100vh-100px)] ">
          <div className="flex flex-col gap-4 items-center justify-between md:mt-8 mt-2 md:px-4 ">
            {upcomingBanner?.map((banner) => (
              <div key={banner._id}>
                <div className="border border-[#262626]/40 p-1 rounded">
                  <Image
                    src={apiBaseUrl + banner.image}
                    width={400}
                    height={200}
                    alt="demo"
                    className="rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingSideBanner;
