const router = require('express').Router();
const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/users', userRoutes);
router.use('/job', jobRoutes);
router.use('/calendar', eventRoutes);

module.exports = router;
