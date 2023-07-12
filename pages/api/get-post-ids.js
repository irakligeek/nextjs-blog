// POST /api/get-post-ids
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://ika0501:oRLoQkhB86oonMML@cluster0.vedjmun.mongodb.net/blog-posts?retryWrites=true&w=majority"
    );

    const db = client.db();
    const collection = db.collection("posts");
    const data = await collection.find({}, { _id: 1 }).toArray();
    client.close();

    res.json({ message: "Ids retrieved succesfully.", status: 200, data: data });
  }
}
