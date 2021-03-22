const router = require('express').Router();
const controller = require('../../controllers/userController');

router
  .route('/signup')
  .post(controller.addUser);

module.exports = router;