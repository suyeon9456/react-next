const express = require('express');
const { Post, Comment, Image, User } = require('../models');

const { isLoggedIn } = require('./middlewares');

const router = express.Router();
router.post('/', isLoggedIn, async (req, res, next) => {
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
        model: User, // 작성자
      }, {
        model: User,
        as: 'Liker',
        attribute: ['id'],
      }]
    })
    res.status(201).json(fullPost);
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
      return res.status(403).send('해당 게시물이 존재하지 않습니다.');
    }
    const comment = await Comment.create({
      content: req.body.comment,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id
    });

    const allComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attribute: ['id', 'nickname'],
      }]
    });

    res.status(201).json(allComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    console.log(req.params.postId);
    if(!post) {
      return res.status(403).send('해당 게시물이 존재하지 않습니다.');
    }
    await post.addLiker(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  console.log('들어옴>>');
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    if(!post) {
      return res.status(403).send('해당 게시물이 존재하지 않습니다.');
    }
    await post.removeLiker(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;