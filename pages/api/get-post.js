// POST /api/get-post-ids
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {

    const {postid} = req.query;

  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://ika0501:oRLoQkhB86oonMML@cluster0.vedjmun.mongodb.net/blog-posts?retryWrites=true&w=majority"
    );

    const db = client.db();
    const collection = db.collection("posts");
    const post = await collection.findOne({ _id: new ObjectId( postid ) });
    client.close();

    res.status(200).json({ message: "Success!", data: post });

  }
}
