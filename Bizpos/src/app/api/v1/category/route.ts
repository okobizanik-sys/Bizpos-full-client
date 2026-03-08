import { NextResponse } from "next/server";
import { getNavbarCategories } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getNavbarCategories();
    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Categories fetched successfully",
      data,
    });
  } catch (error) {
    console.error("GET /api/v1/category failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
