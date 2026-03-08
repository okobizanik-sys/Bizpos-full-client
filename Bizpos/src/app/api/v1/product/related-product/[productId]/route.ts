import { NextResponse } from "next/server";
import { getRelatedStorefrontProducts } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const data = await getRelatedStorefrontProducts(Number(productId));

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Related products fetched successfully",
      data,
    });
  } catch (error) {
    console.error("GET /api/v1/product/related-product/[productId] failed", error);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: "Failed to fetch related products",
      },
      { status: 500 }
    );
  }
}
