"use client";

import { TShopSideBar } from "@/types";
import { normalizeCategorySlugs, serializeCategorySlugs } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ShopPageSidebarProps {
  shopSideBar: TShopSideBar[];
}

const ShopPageSidebar: React.FC<ShopPageSidebarProps> = ({ shopSideBar }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategories(normalizeCategorySlugs(searchParams.getAll("category")));
  }, [searchParams]);

  const updateParams = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentValues = new Set(
      normalizeCategorySlugs(searchParams.getAll("category"))
    );

    if (currentValues.has(value)) {
      currentValues.delete(value);
    } else {
      currentValues.add(value);
    }

    if (currentValues.size > 0) {
      newParams.set("category", serializeCategorySlugs(Array.from(currentValues)));
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

export default ShopPageSidebar;
