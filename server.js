const express = require("express");
const cors = require('cors');
const session = require('express-session');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const mongoose = require("mongoose");

// Passport
const passport = require('./config/passport');
// const passport = require('passport');
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'Klee was here', resave: true, saveUninitialized: true }));
app.use(cors());
app.use(passport.initialize())
app.use(passport.session());

// Passport Github
passport.serializeUser((user, cb)=> {
  cb(null,user);
});
passport.deserializeUser((user,cb) => {
  cb(null,user);
})
// This user will be stored to store the use
let user = {};

// This is the github link strategy
const GithubStrategy = require('passport-github2').Strategy;
passport.use(new GithubStrategy({
    clientID: "d80a400b6a707075e0b2",
    clientSecret: "71db6e6e0e5bf807ebcda7323a67c447cdcfc5ef",
    callbackURL: "/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    user = {...profile}
    return done(null, profile)
  }
));
// app.get('/github', passport.authenticate('github', {scope: ['user:email']}));

// app.all('/*', (req,res,next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// })

// app.get('/github/callback', 
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:3000');
//   });

app.get('/user', (req,res) => {
  res.send(user);
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
