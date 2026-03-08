"use server";

import { apiBaseUrl } from "@/config/config";
import { apiRequest } from "@/lib/apiRequest";
import { normalizeCategorySlugs } from "@/lib/utils";
import { TResponse } from "@/types";

export const getHomePageSubCategoryProducts = async (viewType?: string) => {
  const result: TResponse = await apiRequest({
    endpoint: `/product/view-type?viewType=${viewType}`,
  });
  return result;
};

export const getAllProductsForShop = async (
  categorySlug?: string,
  page?: number
) => {
  const searchParams = new URLSearchParams();

  if (categorySlug) {
    const categories = normalizeCategorySlugs(categorySlug);
    categories.forEach((cat) => {
      searchParams.append("categorySlug", cat);
    });
  }

  if (page) {
    searchParams.append("page", page.toString());
  }

  const url = `${apiBaseUrl}/product/pagination?${searchParams.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        status: "error",
        statusCode: res.status,
        message: "Failed to fetch products",
        data: {
          result: [],
          pagination: {
            currentPage: page || 1,
            currentPageLimit: 20,
            total: 0,
            totalPage: 1,
            prevPage: null,
            nextPage: null,
          },
        },
      };
    }

    return res.json();
  } catch {
    return {
      status: "error",
      statusCode: 500,
      message: "Failed to fetch products",
      data: {
        result: [],
        pagination: {
          currentPage: page || 1,
          currentPageLimit: 20,
          total: 0,
          totalPage: 1,
          prevPage: null,
          nextPage: null,
        },
      },
    };
  }
};

export const getSingleProductBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/product/${slug}`);
    if (!res.ok) {
      return {
        status: "error",
        statusCode: res.status,
        message: "Failed to fetch product",
        data: null,
      };
    }

    return res.json();
  } catch {
    return {
      status: "error",
      statusCode: 500,
      message: "Failed to fetch product",
      data: null,
    };
  }
};

export const getRelativeProducts = async (productId: string) => {
  try {
    const res = await fetch(
      `${apiBaseUrl}/product/related-product/${productId}`
    );
    if (!res.ok) {
      return {
        status: "error",
        statusCode: res.status,
        message: "Failed to fetch related products",
        data: [],
      };
    }
    return res.json();
  } catch {
    return {
      status: "error",
      statusCode: 500,
      message: "Failed to fetch related products",
      data: [],
    };
  }
};

export const getSearchProducts = async (search: { search: string }) => {
  try {
    const res = await fetch(
      `${apiBaseUrl}/product/search?search=${search?.search}`
    );
    if (!res.ok) {
      return { status: "error", data: [] };
    }
    return res.json();
  } catch {
    return { status: "error", data: [] };
  }
};
