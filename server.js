const express = require("express");
const cors = require('cors');
const session = require('express-session');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

app.use(cookieParser())

// Passport
const {passport} = require('./config/passport');
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'Klee was here', resave: true, saveUninitialized: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser("Klee was here"))
app.use(passport.initialize())
app.use(passport.session());
app.use(passport.authenticate('remember-me'))


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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/debwebDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;