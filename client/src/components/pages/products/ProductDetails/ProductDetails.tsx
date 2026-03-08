"use client";
import React, { useState } from "react";

import Image from "next/image";
import { rajdhani } from "@/app/font";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { TProduct } from "@/types";
import { resolveBizposMediaUrl } from "@/config/config";
import ProductDetailsSlide from "@/slider/ProductDetailsSlide/ProductDetailsSlide";
import { addToCart } from "@/services/cart";
import { toast } from "react-toastify";
import { getUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";
interface Props {
  product: TProduct;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [count, setCount] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [levelError, setLevelError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const router = useRouter();
  const controls = useAnimation();
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const {
    name,
    thumbnailImage,
    backViewImage,
    sizeChartImage,
    description,
    mrpPrice,
    price,
    inventoryRef,
    inventoryType,
    images,
    _id,
  } = product;

  const totalAvailableStock = Array.isArray(inventoryRef)
    ? inventoryRef.reduce(
        (sum, item) =>
          sum + Number(item?.availableQuantity ?? item?.quantity ?? 0),
        0
      )
    : 0;
  const isOutOfStock = totalAvailableStock <= 0;

  // const userId = "67f4c99c11813048a36a2496";

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    const user = await getUser();

    // if not logged in then redirect to login page
    if (!user) {
      toast.error("Please login to add product to cart.");
      router.push("/login");
      return;
    }
    if (
      (inventoryType === "levelInventory" ||
        inventoryType === "colorLevelInventory") &&
      !selectedLevel
    ) {
      setLevelError(true);
      return;
    }

    if (
      (inventoryType === "colorLevelInventory" ||
        inventoryType === "colorInventory") &&
      !selectedColor
    ) {
      setColorError(true);
      return;
    }
    try {
      controls.set({ x: 0, y: 0, scale: 1 });
      const resolveInventoryRef = () => {
        if (!Array.isArray(inventoryRef) || inventoryRef.length === 0) {
          return null;
        }

        if (inventoryType === "inventory") {
          return inventoryRef[0]?._id || null;
        }

        if (inventoryType === "levelInventory") {
          const matched = inventoryRef.find((inv) => inv.level === level);
          return matched?._id || selectedLevel;
        }

        if (inventoryType === "colorInventory") {
          const matched = inventoryRef.find((inv) => inv._id === selectedColor);
          return matched?._id || selectedColor;
        }

        if (inventoryType === "colorLevelInventory") {
          const matched = inventoryRef.find(
            (inv) => inv.level === level && inv._id === selectedColor
          );
          return matched?._id || selectedColor;
        }

        return null;
      };

      const product: {
        quantity: number;
        productRef: string;
        userRef: string | undefined;
        inventoryRef?: string | null;
      } = {
        quantity: count,
        productRef: _id,
        userRef: user?.id,
      };
      product.inventoryRef = resolveInventoryRef();

      await addToCart(product);
      toast.success("Product added to cart!");
      router.refresh();
      setLevelError(false);
      setColorError(false);
      controls.start({
        scale: 0.01,
        x: 1200,
        y: -200,
        transition: { duration: 0.6, ease: "easeInOut" },
      });

      setTimeout(() => {
        controls.set({ x: 10, scale: 0 });
      }, 1000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add product to cart.");
    }
  };

  return (
    <div className="Container  py-8 min-h-100 lg:mt-0 mt-12">
      <div className="grid lg:grid-cols-2 gap-8 ">
        <ProductDetailsSlide
          controls={controls}
          thumbnailImage={thumbnailImage}
          backViewImage={backViewImage}
          images={images}
          name={name}
        />

        <div className="">
          <h2 className={`text-2xl font-semibold ${rajdhani.className}`}>
            {name}
          </h2>

          <div className="flex gap-2 mt-2">
            <p className="line-through text-[#262626]/60 font-semibold flex items-center gap-1">
              <span>৳</span> <span>{Number(mrpPrice).toFixed(2)}</span>
            </p>
            <p className="flex items-center gap-1 font-semibold text-xl">
              <span>৳</span> <span>{Number(price).toFixed(2)}</span>
            </p>
            {isOutOfStock && (
              <p className="text-xs font-semibold uppercase bg-red-100 text-red-600 px-2 py-1 rounded">
                Stock Out
              </p>
            )}
          </div>

          <div className="mt-3">
            {(inventoryType === "levelInventory" ||
              inventoryType === "colorLevelInventory") && (
                <div className="flex flex-col">
                  <h3 className={`text-base font-semibold ${rajdhani.className}`}>
                    Select Size:
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#262626]/60 mt-1 cursor-pointer">
                    {inventoryRef
                      ?.filter(
                        (value, index, item) =>
                          index === item.findIndex((t) => t.level === value.level)
                      )
                      .map((size) => (
                        <p
                          key={size._id}
                          onClick={() => {
                            setLevel(size.level);
                            setSelectedLevel(size._id);
                            setSelectedColor(null);
                            setLevelError(false);
                          }}
                          className={`w-[40px] h-[30px] border border-[#262626]/60 hover:bg-[#1F4193] hover:text-[#fff] duration-300 cursor-pointer rounded text-center flex items-center justify-center uppercase ${level === size.level ? "bg-[#1F4193] text-white" : ""
                            }`}
                        >
                          {size.level}
                        </p>
                      ))}
                  </div>
                  {levelError && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select a size.
                    </p>
                  )}
                </div>
              )}
          </div>

          <div className="mt-3">
            {(inventoryType === "colorLevelInventory" && selectedLevel) ||
              inventoryType === "colorInventory" ? (
              <div className="flex flex-col">
                <h3
                  className={`text-base font-semibold text-[#262626] ${rajdhani.className}`}
                >
                  Select Color:
                </h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#262626]/60 mt-1">
                  {inventoryRef
                    ?.filter((item) =>
                      inventoryType === "colorLevelInventory"
                        ? item.level === level
                        : true
                    )
                    .filter(
                      (value, index, arr) =>
                        index === arr.findIndex((t) => t.color === value.color)
                    )
                    .map((colorItem) => (
                      <div
                        key={colorItem._id}
                        onClick={() => {
                          setSelectedColor(colorItem._id);
                          setColorError(false);
                        }}
                        className={`border ${selectedColor === colorItem._id
                          ? "border-[#1F4193] border-2 w-[20px] h-[20px]"
                          : "border-[#262626] w-[25px] h-[25px]"
                          } rounded-full cursor-pointer`}
                        style={{ backgroundColor: colorItem.color }}
                      />
                    ))}
                </div>
                {colorError && (
                  <p className="text-red-500 text-sm mt-1">
                    Please select color.
                  </p>
                )}
              </div>
            ) : null}
          </div>

          <div className="border-b pb-4">
            <div className="mt-4 flex items-center gap-2 ">
              <div
                className={`flex items-center justify-between border rounded px-3 py-[7px] md:w-[25%] w-[30%] ${
                  isOutOfStock ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <p onClick={handleDecrement} className="cursor-pointer">
                  <FiMinus />
                </p>
                <span>{count}</span>
                <p onClick={handleIncrement} className="cursor-pointer">
                  <FiPlus />
                </p>
              </div>
              <div className="w-full cursor-pointer">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex items-center gap-1 px-6 py-2.5 font-semibold text-sm rounded text-[#fff] ${
                    isOutOfStock
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1E3F92] cursor-pointer"
                  }`}
                >
                  {!isOutOfStock && (
                    <span>
                      <FiPlus />
                    </span>
                  )}
                  <span>{isOutOfStock ? "Stock Out" : "Add To Cart"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          <div className="mt-3">
            <div className="mt-2">
              {sizeChartImage && (
                <Image
                  src={resolveBizposMediaUrl(sizeChartImage)}
                  alt={`${name} sizeChartImage`}
                  width={500}
                  height={500}
                  className="w-full h-full rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
