// POST /api/get-post
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://ika0501:oRLoQkhB86oonMML@cluster0.vedjmun.mongodb.net/blog-posts?retryWrites=true&w=majority"
    );

    const db = client.db();
    const collection = db.collection("posts");
    const posts = await collection.find().toArray();
    client.close();

    res.json({ message: "Posts retrieved.", status: 200, data: posts });
  }
}
