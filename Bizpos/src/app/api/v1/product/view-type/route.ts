import { NextResponse } from "next/server";
import { getStorefrontProducts } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getStorefrontProducts({ page: 1, perPage: 12 });

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Products fetched successfully",
      data: {
        category: null,
        result: data.result,
      },
    });
  } catch (error) {
    console.error("GET /api/v1/product/view-type failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
