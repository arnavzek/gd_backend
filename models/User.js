const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.statics.findByUsername = async function (username) {
  const user = await this.findOne({ username });
  if (!user) return;
  return { username: user.username, password: user.password };
};

module.exports = mongoose.model('User', userSchema);
