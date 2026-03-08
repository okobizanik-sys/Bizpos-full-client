"use server";
import { apiBaseUrl } from "@/config/config";
import { apiRequest } from "@/lib/apiRequest";
import { revalidatePath } from "next/cache";

// export const getCartProducts = async (userId: { userId: string }) => {
//   // const res = await fetch(`${apiBaseUrl}/cart/all`);
//   const res = await fetch(`${apiBaseUrl}/cart?userId=${userId}`);

//   return res.json();
// };

export const getCartProducts = async (
  userId: string | undefined,
  coupon?: string
) => {
  if (!userId) {
    return {
      status: "success",
      statusCode: 200,
      message: "Cart fetched successfully",
      data: {
        cartDetails: [],
        couponDiscount: 0,
        productDiscount: 0,
        totalPrice: 0,
        totalSaved: 0,
      },
    };
  }

  try {
    const res = await fetch(
      `${apiBaseUrl}/cart?userId=${userId}&coupon=${coupon}`
    );

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      return {
        status: "error",
        statusCode: res.status,
        message: (payload as any)?.message || "Failed to fetch cart",
        data: {
          cartDetails: [],
          couponDiscount: 0,
          productDiscount: 0,
          totalPrice: 0,
          totalSaved: 0,
        },
      };
    }

    if (!isJson || !payload) {
      return {
        status: "error",
        statusCode: 500,
        message: "Invalid cart API response",
        data: {
          cartDetails: [],
          couponDiscount: 0,
          productDiscount: 0,
          totalPrice: 0,
          totalSaved: 0,
        },
      };
    }

    return payload;
  } catch {
    return {
      status: "error",
      statusCode: 500,
      message: "Failed to fetch cart",
      data: {
        cartDetails: [],
        couponDiscount: 0,
        productDiscount: 0,
        totalPrice: 0,
        totalSaved: 0,
      },
    };
  }
};

export const deleteCartProduct = async (cartId: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/cart/${cartId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete item from cart");
    revalidatePath("/cart");
    return await res.json();
  } catch (error) {
    console.error("Delete failed:", error);
    return null;
  }
};

export const addToCart = async (product: {
  productRef: string;
  quantity?: number;
  userRef: string | undefined;
  inventoryRef?: string | null;
}) => {
  const res = await apiRequest<{
    status: string;
    message?: string;
    statusCode?: number;
    data?: unknown;
  }>({
    endpoint: "/cart",
    method: "POST",
    body: product,
  });
  if (res?.status === "error") {
    throw new Error(res?.message || "Failed to add product to cart");
  }
  revalidatePath("/");
  return res;
};
