import { NextRequest, NextResponse } from "next/server";
import { getStorefrontProducts, queryParams } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = queryParams.parsePositiveInt(url.searchParams.get("page"), 1);
    const perPage = queryParams.parsePositiveInt(
      url.searchParams.get("limit"),
      20
    );
    const categorySlug = url.searchParams.get("categorySlug");

    const data = await getStorefrontProducts({
      page,
      perPage,
      categorySlug,
      search: url.searchParams.get("search"),
    });

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Products fetched successfully",
      data,
    });
  } catch (error) {
    console.error("GET /api/v1/product/pagination failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
