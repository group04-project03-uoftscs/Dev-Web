const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"

router
  .route("/")
  .get(userController.getAllGithubUsers)

router
  .route("/:user")
  .put(userController.getLocalUserUpdate)
  .get(userController.findUser)
  .post(userController.saveFavorite)
  .patch(userController.removeFavorite)

router
  .route("/update/:user")
  .put(userController.updateUser)

module.exports = router;
