const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

// const AppError = require('../utils/errorHandeller');

exports.login = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Check if exists
    if (!username || !password)
      throw new AppError(400, 'Please Provide All Required Fields');

    // Check if valid
    if (typeof username !== 'string' || typeof password !== 'string')
      throw new AppError(400, 'Please Enter Valid Values');

    const user = await User.findByUsername(username);

    if (!user) throw new AppError(404, "User Doesn't Exist");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new AppError(400, 'Wrong Password');

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.status(200).json({ username, token });
  } catch (err) {
    next(err);
  }
};
