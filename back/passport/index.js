const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 쿠키랑 이어줄 id만 저장
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user 안에 넣어줌
    } catch (error) {
      console.log(error);
      done(error);
    }
  });

  local();
};