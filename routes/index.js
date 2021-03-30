const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");
const userRoutes = require('./user');
const passport = require('../config/passport');

// API Routes
router.use("/api", apiRoutes);

// Auth Routes
router.use("/auth", authRoutes);

// Login and signup Routes
router.use('/user', userRoutes);
router.post('/user/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) throw err;
    if(!user) res.send('Incorrect login information');
    else {
      req.logIn(user, err => {
        if(err) throw err;
        res.send('Successfully authenticated')
      });
    }
  })(req,res,next)
});

router.get('/user', (req, res) => {
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
