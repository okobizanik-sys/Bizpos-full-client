import { resolveBizposMediaUrl } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../ProductCard/ProductCard.css";

interface Props {
  product: {
    thumbnailImage: string;
    name: string;
    mrpPrice: number;
    price: number;
    slug: string;
  };
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { thumbnailImage, name, mrpPrice, price, slug } = product;
  const imageSrc = thumbnailImage
    ? resolveBizposMediaUrl(thumbnailImage)
    : "/window.svg";

  return (
    <div className="productcard">
      <Link href={`/product/${slug}`}>
        <div className="relative group rounded ">
          <div className="absolute top-0 rounded left-0 h-[2px] w-full bg-[#2759ce] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 z-10"></div>
          <div className=" rounded-t overflow-hidden">
            <Image
              src={imageSrc}
              alt="image"
              width={300}
              height={300}
              className="rounded-t h-full w-full object-cover duration-300 group-hover:scale-105"
            />
          </div>

          <div className="">
            <div className="text-[12px] font-semibold flex-col bg-[#fff]  w-full  m-auto rounded-b-md shadow px-4 py-1 z-50 flex  gap-1 justify-center items-center">
              <h2 className="line-clamp-1">{name}</h2>
              <div className="flex gap-2">
                <p className="flex items-center gap-1">
                  <span>৳</span> <span>{Number(price).toFixed(2)}</span>
                </p>{" "}
                <p className="line-through text-[#262626]/60 flex items-center gap-1">
                  <span>৳</span> <span>{Number(mrpPrice).toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
