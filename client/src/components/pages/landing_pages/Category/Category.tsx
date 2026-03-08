import { getAllCategorys } from "@/services/categorys";
import CategoryCardSlider from "@/slider/CategoryCardSlider/CategoryCardSlider";
import React from "react";

const Category = async () => {
  const { data: categoriesList } = await getAllCategorys();
  return (
    <div className="Container py-4 mt-4">
      <CategoryCardSlider categoriesList={categoriesList} />
    </div>
  );
};

export default Category;
