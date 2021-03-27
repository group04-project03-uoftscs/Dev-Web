const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, uniquie: true },
  password: { type: String },
  github: { type: Object },
  google: {type: Object},
  auth: { type: String},
  location: { type: String },
  languages: { type: Array, default: [] },
  firstTime: {type: Boolean, default: true},
  favorites : { type : Array }
});

const User = mongoose.model("User", userSchema);

module.exports = User;