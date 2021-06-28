const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    console.log('email?', email);
    console.log('password?', password);
    try {
      const user = await User.findOne({
        where: { email }
      });
      console.log('user: ', user);
      if(!user) {
        return done(null, false, { reason: '존재하지 않는 email입니다.' });
      }
  
      const result = await bcrypt.compare(password, user.password);
      console.log('result', result);
      if(result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 일치하지 않습니다.' });
    } catch (error) {
      console.log(error);
      done(error);
    }
  }));
};