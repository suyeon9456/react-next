const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const exEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if(exEmail) {
      return res.status(403).send('이 email은 사용할 수 없습니다.');
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

module.exports = router;