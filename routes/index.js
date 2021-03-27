const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");
const userRoutes = require('./user');
const {passport} = require('../config/passport');
const utils = require('../config/utils');
const Token = require('../config/token');

const {tokens} = require('../config/passport');

// API Routes
router.use("/api", apiRoutes);

// Auth Routes
router.use("/auth", authRoutes);

// Login and signup Routes
router.use('/user', userRoutes);
router.post('/user/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    if(!req.body.remember_me) {
      if(err) throw err;
      if(!user) res.send('Incorrect login information');
      else {
        req.logIn(user, err => {
          if(err) throw err;
          res.send('Successfully authenticated')
          // console.log('this is the first req ', req)
          // console.log('this is the first res ', res)
          console.log('this is the user ', user)
        });
      }
    } else {
      if(err) throw err;
      if(!user) res.send('Incorrect login information');
      else {
        let token = utils.generateToken(64);
          console.log('this is req ',req.user);
          console.log('this is the user', user) 
          console.log('there is a username', typeof user)
          console.log('this is the username ', user.username)
          Token.issueToken(tokens, token, user.username, (err) => {
            if(err) {return done(err);}
            res.cookie('remember_me', token, {path: '/', httpOnly: true, maxAge: 604800000}) // Token will only last 7 days
          })
        req.logIn(user, err => {
          if(err) throw err;
          res.send('Successfully authenticated')
          console.log('this is the ',req.user)
          console.log('user', user)
        });
      }
    }
  })(req,res,next)
});

router.get('/user', (req, res) => {
  console.log(req.isAuthenticated())
  console.log(req.user)
  res.send(req.user);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

module.exports = router;
