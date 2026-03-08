import ShopProducts from "@/components/pages/products/ShopProducts/ShopProducts";
import ShopProductsCategories from "@/components/pages/products/ShopProductsCategories/ShopProductsCategories";
import { getShopSidebar } from "@/services/shopSidebar";
import { getAllProductsForShop } from "@/services/products";
import { getUser } from "@/services/auth";
import { getCartProducts } from "@/services/cart";
// import NavBar from "@/components/pages/header/NavBar/NavBar";
import CartSideBar from "@/components/pages/cartSideBar/CartSideBar";
import React from "react";
import UpcomingSideBanner from "@/components/pages/UpcomingSideBanner/UpcomingSideBanner";
import { getAllBanners } from "@/services/banners";
import { Metadata } from "next";

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

  const categorySlug = Array.isArray(params.category)
    ? params.category[0]
    : params.category || "";

  const { data: products } = await getAllProductsForShop(categorySlug);

  const user = await getUser();
  const userId = user?.id;
  const coupon = "";
  const cartProducts = await getCartProducts(userId, coupon);

  const { data: banners } = await getAllBanners();
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
      {/* <NavBar userCartProducts={cartProducts?.data} /> */}
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
        <CartSideBar cartProducts={cartProducts?.data} />
        <UpcomingSideBanner banners={banners || []} />
      </div>
    </>
  );
}
