const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const username = req.body.username;
  const plainPassword = req.body.password;

  let user;

  // Check if data exists
  if (!firstName || !lastName || !email || !plainPassword || !username)
    return res.status(400).send('Please provide all required fields');

  // Check if data is valid
  if (
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof email !== 'string' ||
    typeof username !== 'string' ||
    typeof plainPassword !== 'string'
  )
    return res.status(400).send('Please provide valid data');

  // Check if the username already exists
  user = await User.findOne({ username: username });

  if (user) return res.status(400).send('Username already exists');

  // Check if the email already exists
  user = await User.findOne({ email: email });

  if (user) return res.status(400).send('Email already exists');

  try {
    // Encrypt Password
    const password = await bcrypt.hash(plainPassword, 10);

    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    // Save user in database
    user = await User.create(userData);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("Can't Create User - Server Error");
  }
};
