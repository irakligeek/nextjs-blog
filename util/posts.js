import getMongoDbClient from "./mongodb";
import { ObjectId } from "mongodb";

export async function getPosts() {
  const client = await getMongoDbClient();
  const db = client.db();
  const collection = db.collection("posts");
  const posts = await collection.find().toArray();

  const postsSorted = posts.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });

  client.close();

  return postsSorted;
}

export async function getPost(id) {
  const client = await getMongoDbClient();
  const db = client.db();
  const collection = db.collection("posts");
  const post = await collection.findOne({ _id: new ObjectId(id) });
  client.close();
  return post;
}

export async function getPostIds() {
  const client = await getMongoDbClient();
  const db = client.db();
  const collection = db.collection("posts");
  const data = await collection.find({}, { _id: 1 }).toArray();
  client.close();
  return data;
}
