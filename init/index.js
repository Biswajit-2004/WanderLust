const mongoose = require("mongoose");
const sampledata = require("./sample.js");
const Listing = require("../models/listing.js");
const mongourl = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(mongourl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  sampledata.data = sampledata.data.map((obj) => ({
    ...obj,
    owner: "6acb8b3c645303f251a9c388",
  }));
  await Listing.insertMany(sampledata.data);
  console.log("Data is initialized");
};

initDB();
