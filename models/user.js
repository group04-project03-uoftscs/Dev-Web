const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String },
  github: { type: String, unique: true },
  auth: { type: String},
  location: { type: String },
  languages: { type: String },
  favorites : { type : Array }

});

const User = mongoose.model("User", userSchema);

module.exports = User;