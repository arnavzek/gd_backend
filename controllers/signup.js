const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/AppError');

exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const plainPassword = req.body.password;

    let user;

    // ! TODO: Add check for username so that it doesn't contain whitespace or any character other than _, Numbers and Alphabets

    // Check if data exists
    if (!name || !email || !plainPassword || !username)
      throw new AppError(400, 'Please Fill All Required Fields');

    // Check if data is valid
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof username !== 'string' ||
      typeof plainPassword !== 'string'
    )
      throw new AppError(400, 'Invalid Values');

    // Check if the username already exists
    user = await User.findOne({ username: username });

    if (user) throw new AppError(400, 'Username Already Exists');

    // Check if the email already exists
    user = await User.findOne({ email: email });

    if (user) throw new AppError(400, 'Email Already Exists');
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

    return res.status(200).json({ ...user, token });
  } catch (err) {
    next(err);
  }
};
