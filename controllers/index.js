const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const successRoutes = require('./successRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/success', successRoutes);

module.exports = router;