const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', (done) => {
  const user = this;
  const saltRounds = 10;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return done(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return done(err);
        user.password = hash;
      });
    });
  } else {
    done();
  }
});

userSchema.methods.comparePassword = (plain, done) => {
  const user = this;

  bcrypt.compare(plain, user, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
};

userSchema.methods.generateToken = (done) => {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), 'secret');

  user.token = token;
  user.save((err, user) => {
    if (err) return done(err);
    done(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
