"use server";
import { apiBaseUrl } from "@/config/config";

export const getShopSidebar = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/category/navbar`);
    if (!res.ok) {
      return { status: "error", data: [] };
    }
    return res.json();
  } catch {
    return { status: "error", data: [] };
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/category/${id}`);
    if (!res.ok) {
      return { status: "error", data: null };
    }
    return res.json();
  } catch {
    return { status: "error", data: null };
  }
};
