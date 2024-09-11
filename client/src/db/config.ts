import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://mochammadzulfikarervandi:XiJ61m4aQYeOxCuE@cluster0.4ceco.mongodb.net/0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbName = process.env.DB_NAME;
if (process.env.NODE_ENV === "test") dbName += "_test";

export const db = client.db(dbName);

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
