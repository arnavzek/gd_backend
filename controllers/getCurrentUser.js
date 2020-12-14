const jwt = require('jsonwebtoken');

const Err = require('../utils/errorHandeller');
const Res = require('../utils/response');

exports.getCurrentUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json(new Err(400, 'No Token').err);
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(new Res(200, null, { username: verify.username, token }).res);
  } catch (error) {
    res.cookie('currentUser', '');
    res.cookie('token', '');
    res.status(400).json(new Err(400, 'Inavlid JWT Token').err);
  }
};
