const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Err = require('../utils/errorHandeller');
const Res = require('../utils/response');

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if exists
  if (!username || !password)
    return res.status(400).json(new Err(400, 'Please Provide All Required Fields').err);

  // Check if valid
  if (typeof username !== 'string' || typeof password !== 'string')
    return res.status(400).json(new Err(400, 'Please Enter Valid Values').err);

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json(new Err(400, "Username Doesn't Exists").err);

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json(new Err(400, 'Wrong Password').err);

    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.cookie('currentUser', username, { httpOnly: true });
    res.status(200).json(new Res(200, null, { token, username }).res);
  } catch (err) {
    console.log(err);
    return res.status(500).json(new Err(500, 'Internal Server Error'));
  }
};
