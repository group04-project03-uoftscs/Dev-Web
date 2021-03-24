const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true},
  password: { type: String },
  github: { type: Object },
  auth: { type: String},
  location: { type: String },
  languages: { type: String },
  firstTime: {type: Boolean, default: true},
  favorites : { type : Array }
});

const User = mongoose.model("User", userSchema);

module.exports = User;