const router = require("express").Router();
const dataRoutes = require("./thirdPartyApi");
const userRoutes = require("./user");

// API routes
router.use("/user", userRoutes); // API calls related to the user database
router.use("/thirdparty", dataRoutes); // third party api calls

module.exports = router;
