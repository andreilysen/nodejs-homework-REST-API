const Mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.URI_DB;

const db = Mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

Mongoose.connection.on("error", (err) => {
  console.log(`Connection error ${err.message}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await Mongoose.connection.close();
  console.log("Connection to DB closed");
  process.exit();
});

module.exports = db;
