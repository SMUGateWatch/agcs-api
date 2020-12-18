const express = require('express')
const { MongoClient } = require("mongodb");
const db_uri = process.env.MONGODB_URI;
const client = new MongoClient(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


async function createListing(client, newListing) {
    const result = await client
      .db("vehicle-registry")
      .collection("employee-registry")
      .insertOne(newListing);
    console.log(
      `New listing created with the following id: ${result.insertedId}`
    );
  }
  async function main() {
    try {
      // Connect to the MongoDB cluster
      client.isConnected()
        ? console.log("Server successfully connected to the database")
        : console.log("Server can't connect to server");
      await createListing(client, {
        message: "Connect to Database. Success",
      });
    } catch (e) {
      console.error(e);
    } 
  }
  main().catch(console.error);

//IOT
app.post("/verify-id", function (req,res){
   res.status(200).json({message:"HELLO!"})
    
})
app.post("/gate-status", function (req,res){
    const data = req.body
    
})

//MONITOR
app.get("gate-status", function (req,res){
    const data = req.body
    
})

app.post("/sendTraffic")
app.get("/trafficData")
app.get("/", function (req,res){
    res.render("index");
})
module.exports = app