import { NextRequest, NextResponse } from "next/server";
import { getStorefrontProducts } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const data = await getStorefrontProducts({
      page: 1,
      perPage: 20,
      search: url.searchParams.get("search"),
    });

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Search completed",
      data: data.result,
    });
  } catch (error) {
    console.error("GET /api/v1/product/search failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Search failed" },
      { status: 500 }
    );
  }
}
