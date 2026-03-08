import { NextResponse } from "next/server";
import { removeStorefrontCartItem } from "@/services/storefront";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;
    const deleted = await removeStorefrontCartItem(Number(cartId));

    if (!deleted) {
      return NextResponse.json(
        { status: "error", statusCode: 404, message: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Cart item deleted",
      data: null,
    });
  } catch (error) {
    console.error("DELETE /api/v1/cart/[cartId] failed", error);
    return NextResponse.json(
      { status: "error", statusCode: 500, message: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}
