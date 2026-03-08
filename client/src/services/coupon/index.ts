"use server";

import { apiBaseUrl } from "@/config/config";

export const getSingleCoupon = async (couponId: { couponId: string }) => {
  try {
    const res = await fetch(`${apiBaseUrl}/coupon/${couponId}`);
    if (!res.ok) {
      return { status: "error", data: null };
    }
    return res.json();
  } catch {
    return { status: "error", data: null };
  }
};
