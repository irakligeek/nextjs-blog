// POST /api/submit-post

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://"+ process.env.DB_USER +":"+ process.env.DB_PASS +"@cluster0.vedjmun.mongodb.net/blog-posts?retryWrites=true&w=majority"
    );

    const db = client.db();

    const collection = db.collection("posts");
    const result = await collection.insertOne(data);
    client.close();

    res.status(201).json({ message: "Success! Post added.", status: 200 });
  }
}
