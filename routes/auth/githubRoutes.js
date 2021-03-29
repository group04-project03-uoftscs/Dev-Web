const router = require('express').Router();
const passport = require('passport');

router
  .route('/')
  .get(passport.authenticate('github', {scope: ['user:email']}));

router
  .route('/callback')
  .get(passport.authenticate('github', {failureRedirect: 'http://localhost:3000/login'}),
  (req,res) => {
    res.redirect('http://localhost:3000')
  })

module.exports = router;