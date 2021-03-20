const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true},
  password: { type: String },
  github: { type: Object, unique: true },
  auth: { type: String},
  location: { type: String },
  languages: { type: String },
  favorites : { type : Array }
});

const User = mongoose.model("User", userSchema);

module.exports = User;