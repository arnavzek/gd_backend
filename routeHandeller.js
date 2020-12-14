const router = require('express').Router();

// Route Includes
const users = require('./routes/users');
const signup = require('./routes/signup');
const login = require('./routes/login');
const getCurrentUser = require('./routes/getCurrentUser');

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
router.use('/getCurrentUser', getCurrentUser);

module.exports = router;
