"use client";

import Image from "next/image";
import React from "react";
import loader from "@/assets/loader/file.png";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-white flex justify-center items-center">
      <div className="relative w-[150px] h-[150px]">
        {/* Circular spinner */}
        {/* <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div> */}

        {/* Center image */}
        <Image
          src={loader}
          alt="Loading"
          className="w-[120px] h-[120px] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"
        />
      </div>
    </div>
  );
};

export default Loading;
