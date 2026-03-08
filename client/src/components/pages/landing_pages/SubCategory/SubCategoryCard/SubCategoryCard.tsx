import { TSubCategory } from "@/types";
import Image from "next/image";
import React from "react";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";
interface SubCategory {
  subCategory: TSubCategory;
}

const SubCategoryCard: React.FC<SubCategory> = ({ subCategory }) => {
  const { name, image, slug, _id } = subCategory;
  return (
    <div className="mt-2 border border-[#fff] hover:border hover:border-[#1E3E96]/20 rounded">
      <Link href={`/shop?subCategory=${slug || _id}`}>
        <div className="relative cursor-pointer  rounded group w-fit overflow-hidden">
          {/* Top-left corner */}
          <span className="absolute top-[-4px] group-hover:top-0 left-[-4px] group-hover:left-0 w-3 h-3 border-t-4 border-l-4 border-transparent group-hover:border-[#1D4092] rounded-tl-md transition-all duration-300"></span>

          {/* Top-right corner */}
          <span className="absolute top-[-4px] group-hover:top-0 right-[-4px] group-hover:right-0 w-3 h-3 border-t-4 border-r-4 border-transparent group-hover:border-[#1D4092] rounded-tr-md transition-all duration-300"></span>

          {/* Bottom-left corner */}
          <span className="absolute bottom-[-4px] group-hover:bottom-0 left-[-4px] group-hover:left-0 w-3 h-3 border-b-4 border-l-4 border-transparent group-hover:border-[#1D4092] rounded-bl-md transition-all duration-300"></span>

          {/* Bottom-right corner */}
          <span className="absolute bottom-[-4px] group-hover:bottom-0 right-[-4px] group-hover:right-0 w-3 h-3 border-b-4 border-r-4 border-transparent group-hover:border-[#1D4092] rounded-br-md transition-all duration-300"></span>

          {/* Card Image */}
          <Image
            src={image ? apiBaseUrl + image : "/window.svg"}
            alt={name}
            width={300}
            height={300}
            className="rounded hover:scale-105 duration-300"
          />

          {/* Name Label */}
          {/* <div className="absolute top-0 left-[50%] bg-white rounded-b-lg shadow-md translate-x-[-50%] text-center flex items-center justify-center mx-auto">
            <p className="text-[12px] px-2 py-1 line-clamp-1 font-medium">
              {name}
            </p>
          </div> */}

          <div className="absolute top-0 left-[50%] bg-white rounded-b-lg group-hover:border-b-2 border-[#1D4092] shadow-md translate-x-[-50%] text-center flex items-center justify-center mx-auto">
            <p className="text-[12px] px-2 py-1 line-clamp-1 font-medium">
              {name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubCategoryCard;
