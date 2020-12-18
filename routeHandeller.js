const router = require('express').Router();

// Route Includes
const users = require('./routes/users');
const signup = require('./routes/signup');
const login = require('./routes/login');

// Home Route
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    'API Version': '1',
  });
});

router.use('/users', users);
router.use('/signup', signup);
router.use('/login', login);

module.exports = router;
