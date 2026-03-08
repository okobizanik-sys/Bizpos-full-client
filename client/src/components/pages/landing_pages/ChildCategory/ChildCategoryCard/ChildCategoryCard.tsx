import { fjallaOne } from "@/app/font";
import { apiBaseUrl } from "@/config/config";
import { TChildCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ChildCategoryProps {
  childCategory: TChildCategory;
}

const ChildCategoryCard: React.FC<ChildCategoryProps> = ({ childCategory }) => {
  const { name, bannerImage, _id, slug } = childCategory;


  return (
    <div className="text-center relative group overflow-hidden rounded">
      <Link href={`/shop?childCategory=${slug || _id}`}>
        <Image
          src={bannerImage ? apiBaseUrl + bannerImage : "/window.svg"}
          alt={name}
          width={500}
          height={500}
          className="w-full rounded group-hover:scale-105 duration-300"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/15  w-full rounded"></div>
        {/* <h2
          className={`text-xl font-semibold text-[#fff] absolute bottom-[12px] left-[50%] translate-x-[-50%] bg-[red]  z-50 ${fjallaOne.className}`}
        >
          {name}
        </h2> */}
        <div
          className={`bottom-0 absolute w-full group-hover:bg-[#99C9F7]/20 group-hover:border-t border-[#fff]/30 rounded-b text-[#fff] z-50 duration-300 ${fjallaOne.className}`}
        >
          <h2 className="py-2">{name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default ChildCategoryCard;
