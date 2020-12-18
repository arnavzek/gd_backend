const router = require('express').Router();

const { signup } = require('../controllers/signup');
const AppError = require('../utils/AppError');

router
  .route('/')
  .get(() => {
    throw new AppError(403, 'Access Forbidden');
  })
  .post(signup);

module.exports = router;
