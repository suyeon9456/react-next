const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');

router.post('/', async (req, res, next) => {
  try {
    const exEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if(exEmail) {
      return res.status(403).send('사용중인 email 입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // 숫자가 높을수록 보안이 높으나 속도가 느림
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname
    });
    res.send('ok');
  } catch (e) {
    console.log(e);
    next(e); // 서버에러니까 500
  }
});

router.post('/login', (req, res, next) => {
  console.log('??');
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.log('err: ', err);
      return next(err);
    }
    if(info) {

      console.log(info);
      return res.status(403).send(info.reason);
    }
    return req.login(user, (loginErr) => { // 진짜 로그인하는 (우리서비스의 로그인이 끝나고 passport에서 로그인)
      if(loginErr) {
        console.log('loginErr: ', loginErr);
        return next(loginErr);
      }
      return res.json(user);
    })
  })(req, res, next)
})
module.exports = router;