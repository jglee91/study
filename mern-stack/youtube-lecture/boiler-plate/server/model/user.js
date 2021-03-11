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

userSchema.pre('save', function (done) {
  const user = this;
  const saltRounds = 10;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return done(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return done(err);
        user.password = hash;
        done();
      });
    });
  } else {
    done();
  }
});

userSchema.methods.comparePassword = function (plain, done) {
  const user = this;

  bcrypt.compare(plain, user.password, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
};

userSchema.methods.generateToken = function (done) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), 'secret');

  user.token = token;
  user.save((err, user) => {
    if (err) return done(err);
    done(null, user);
  });
};

userSchema.statics.findByToken = function (token, done) {
  const user = this;

  jwt.verify(token, 'secret', function (err, decode) {
    user.findOne({ _id: decode, token }, function (err, user) {
      if (err) return done(err);
      done(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
