import Image from "next/image";
import React from "react";
import banner from "@/assets/images/bulkBanner.jpg";

const BulkBanner = () => {
  return (
    <div className="relative w-full mt-14 lg:mt-0">
      <Image src={banner} alt="Banner alt" className="w-full h-auto object-cover" />

      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-[#204392] to-[#A6B6D3] text-white font-semibold rounded-md transition-all duration-300 ease-in-out hover:from-[#A6B6D3] hover:to-[#204392] cursor-pointer">
        Order In Bulk
      </button>
    </div>
  );
};

export default BulkBanner;
