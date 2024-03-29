const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Post, User, Image, Comment } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const where = {}
    console.log('??', !!parseInt(req.query.lastId, 10));
    if(parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      // offset 은 잘 사용하지 않음
      // 보통 lastId 를 사용함
      order: [['createdAt', 'DESC']],
      include: [{
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
    console.log(error);
    next(error);
  }
});

module.exports = router;