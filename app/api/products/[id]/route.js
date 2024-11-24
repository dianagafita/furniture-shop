import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    // Await params to access the `id` property
    const { params } = context;
    const { id } = await params;

    console.log("Product ID:", id);

    const client = await clientPromise;
    const db = client.db("furniture-store");

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    console.log(product);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/products/[id]:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
