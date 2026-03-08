"use server";

import { apiRequest } from "@/lib/apiRequest";

export const addOrder = async (order: {
  productRef: string;
  quantity: number;
  userRef: string;
  inventoryRef?: string | null;
}) => {
  const res = await apiRequest<{
    status: string;
    message?: string;
    statusCode?: number;
    data?: unknown;
  }>({
    endpoint: "/order",
    method: "POST",
    body: order,
  });
  return res;
};
