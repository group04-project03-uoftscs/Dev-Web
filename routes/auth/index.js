const router = require('express').Router();
const githubRoutes = require('./githubRoutes');
const googleRoutes = require('./googleRoutes');

router.use('/github', githubRoutes);
router.use('/google', googleRoutes);

module.exports = router;