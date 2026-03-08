"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllBanners = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/banners`);
    if (!res.ok) {
      return { status: "error", data: [] };
    }
    return res.json();
  } catch {
    return { status: "error", data: [] };
  }
};

// export const getSingleBannerBySlug = async (slug: string) => {
//   const res = await fetch(`${apiBaseUrl}/banners/${slug}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch banners");
//   }

//   return res.json();
// };
