"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { HiMiniXMark } from "react-icons/hi2";
import { normalizeCategorySlugs, serializeCategorySlugs } from "@/lib/utils";

const SearchCancel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allCategories = normalizeCategorySlugs(searchParams.getAll("category"));

  const handleClear = (value: string) => {
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

  if (allCategories.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2 lg:mt-0">
      {allCategories.map((cat, index) => (
        <div
          key={`${cat}-${index}`}
          className="inline-flex items-center justify-center gap-1 rounded bg-[#495588] p-1 px-2 text-sm capitalize text-[#fff]"
        >
          <p>{cat}</p>
          <HiMiniXMark
            className="cursor-pointer text-lg"
            onClick={() => handleClear(cat)}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchCancel;
