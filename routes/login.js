const router = require('express').Router();

const { login } = require('../controllers/login');
const AppError = require('../utils/AppError');

router
  .route('/')
  .get(() => {
    throw new AppError(403, 'Access Forbidden');
  })
  .post(login);

module.exports = router;
