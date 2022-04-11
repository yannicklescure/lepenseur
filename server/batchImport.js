// const res = require("express/lib/response");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const companies = require("./data/companies.json");
// const items = require("./data/items.json");

// Note: password is 123456789
const users = [
  {
    _id: uuidv4(),
    firstName: "john",
    lastName: "doe",
    userName: "johndoe",
    email: "johndoe@email.com",
    password: "$2b$10$1NfBT6sxOjooRZHgXAomjeEJjDvZnl6JIy329zaFXUIAUppKQ6PI.",
    cart: [],
    imageSrc: "undefined",
  },
  {
    _id: uuidv4(),
    firstName: "john",
    lastName: "rambo",
    userName: "johnrambo",
    email: "johnrambo@email.com",
    password: "$2b$10$1NfBT6sxOjooRZHgXAomjeEJjDvZnl6JIy329zaFXUIAUppKQ6PI.",
    cart: [],
    imageSrc: "undefined",
  },
  {
    _id: uuidv4(),
    firstName: "marty",
    lastName: "mcfly",
    userName: "martymcfly",
    email: "martymcfly@email.com",
    password: "$2b$10$1NfBT6sxOjooRZHgXAomjeEJjDvZnl6JIy329zaFXUIAUppKQ6PI.",
    cart: [],
    imageSrc: "undefined",
  },
];

const batchImport = async () => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(DB_NAME);
    console.log("connected!");

    // const result1 = await db.collection("companies").insertMany(companies);
    // console.log(result1);
    // const result2 = await db.collection("items").insertMany(items);
    // console.log(result2);

    const result = await db.collection("users").insertMany(users);
    console.log(result);

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err);
  }
};

batchImport();
