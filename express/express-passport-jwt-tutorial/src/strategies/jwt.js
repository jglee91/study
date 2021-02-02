const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret123',
};

module.exports = new JwtStrategy(option, (payload, done) => {
  if (payload.email === 'jglee@gmail.com') {
    return done(null, true);
  }
  return done(null, false, { message: 'Auth Failed!!!!' });
});
