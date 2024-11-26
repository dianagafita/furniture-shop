import { uploadImage } from "@/lib/cloudinary";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("furniture-store");

    // Fetch all products from the "products" collection
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/products:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Parse FormData
    const formData = await req.formData();
    const name = formData.get("name");
    const type = formData.get("type");
    const description = formData.get("type");
    const subtitle = formData.get("type");
    const price = formData.get("price");
    const images = formData.getAll("images"); // Use getAll for multiple files

    // Log the data for debugging
    console.log("Received Data:", { images });

    if (!name || !price || images.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Process all images
    const imageUrls = [];
    for (let image of images) {
      const imgUrl = await uploadImage(image); // Assuming uploadImage handles the upload and returns a URL
      imageUrls.push(imgUrl);
    }

    console.log("Image URLs:", imageUrls);

    const client = await clientPromise;
    const db = client.db("furniture-store");

    // Insert the product into MongoDB
    const newProduct = {
      name,
      price: parseFloat(price),
      sold: false,
      type: type,
      subtitle,
      description,
      images: imageUrls, // Store an array of image URLs
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/products:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id } = await req.json(); // Parse the request body to get the product ID
    console.log("ID", id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("furniture-store");

    const result = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) }, // Find the product by ObjectId
      { $set: { sold: true } }, // Update the `sold` field to true
      { returnDocument: "after" } // Return the updated document
    );

    console.log(result);

    return NextResponse.json(
      { success: true, message: "Product marked as sold" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/products:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
