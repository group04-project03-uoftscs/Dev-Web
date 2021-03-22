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
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    if(err) throw err;
    if(!user) res.send('Incorrect login information');
    else {
      req.logIn(user, err => {
        if(err) throw err;
        res.send('Successfully authenticated')
        console.log(req.user)
      });
    }
  })(req,res,next)
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

module.exports = router;
