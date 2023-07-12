// POST /api/submit-post

import { MongoClient, ObjectId } from "mongodb";
import revalidatePath from "../../util/revalidate";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://" +
        process.env.DB_USER +
        ":" +
        process.env.DB_PASS +
        "@cluster0.vedjmun.mongodb.net/blog-posts?retryWrites=true&w=majority"
    );

    const db = client.db();

    const collection = db.collection("posts");
    const result = await collection.insertOne(data);
    const insertedId = result.insertedId.toString();

    client.close();

    //Revalidate home page and blog post page
    const revalidateHp = await revalidatePath({
      host: req.body.host,
      path: "/",
    });
  
    //@todo this doesn't work ...
    try{
      const revalidatePost = await revalidatePath({
        host: req.body.host,
        path: "/posts/"+insertedId,
      });
    } catch (err ) {
        console.log("error occured: ", err);
    }
  

    res.status(201).json({ message: "Success! Post added.", status: 200 });
  }
}
