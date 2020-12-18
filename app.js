const express = require('express')
const { MongoClient } = require("mongodb");
const db_uri = process.env.MONGODB_URI;

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const client = new MongoClient(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createListing(newListing) {
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
      await client.connect()
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
  async function createTrafficData(trafficData) {
    await client.connect()
    const database = await client.db("agcs");
    const result = false;
    if (classType == "STUDENT")
      res = await database.collection("students").insertOne(trafficData);
    res.insertedId
      ? (result = true)
      : console.log("Theres a problem witht he query");
    if (classType == "EMPLOYEE")
      res = await database.collection("employee").insertOne(trafficData);
    res.insertedId
      ? (result = true)
      : console.log("Theres a problem witht he query");
    return result;
  }
  async function verifyId(uid) {
    
    const result = false;
    try {
      await client.connect()
      const database = await client.db("agcs");
      const employee = await database
        .collection("employee")
        .findOne({ UID: uid });
      const student = await database.collection("students").findOne({ UID: uid });
      if (employee || student) result = true;
    } catch (e) {
      console.error(e);
    }
  
    return result;
  }
//IOT
app.post("/verify-id", async function (req,res){
    const id = req.body.idScanned
    console.log(id)
    const result = await verifyId(id)
    if (result) res.status(200).json({data:"verified"})
    if (!result) res.status(200).json({data:"not verified"})
    
})
app.post("/gate-status", function (req,res){
    const data = req.body
    
})

//MONITOR
app.get("gate-status", function (req,res){
    const data = req.body
    
})

app.get("/test", (req,res)=>{
    res.status(200).json({message: "HELLO"})
})
app.get("/trafficData")
app.post("/sendTraffic")
app.get("/", function (req,res){
    res.render("index");

})
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
module.exports = app