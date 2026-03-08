"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllSubCategorys = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/sub-category`);
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
