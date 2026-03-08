import { NextRequest, NextResponse } from "next/server";
import { addToStorefrontCart, getStorefrontCart } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userRef = request.nextUrl.searchParams.get("userId") || "";
    if (!userRef) {
      return NextResponse.json({
        status: "success",
        statusCode: 200,
        message: "Cart fetched successfully",
        data: {
          cartDetails: [],
          couponDiscount: 0,
          productDiscount: 0,
          totalPrice: 0,
          totalSaved: 0,
          productRef: "",
          quantity: 0,
        },
      });
    }

    const data = await getStorefrontCart(userRef);
    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Cart fetched successfully",
      data,
    });
  } catch (error) {
    console.error("GET /api/v1/cart failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await addToStorefrontCart({
      userRef: String(body.userRef || ""),
      productRef: String(body.productRef || ""),
      quantity: Number(body.quantity || 1),
      inventoryRef: body.inventoryRef ? String(body.inventoryRef) : null,
    });

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Product added to cart",
      data: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        statusCode: 400,
        message: error?.message || "Failed to add product to cart",
      },
      { status: 400 }
    );
  }
}
