"use client";
import Image from "next/image";
import React, { useState } from "react";
import ProductDialog from "../ProductDialog/ProductDialog";
import { resolveBizposMediaUrl } from "@/config/config";
import Link from "next/link";
import { TProduct } from "@/types";
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import cardImageLoading from "@/assets/animation/card-loading.json";

interface Product {
  product: TProduct;
}

const ShopProductCard: React.FC<Product> = ({ product }) => {
  const {
    name,
    price,
    mrpPrice,
    thumbnailImage,
    backViewImage,
    inventoryRef,
    inventoryType,
    slug,
    _id,
  } = product;

  const controls = useAnimation();
  const frontImage = thumbnailImage || backViewImage || "/window.svg";
  const backImage = backViewImage || thumbnailImage || "";
  const resolveImageSrc = (src: string) => {
    if (!src) return "/window.svg";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    return resolveBizposMediaUrl(src);
  };
  const [imageLoaded, setImageLoaded] = useState({
    back: false,
    front: false,
  });

  const handleHoverStart = () => {
    controls.start({ x: "100%", opacity: 0.5 });
  };

  const handleHoverEnd = () => {
    controls.start({ x: 0, opacity: 1 });
  };

  return (
    <div
      className="rounded overflow-hidden shadow transition group"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <div className="relative w-full overflow-hidden aspect-square">
        <Link href={`product/${slug}`}>
          <div className="relative w-full h-full">
            {/* Lottie loader until both images loaded */}
            {(frontImage && backImage) ?
              (!imageLoaded.back || !imageLoaded.front) && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-10">
                  <div className="w-24 h-24">
                    <Lottie animationData={cardImageLoading} loop autoplay />
                  </div>
                </div>
              ) : (!imageLoaded.front) && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-10">
                  <div className="w-24 h-24">
                    <Lottie animationData={cardImageLoading} loop autoplay />
                  </div>
                </div>
              )
            }

            {backImage && (
              <Image
                src={resolveImageSrc(backImage)}
                alt={`${name} backViewImage`}
                width={500}
                height={500}
                onLoad={() =>
                  setImageLoaded((prev) => ({ ...prev, back: true }))
                }
                className="w-full h-full object-cover"
              />
            )}

            {(thumbnailImage && backViewImage) ? (
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ x: 0, opacity: 1 }}
                animate={controls}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={resolveImageSrc(thumbnailImage)}
                  alt={`${name} thumbnailImage`}
                  width={500}
                  height={500}
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, front: true }))
                  }
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : <Image
              src={resolveImageSrc(frontImage)}
              alt={`${name} thumbnailImage`}
              width={500}
              height={500}
              onLoad={() =>
                setImageLoaded((prev) => ({ ...prev, front: true }))
              }
              className="w-full h-full object-cover"
            />
            }
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-between h-36">
        <Link href={`product/${slug}`}>
          <div className="p-4 text-center flex flex-col items-center justify-center">
            <h2 className="text-base font-semibold line-clamp-2">{name}</h2>
            <div className="flex gap-2 mt-2">
              <p className="flex items-center gap-1">
                <span>৳</span> <span>{Number(price).toFixed(2)}</span>
              </p>
              <p className="line-through text-[#262626]/60 flex items-center gap-1">
                <span>৳</span> <span>{Number(mrpPrice).toFixed(2)}</span>
              </p>
            </div>
          </div>
        </Link>

        <div>
          <ProductDialog
            name={name}
            price={price}
            productRef={_id}
            thumbnailImage={thumbnailImage}
            inventoryRef={inventoryRef}
            inventoryType={inventoryType}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
