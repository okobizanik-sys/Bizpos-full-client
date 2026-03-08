"use client";

import { TShopSideBar } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface AllPageSidebarProps {
  shopSideBar: TShopSideBar[];
}

const AllPageSidebar: React.FC<AllPageSidebarProps> = ({ shopSideBar }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState<string | null>(
    null
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
    setExpandedSubCategory(null);
  };

  const toggleSubCategory = (subCategoryId: string) => {
    setExpandedSubCategory((prev) =>
      prev === subCategoryId ? null : subCategoryId
    );
  };

  return (
    <div className="px-4 pt-2 sticky top-0 h-screen overflow-y-scroll custom-scroll">
      <ul className="space-y-2">
        {shopSideBar?.map((cat) => {
          const hasSubCategories = cat.subCategories.length > 0;
          const isExpandedCategory = expandedCategory === cat._id;

          return (
            <li key={cat._id}>
              <div
                onClick={() => hasSubCategories && toggleCategory(cat._id)}
                className={`flex items-center justify-between cursor-pointer text-md font-bold text-gray-700 transition ${
                  hasSubCategories ? "hover:text-[#495588]" : "cursor-default"
                }`}
              >
                <Link href={`/shop?category=${cat.slug}`}>{cat.name}</Link>
                {hasSubCategories &&
                  (isExpandedCategory ? (
                    <FiChevronUp className="text-gray-500" />
                  ) : (
                    <FiChevronDown className="text-gray-500" />
                  ))}
              </div>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isExpandedCategory
                    ? "max-h-[500px] opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-1 pl-4">
                  {Array.isArray(cat.subCategories) &&  cat.subCategories.map((subCat) => {
                    const hasChildCategories =
                      (subCat.childCategories?.length ?? 0) > 0;
                    const isExpandedSubCat = expandedSubCategory === subCat._id;

                    return (
                      <li key={subCat._id}>
                        <div
                          onClick={() =>
                            hasChildCategories && toggleSubCategory(subCat._id)
                          }
                          className={`flex items-center justify-between text-md text-gray-600 transition ${
                            hasChildCategories
                              ? "hover:text-[#495588]"
                              : "cursor-default"
                          }`}
                        >
                          <Link href={`/shop?subCategory=${subCat.slug}`}>
                            {subCat.name}
                          </Link>
                          {hasChildCategories &&
                            (isExpandedSubCat ? (
                              <FiChevronUp className="text-gray-600" />
                            ) : (
                              <FiChevronDown className="text-gray-600" />
                            ))}
                        </div>

                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            isExpandedSubCat
                              ? "max-h-[300px] opacity-100 mt-1"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <ul className="space-y-1 pl-4">
                            {subCat.childCategories?.map((childCat) => (
                              <li
                                key={childCat._id}
                                className="text-sm text-gray-500"
                              >
                                <Link
                                  href={`/shop?childCategory=${childCat.slug}`}
                                >
                                  {childCat.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllPageSidebar;
