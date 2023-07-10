const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  // Other user fields...
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }

  const saltRounds = 10;
  this.passwordHash = bcrypt.hashSync(this.passwordHash, saltRounds);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
