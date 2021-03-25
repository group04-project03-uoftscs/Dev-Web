const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router
  .route("/:user")
  .put(userController.getLocalUserUpdate)
  .get(userController.findUser)
  .post(userController.saveFavorite)
  .patch(userController.removeFavorite)
  .put(userController.updateUser)
  .delete(userController.removeUser)

module.exports = router;
