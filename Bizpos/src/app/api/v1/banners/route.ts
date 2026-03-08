import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "success",
    statusCode: 200,
    message: "Banners fetched successfully",
    data: [],
  });
}
