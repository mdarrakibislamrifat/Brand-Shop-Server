const express = require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


// rifat43
// ggNnjhmr1RAfQ3iG



const uri = "mongodb+srv://rifat43:ggNnjhmr1RAfQ3iG@cluster0.d0x6rpk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database=client.db('brandShopDB').collection('shopData')

    app.post('/products',async(req,res)=>{
        const newProducts=req.body;
        const result=await database.insertOne(newProducts)
        res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Brand Shop Server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})