import clientPromise from "@/lib/mongodb";

export async function getSearchedItem(searchTerm) {
  client = await clientPromise;
  const db = client.db("furniture-shop");

  const searchRegex = new RegExp(searchTerm, "i");

  // Find the product where name, description, or subtitle matches the searchTerm
  const products = await db.collection("products").findOne({
    $or: [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { subtitle: { $regex: searchRegex } },
    ],
  });

  console.log(products);
  return products;
}
