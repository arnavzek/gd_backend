const router = require('express').Router();

const { signup } = require('../controllers/signup');

router
  .route('/')
  .get((req, res) => res.status(403).send('User Access Forbidden'))
  .post(signup);

module.exports = router;
