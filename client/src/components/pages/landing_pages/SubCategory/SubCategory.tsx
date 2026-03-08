import React from "react";
import SubCategoryCard from "./SubCategoryCard/SubCategoryCard";
import { fjallaOne } from "@/app/font";
import { getAllSubCategorys } from "@/services/subCategorys";
import { TSubCategory } from "@/types";

const SubCategory = async () => {
  const { data: subCategoriesList } = await getAllSubCategorys();
  return (
    <div className="Container py-4">
      <div className="bg-[#FCF4E9] text-center my-2 py-8 rounded">
        <h2
          className={`text-4xl font-semibold text-[#CC8119] uppercase ${fjallaOne.className}`}
        >
          NEW ARRIVAL
        </h2>
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {subCategoriesList?.map((subCategory: TSubCategory) => (
          <SubCategoryCard key={subCategory._id} subCategory={subCategory} />
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
