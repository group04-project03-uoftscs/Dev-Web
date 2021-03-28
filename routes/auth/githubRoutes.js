const router = require('express').Router();
const passport = require('passport');

router
  .route('/')
  .get(passport.authenticate('github', {scope: ['user:email']}));

router
  .route('/callback')
  .get(passport.authenticate('github', {failureRedirect: '/login'}),
  (req,res) => {
    // res.redirect('http://localhost:3000')
    res.redirect('https://dev-web3.herokuapp.com/')
  })

module.exports = router;