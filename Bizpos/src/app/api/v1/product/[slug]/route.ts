import { NextResponse } from "next/server";
import { getStorefrontProductBySlug } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getStorefrontProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { status: "error", statusCode: 404, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("GET /api/v1/product/[slug] failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
