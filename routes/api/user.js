const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/posts"
router
  .route("/:user")
  .get(userController.findUser)
  .post(userController.saveFavorite)
  .patch(userController.removeFavorite)

module.exports = router;
