const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// jwt stuff
const jwt = require('jsonwebtoken');

// passport stuff
const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');
passport.use(jwtStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello express server');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'jglee@gmail.com') {
    if (password === 'pwd') {
      const token = jwt.sign({ email }, 'secret123', { expiresIn: '1h' });

      return res.status(200).json({ token });
    }
  }

  return res.status(401).json({ message: 'Auth Failed!' });
});

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.status(200).send('YAY! This is a protected Route!');
  }
);

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(3000);
