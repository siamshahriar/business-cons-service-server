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
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const allServices = client
      .db("BusinessConsultant")
      .collection("servicesNames");
    const reviews = client.db("BusinessConsultant").collection("reviews");

    //it will give all the services
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = allServices.find(query);
      if (req.query.limit) {
        const services = await cursor.limit(3).toArray();
        res.send(services);
      } else {
        const services = await cursor.toArray();
        res.send(services);
      }
    });

    //it will give specific service details
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await allServices.findOne(query);
      res.send(service);
    });

    //it will give category based reviews
    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category: id };
      const cataReviews = await reviews.find(query).toArray();
      res.send(cataReviews);
    });
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
