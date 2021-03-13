const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/debwebDB");

// To be changed

// const Seed = [
  
// ];

// db.Post.remove({})
//   .then(() => db.User.collection.insertMany(Seed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
