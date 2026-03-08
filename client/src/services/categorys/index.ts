"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllCategorys = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/category`);
    if (!res.ok) {
      return { status: "error", data: [] };
    }
    return res.json();
  } catch {
    return { status: "error", data: [] };
  }
};

// export const getSingleCategoryBySlug = async (slug: string) => {
//   const res = await fetch(`${apiBaseUrl}/category/${slug}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch category");
//   }

//   return res.json();
// };
