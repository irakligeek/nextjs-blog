import { MongoClient } from "mongodb";


export default async function getMongoDbClient(){
    const client = await MongoClient.connect(
        "mongodb+srv://" +
          process.env.DB_USER +
          ":" +
          process.env.DB_PASS +
          "@cluster0.vedjmun.mongodb.net/blog-posts?retryWrites=true&w=majority"
      );

      return client;
  
}