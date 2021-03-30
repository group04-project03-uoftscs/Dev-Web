const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/debwebDB");

const userSeed = [
  {
    username: "username",
    password: "password",
    github: {},
    email: "username@email.com",
    languages: ['cplusplus','html5','react'],
    favorites: [],
    auth: "local"
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
