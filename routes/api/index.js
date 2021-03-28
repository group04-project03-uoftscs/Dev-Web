const router = require("express").Router();
const dataRoutes = require("./thirdPartyApi");
const userRoutes = require("./user");
const githubRoutes = require('./githubRoutes');
const googleRoutes = require('./googleRoutes');

// API routes
router.use("/user", userRoutes); // API calls related to the user database
router.use("/thirdparty", dataRoutes); // third party api calls
router.use("/github", githubRoutes); // Modify the database based on github
router.use("/google", googleRoutes); // Modify the database based on google

module.exports = router;
