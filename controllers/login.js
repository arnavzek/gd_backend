const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if exists
  if (!username || !password) return res.status(400).send('Please provide all required fields');

  // Check if valid
  if (typeof username !== 'string' || typeof password !== 'string')
    return res.status(400).send('Please provide valid data');

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(400).send('User Not Found');

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).send('Wrong Password');

    const token = jwt.sign({ username }, 'secret');

    res.status(200).json({
      jwtToken: token,
    });
  } catch (err) {
    return res.status(500).send('Cannot Login - Server Error');
  }
};
