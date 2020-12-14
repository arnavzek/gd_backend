const router = require('express').Router();

const { getCurrentUser } = require('../controllers/getCurrentUser');

router.route('/').get(getCurrentUser);

module.exports = router;
