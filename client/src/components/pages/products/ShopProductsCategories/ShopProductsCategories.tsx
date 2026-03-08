"use client";

import { TShopSideBar } from "@/types";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ShopProductsCategoriesProps {
  shopSideBar: TShopSideBar[];
}

const ShopProductsCategories: React.FC<ShopProductsCategoriesProps> = ({
  shopSideBar,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const cats = searchParams.get("category")?.split(",") || [];
    setSelectedCategories(cats);
  }, [searchParams]);

  const updateParams = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentValues = new Set(
      (searchParams.get("category")?.split(",") || []).filter(Boolean)
    );

    if (currentValues.has(value)) {
      currentValues.delete(value);
    } else {
      currentValues.add(value);
    }

    if (currentValues.size > 0) {
      newParams.set("category", Array.from(currentValues).join(","));
    } else {
      newParams.delete("category");
    }

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="custom-scroll sticky top-0 h-screen overflow-y-scroll px-4 pt-2">
      <ul className="space-y-2">
        {shopSideBar?.map((cat) => (
          <li key={cat._id}>
            <label className="flex cursor-pointer items-center gap-2 font-medium text-gray-700">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => updateParams(cat.slug)}
                className="accent-[#495588]"
              />
              {cat.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopProductsCategories;
