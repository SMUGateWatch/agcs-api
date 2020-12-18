const express = require("express");
const { MongoClient } = require("mongodb");
const db_uri = process.env.MONGODB_URI;

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//IOT
MongoClient.connect(
  db_uri,
  {
    useUnifiedTopology: true,
  }
).then((client) => {
  const db = client.db("agcs");

  app.post("/verify-id", async function (req, res) {
    const id = req.body.idScanned;
    console.log(id);
    const employee = db.collection("employee").findOne({ UID: uid });
    const student = db.collection("students").findOne({ UID: uid });
    if (employee || student)  res.status(200).json({ data: "verified" });

    if (!result || !student) res.status(200).json({ data: "not verified" });
  });
  app.post("/gate-status", function (req, res) {
    const data = req.body;
  });

  //MONITOR
  app.get("gate-status", function (req, res) {
    const data = req.body;
  });

  app.get("/test", (req, res) => {
    res.status(200).json({ message: "HELLO" });
  });
  app.get("/trafficData",(req,res)=>{});
  app.post("/sendTraffic",(req,res)=>{
      const data = req.body
    const result = false;
    if (classType == "STUDENT")
      res = database.collection("students").insertOne(data);
    res.insertedId
      ? (result = true)
      : console.log("Theres a problem witht he query");
    if (classType == "EMPLOYEE")
      res = database.collection("employee").insertOne(data);
    res.insertedId
      ? (result = true)
      : console.log("Theres a problem witht he query");
     if (result) console.log("traffic data sucessfull inserted");
  });
});

app.get("/", function (req, res) {
  res.render("index");
});
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
module.exports = app;
