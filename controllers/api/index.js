const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cartRoutes = require('./cartRoutes');
const checkoutRoutes = require('./checkoutRoutes');

router.use('/users', userRoutes);
router.use('/cart', cartRoutes);
router.use('/checkout', checkoutRoutes);

module.exports = router;