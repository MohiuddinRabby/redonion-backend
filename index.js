const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const port = process.env.PORT || 3010;
// middlewares
//use cors
app.use(cors());
//use body-parser
app.use(bodyParser.json());

const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

//get data from mongo
app.get("/foods", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("foodItems");
    // perform actions on the collection object
    collection.find().toArray(
      //callback
      (err, documents) => {
        if (err) {
          console.log(err);
        } else {
          res.send(documents);
        }
      }
    );
    client.close();
  });
});
//find product according to key
app.get("/food/:keys", (req, res) => {
  const keys = req.params.keys;
  //
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("foodItems");
    // perform actions on the collection object
    collection.find({ keys }).toArray((err, documents) => {
      if (err) {
        console.log("error", err);
      } else {
        res.send(documents[0]);
      }
    });
    client.close();
  });
});
//port calling
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
