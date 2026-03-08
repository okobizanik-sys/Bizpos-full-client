import { fjallaOne } from "@/app/font";
import { apiBaseUrl } from "@/config/config";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductsProps {
  product: TProduct;
}

const ProductBannerCard: React.FC<ProductsProps> = ({ product }) => {
  const { bannerImage, slug, _id, name } = product;
  return (
    <div className="w-full h-full relative group overflow-hidden">
      <Link href={`/shop?subCategory=${slug || _id}`} className="relative">
        {bannerImage && (
          <Image
            src={apiBaseUrl + bannerImage || ""}
            alt="image"
            width={450}
            height={450}
            className="rounded h-full w-full group-hover:scale-105 duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/15  w-full rounded"></div>
        {/* <div
          className={`text-xl font-semibold text-[#fff] absolute bottom-[12px] left-[50%] translate-x-[-50%]  z-50 ${fjallaOne.className}`}
        >
          {name}
        </div> */}

        <div
          className={`bottom-0 absolute w-full  text-center group-hover:bg-[#99C9F7]/20 group-hover:border-t border-[#fff]/30 rounded-b text-[#fff] z-50 duration-300 ${fjallaOne.className}`}
        >
          <h2 className="py-2">{name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default ProductBannerCard;
