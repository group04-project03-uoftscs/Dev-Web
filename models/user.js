const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, uniquie: true },
  password: { type: String },
  github: { type: Object, unique: true },
  auth: { type: String},
  location: { type: String },
  languages: { type: String },
  firstTime: {type: Boolean, default: true},
  favorites : { type : Array }
});

const User = mongoose.model("User", userSchema);

module.exports = User;