const express = require('express');
const { Post, Comment, Image, User } = require('../models');

const { isLoggedIn } = require('./middlewares');

const router = express.Router();
router.post('/', isLoggedIn, async (req, res, next) => {
  console.log('req.body::::', req.body);
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Comment,
      }, {
        model: Image,
      }, {
        model: User,
      }]
    })
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  console.log('req.body::::', req.body);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if(!post) {
      res.status(403).send('해당 게시물이 존재하지 않습니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id
    });

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;