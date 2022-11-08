const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

// mongoDB section ================

//config
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dhw1j4v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//config

//paths

async function run() {
  try {
  } finally {
  }
}

run().catch((err) => console.log(err));

//paths

// mongoDB section ================

app.get("/", (req, res) => {
  res.send("Business consultant server is running");
});

app.listen(port, () => {
  console.log(` Business consultant  server running on ${port}`);
});
