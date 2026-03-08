"use server";
import { apiRequest } from "@/lib/apiRequest";
import { TResponse } from "@/types";

export const BulkOrderPosting = async (credentials: {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  companyName?: string;
  productType?: string;
  deliveryDate?: string;
  quantity?: number;
  description?: string;
}) => {
  const result: TResponse = await apiRequest({
    endpoint: "/order-bulk",
    method: "POST",
    body: credentials,
  });

  return result;
};
