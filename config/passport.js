const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');

const db = require('../models');


passport.use(new LocalStrategy(
  (username,password, done) => {
    db.User.findOne({username: username}, (err, user) => {
      if(err) throw err;
      if(!user) return done(null,false, {message: 'Incorrect user'})
      bcrypt.compare(password, user.password, (err,result) => {
        if(err) throw err;
        if(result === true) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Incorrect password'})
        }
      })
    })
  })
);

// This is the github link strategy
// Also make sure to add the clientID and secret to a .env file once the app is in production
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "https://dev-web3.herokuapp.com/auth/github/callback"
},
(accessToken, refreshToken, profile, done) => {
  userData = {
    auth: 'github'
  }
  return done(null, profile);
}
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    return done(null, profile);
  }
))

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  let userInformation;
  if(obj.hasOwnProperty('provider')) {
    userInformation = {
      user: {...obj},
      auth: obj.provider
    }
  } else {
    userInformation = {
      user: {
        username: obj.username
      },
      auth: 'local'
    }
  }
  cb(null, userInformation);
});


//exporting both passport and user
//user will be used to store the github data
module.exports = passport;