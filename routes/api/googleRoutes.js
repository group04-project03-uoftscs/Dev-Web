const router = require('express').Router();
const userController = require("../../controllers/userController");

router
  .route('/:user')
  .get(userController.findGoogleUser)

router
  .route('/add')
  .post(userController.addNonLocalUser);

module.exports = router;