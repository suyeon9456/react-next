const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');
const { User, Post, Image, Comment } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const { route } = require('./post');

router.get('/', async (req, res, next) => {
  console.log('쿠키를 확인해보장: ', req.headers);
  try {
    if(req.user) {
      const user = await User.findOne({
        where: { id: req.user.id }
      });
      const userWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },  
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      });
      return res.status(200).json(userWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followings', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    const follwings = await user.getFollowings({ limit: parseInt(req.query.limit, 10) });
    res.status(200).json(follwings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followers', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    const follwers = await user.getFollowers({ limit: parseInt(req.query.limit, 10) });
    res.status(200).json(follwers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });
    const userWithoutPassword = await User.findOne({
      where: { id: user.id },
      attributes: {
        exclude: ['password']
      },  
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    });
    if (userWithoutPassword) {
      const data = userWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      return res.status(200).json(data);
    } else {
      return res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/posts/:userId', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include:[{
        model: User,
        attribute: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User,
        as: 'Liker',
        attribute: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }, {
          model: Image
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname']
          }]
        }, {
          model: User,
          as: 'Liker',
          attributes: ['id']
        }]
      }]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
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

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.log('err: ', err);
      return next(err);
    }
    if(info) {
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

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy(); //세션에 저장된 쿠키와 아이디 삭제
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname
    }, {
      where: { id: req.user.id }
    });
    res.json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/follow/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });

    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }

    await user.addFollowers(req.user.id);
    res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/unfollow/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });

    if (!user) {
      return res.status(404).send('존재하지 않는 사용자입니다.');
    }

    await user.removeFollowers(req.user.id);
    res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/follower/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });

    if (!user) {
      return res.status(404).send('존재하지 않는 사용자입니다.');
    }

    await user.removeFollowings(req.user.id);
    res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;