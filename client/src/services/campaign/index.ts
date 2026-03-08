"use server";
import { apiBaseUrl } from "@/config/config";

export const getCampaign = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/campaign`);
    if (!res.ok) {
      return { status: "error", data: [] };
    }
    return res.json();
  } catch {
    return { status: "error", data: [] };
  }
};
