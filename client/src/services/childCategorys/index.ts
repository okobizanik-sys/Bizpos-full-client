"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllChildCategorys = async (viewType:string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/child-category?viewType=${viewType}&limit=4`);
    if (!res.ok) {
      return { status: "error", data: [] };
    }
    return res.json();
  } catch {
    return { status: "error", data: [] };
  }
};

// export const getSingleSubCategoryBySlug = async (slug: string) => {
//   const res = await fetch(`${apiBaseUrl}/category/${slug}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch category");
//   }

//   return res.json();
// };
