import ShopProducts from "@/components/pages/products/ShopProducts/ShopProducts";
import ShopProductsCategories from "@/components/pages/products/ShopProductsCategories/ShopProductsCategories";
import { getShopSidebar } from "@/services/shopSidebar";
import { getAllProductsForShop } from "@/services/products";
import React from "react";
import { Metadata } from "next";
import { normalizeCategorySlugs, serializeCategorySlugs } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unicrescent | All Product",
  description: "Best E-commerce platform in BD",
};

export const revalidate = 0;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { data: shopSideBar } = await getShopSidebar();

  const categorySlug = serializeCategorySlugs(
    normalizeCategorySlugs(params.category as string | string[] | undefined)
  );

  const { data: products } = await getAllProductsForShop(categorySlug);

  const safeProducts = products || {
    result: [],
    pagination: {
      currentPage: 1,
      currentPageLimit: 20,
      total: 0,
      totalPage: 1,
      prevPage: null,
      nextPage: null,
    },
  };

  return (
    <>
      <div className="flex min-h-screen Container">
        <div className="w-[20%] hidden lg:block">
          <ShopProductsCategories shopSideBar={shopSideBar || []} />
        </div>
        <div className="flex-1 lg:mt-0 mt-12">
          <ShopProducts
            products={safeProducts.result}
            pagination={safeProducts.pagination}
            categorySlug={categorySlug}
          />
        </div>
      </div>
    </>
  );
}
