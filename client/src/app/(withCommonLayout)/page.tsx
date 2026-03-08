import Banner from "@/components/pages/landing_pages/Banner/Banner";
import React from "react";
import HomeProductSection from "@/components/pages/landing_pages/HomeProductSection/HomeProductSection";
import { getHomePageSubCategoryProducts } from "@/services/products";

const page = async () => {
  const homeProductsRes = await getHomePageSubCategoryProducts("top");

  return (
    <>
      <div className="">
        <Banner banners={[]} />
        {homeProductsRes?.status === "success" && (
          <HomeProductSection products={homeProductsRes?.data} />
        )}
      </div>
    </>
  );
};

export default page;
