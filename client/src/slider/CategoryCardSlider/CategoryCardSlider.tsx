import { TCategory } from "@/types";
import Image from "next/image";
import React from "react";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";
interface CategoryProps {
  categoriesList: TCategory[];
}

const CategoryCardSlider: React.FC<CategoryProps> = ({ categoriesList }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 ">
      {categoriesList?.map((category) => (
        <Link
          key={category._id}
          href={`/shop?category=${category.slug || category._id}`}
        >
          <div className="group border border-[#262626]/20 rounded md:p-2 p-4 md:w-[120px] w-[60px] h-[60px] md:h-[120px] flex items-center justify-center flex-col cursor-pointer">
            <div>
              {category?.vectorImage ? (
                <Image
                  src={`${apiBaseUrl}${category.vectorImage}`}
                  alt={category.name}
                  width={60}
                  height={60}
                  className="opacity-20 group-hover:opacity-100 duration-300"
                />
              ) : (
                <div className="w-[40px] h-[40px] rounded-full bg-[#1D4092]/15 text-[#1D4092] flex items-center justify-center font-bold uppercase">
                  {category?.name?.slice(0, 1) || "C"}
                </div>
              )}
            </div>
            <p className="text-[#262626]/20 md:text-base text-[10px] group-hover:text-[#262626]/60 duration-300 font-semibold md:mt-2 text-center capitalize">
              {category.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCardSlider;
