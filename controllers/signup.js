const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const username = req.body.username;
  const plainPassword = req.body.password;
  let password;

  // Check if exists
  if (!firstName || !lastName || !email || !plainPassword || !username)
    return res.status(400).send('Please provide all required fields');

  // Check if valid
  if (
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof email !== 'string' ||
    typeof username !== 'string' ||
    typeof plainPassword !== 'string'
  )
    return res.status(400).send('Please provide valid data');

  try {
    password = await bcrypt.hash(plainPassword, 10);
  } catch (err) {
    return res.status(500).send('Signup Error - Password');
  }

  const userData = {
    firstName,
    lastName,
    email,
    username,
    password,
  };

  try {
    const user = await User.create(userData);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("Can't Create User - Server Error");
  }
};
