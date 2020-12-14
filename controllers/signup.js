const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Err = require('../utils/errorHandeller');
const Res = require('../utils/response');

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const plainPassword = req.body.password;

  let user;

  // Check if data exists
  if (!name || !email || !plainPassword || !username)
    return res.status(400).json(new Err(400, 'Please provide all required fields').err);

  // Check if data is valid
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof username !== 'string' ||
    typeof plainPassword !== 'string'
  )
    return res.status(400).json(new Err(400, 'Please provide valid data').err);

  // Check if the username already exists
  user = await User.findOne({ username: username });

  if (user) return res.status(400).json(new Err(400, 'Username already exists'));

  // Check if the email already exists
  user = await User.findOne({ email: email });

  if (user) return res.status(400).json(new Err(400, 'Email already exists'));

  try {
    // Encrypt Password
    const password = await bcrypt.hash(plainPassword, 10);

    const userData = {
      name,
      email,
      username,
      password,
    };

    // Save user in database
    user = await User.create(userData);

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.cookie('currentUser', user.username, { httpOnly: true });
    return res.status(200).json(new Res(200, null, { token, username: user.username }).res);
  } catch (err) {
    console.log(err);
    return res.status(500).json(new Err(500, 'Internal Server Error'));
  }
};
