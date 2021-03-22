const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router
  .route("/:user")
  .get(userController.findUser)
  .post(userController.saveFavorite)
  .patch(userController.removeFavorite)
  .put(userController.updateUser)
  .put(userController.getLocalUserUpdate)

module.exports = router;
