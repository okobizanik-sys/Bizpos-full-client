"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import React, { useRef } from "react";
import { TBanner } from "@/types";

import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiBaseUrl } from "@/config/config";
import { Swiper as SwiperClass } from "swiper";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
interface BannerProps {
  banners: TBanner[];
}

const BannerSlider: React.FC<BannerProps> = ({ banners }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  return (
    <div className="relative">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper as SwiperClass)}
        speed={1200}
      >
        {banners?.map((banner: TBanner) => (
          <SwiperSlide key={banner._id}>
            <div className="2xl:h-[600px] xl:h-[450px] md:h-[350px] h-[200px]  relative">
              <Image
                src={apiBaseUrl + banner.image || ""}
                alt="Banner"
                width={1600}
                height={600}
                objectFit="cover" // Ensures images scale nicely
                className="w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="custom-prev cursor-pointer absolute left-8 top-1/2 transform -translate-y-1/2  z-10"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <MdArrowBackIos className="text-2xl" />
      </button>
      <button
        className="custom-next cursor-pointer absolute right-8 top-1/2 transform -translate-y-1/2 l z-10"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <MdArrowForwardIos className="text-2xl" />
      </button>
    </div>
  );
};

export default BannerSlider;
