const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  github: { type: String, required: true },
  favorites : { type : Array }

});

const User = mongoose.model("User", userSchema);

module.exports = User;