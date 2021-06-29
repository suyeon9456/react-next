const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');
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
  console.log('??', req.body);
  passport.authenticate('local', (err, user, info) => {
    console.log('?????????', err);
    if(err) {
      console.log('err: ', err);
      return next(err);
    }
    if(info) {
      console.log('info', info);
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => { // 진짜 로그인하는 (우리서비스의 로그인이 끝나고 passport에서 로그인)
      if(loginErr) {
        return next(loginErr);
      }
      // res.setHeader('Cookie', 무작위 토큰)
      const userWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },  
        include: [{
          model: Post
        }, {
          model: User,
          as: 'Followings'
        }, {
          model: User,
          as: 'Followers'
        }]
      });
      return res.status(200).json(userWithoutPassword);
    })
  })(req, res, next)
});

router.post('/logout', (req, res, next) => {
  console.log(req.user);
  req.logout();
  req.session.destroy(); //세션에 저장된 쿠키와 아이디 삭제
  res.send('ok');
});
module.exports = router;