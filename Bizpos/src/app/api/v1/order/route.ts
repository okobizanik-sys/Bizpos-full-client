import { NextResponse } from "next/server";
import { createStorefrontOrder } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createStorefrontOrder(body);

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Order created successfully",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        statusCode: 400,
        message: error?.message || "Failed to create order",
      },
      { status: 400 }
    );
  }
}
