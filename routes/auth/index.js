const router = require('express').Router();
const githubRoutes = require('./githubRoutes');

router.use('/github', githubRoutes);

module.exports = router;