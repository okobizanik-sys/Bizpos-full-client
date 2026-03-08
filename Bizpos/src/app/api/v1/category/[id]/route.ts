import { NextResponse } from "next/server";
import { getCategoryById } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await getCategoryById(Number(id));

    if (!category) {
      return NextResponse.json(
        { status: "error", statusCode: 404, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("GET /api/v1/category/[id] failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
