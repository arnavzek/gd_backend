const router = require('express').Router();

const { login } = require('../controllers/login');

router
  .route('/')
  .get((req, res) => res.status(403).send('User Access Forbidden'))
  .post(login);

module.exports = router;
