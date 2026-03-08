"use server";
import { apiRequest } from "@/lib/apiRequest";
import { TResponse } from "@/types";

export const ContactPosting = async (credentials: {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}) => {
  const result: TResponse = await apiRequest({
    endpoint: "/contact-info",
    method: "POST",
    body: credentials,
  });

  return result;
};
