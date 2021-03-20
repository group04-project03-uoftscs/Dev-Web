const express = require("express");
const cors = require('cors');
const session = require('express-session');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const mongoose = require("mongoose");
const GithubStrategy = require('passport-github2').Strategy;

// Passport
const passport = require('./config/passport');
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'Klee was here', resave: true, saveUninitialized: true }));
app.use(cors());
app.use(passport.initialize())
app.use(passport.session());

let userData = {}
// This is the github link strategy
// Also make sure to add the clientID and secret to a .env file once the app is in production
passport.use(new GithubStrategy({
  clientID: "d80a400b6a707075e0b2",
  clientSecret: "71db6e6e0e5bf807ebcda7323a67c447cdcfc5ef",
  callbackURL: "/auth/github/callback"
},
(accessToken, refreshToken, profile, done) => {
  userData = {...profile}
  return done(null, profile)
}
));

app.get('/user', (req,res) => {
  console.log(userData);
  console.log(req.user);
  res.send(userData);
})

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/debwebDB");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;