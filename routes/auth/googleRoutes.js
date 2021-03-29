const router = require('express').Router();
const passport = require('../../config/passport');

// router
//   .route('/')
//   .get(passport.authenticate('google', { scope: ['profile']}))

// router.get('/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:3000/login'}), (req, res) => {
//   res.redirect('http://localhost:3000');
// })

router
  .route('/')
  .get(passport.authenticate('google', { scope: ["profile", "email"]}))

// router.get('/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:3000/login'}), (req, res) => {
//   res.redirect('http://localhost:3000');
// })

router 
  .route('/callback')
  .get(passport.authenticate('google', {failureRedirect: 'https://dev-web3.herokuapp.com/'}),
  (req,res) => {
    res.redirect('https://dev-web3.herokuapp.com/')
  })

module.exports = router;