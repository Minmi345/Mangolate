
import { MongoClient, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export const dbClient = client;

export default async function run() {
  try {
    // Send a ping to confirm a successful connection
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Mangolate' 
    });
    console.log("Mongoose connected to MongoDB");
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
  } finally {
    // Ensures that the client will close when you finish/error
    // console.log("session was closed just now")
    // await client.close()
  }
}
run().catch(console.dir)
