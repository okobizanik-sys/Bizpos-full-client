import { apiRequest } from "@/lib/apiRequest";

export const getUserInformation = async (userId: string) => {
  try {
    const response = await apiRequest({
      endpoint: `/auth/user/${userId}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const response = await apiRequest({
      endpoint: `/order/user/${userId}`,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateUserInformation = async (
  userId: string,
  credentials: {
    name?: string;
    email?: string;
    phone?: string;
  }
) => {
  try {
    const response = await apiRequest({
      endpoint: `/user/${userId}`,
      method: "PUT",
      body: credentials,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
