const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Comment, Image, User, Hashtag } = require('../models');

const { isLoggedIn } = require('./middlewares');
const { create } = require('domain');

const router = express.Router();
try {
  fs.accessSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext) // 확장자를 제거한 file 이름만 추출
      done(null, basename + new Date().getTime() + ext); // file명 + 업로드 날짜 + 시간 + 확장자
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 } // 20mb
});

router.get('/:postId', async(req, res, next) => {
  console.log('postId: ', req.params.postId);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    console.log('post: ', post);

    if (!post) {
      return res.status(404).send('존재하지 않는 게시물입니다.');
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: User,
        as: 'Liker',
        attributes: ['id', 'nickname']
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: Image
      }, {
        model: User,
        as: 'Liker',
        attributes: ['id']
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
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    const hashtag = req.body.content.match(/(#[^\s#]+)/g);
    console.log('hashtag: ', hashtag);
    if (hashtag) {
      const result = await Promise.all(hashtag.map((v) => Hashtag.findOrCreate({
        where: { name: v.slice(1).toLowerCase() }
      })));
      // result = [[react, true], [node, true]]
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지가 여러개 일 경우에는 배열로 들어온다.
        const images = await Promise.all(req.body.image.map((path) => Image.create({ src: path })));
        await post.addImages(images);
      } else { // 이미지가 하나일 경우 그냥 일반 문자열이다.
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
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
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/:postId', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const exPost = await Post.findOne({
      where: { id: req.params.postId }
    });

    if (!exPost) {
      return res.status(403).send('해당 포스트는 존재하지 않는 포스트입니다.');
    }

    if (req.user && exPost.UserId !== req.user.id) {
      return res.status(403).send('해당 포스트를 수정할 권한이 없습니다.');
    }

    await Post.update({
      content: req.body.content
    }, {
      where: { id: exPost.id }
    });

    const hashtag = req.body.content.match(/(#[^\s#]+)/g);
    // console.log('hashtag: ', hashtag);
    if (hashtag) {
      const result = await Promise.all(hashtag.map((v) => Hashtag.findOrCreate({
        where: { name: v.slice(1).toLowerCase() }
      })));
      // result = [[react, true], [node, true]]
      await post.addHashtags(result.map((v) => v[0]));
    }
    // if (req.body.image) {
    //   if (Array.isArray(req.body.image)) { // 이미지가 여러개 일 경우에는 배열로 들어온다.
    //     const images = await Promise.all(req.body.image.map((path) => Image.create({ src: path })));
    //     await post.addImages(images);
    //   } else { // 이미지가 하나일 경우 그냥 일반 문자열이다.
    //     const image = await Image.create({ src: req.body.image });
    //     await post.addImages(image);
    //   }
    // }
    const fullPost = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Comment,
      }, {
        model: Image,
      }, {
        model: User, // 작성자
      }, {
        model: User,
        as: 'Liker',
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
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
        attributes: ['id', 'nickname'],
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

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId,
        UserId: req.user.id
      }
    });
    res.json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files) //  이미 업로드 된 상태
  res.status(200).json(req.files.map((v) => v.filename));
});

router.post('/retweet/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'Retweet'
      }]
    });

    console.log('post: ', post);
    if (!post) {
      res.status(403).send('존재하지 않는 게시물입니다.');
    }

    if (req.user.id === post.UserId || post.Retweet && post.Retweet.UserId === req.user.id) {
      res.status(403).send('자신의 게시물은 리트윗할 수 없습니다.');
    }

    const retweetTargetId = post.RetweetId || post.id;
    console.log('retweetTargetId: ', retweetTargetId);

    const exPost = await Post.findOne({
      where: { RetweetId: retweetTargetId, UserId: req.user.id }
    });

    if (exPost) {
      res.status(403).send('이미 리트윗한 게시물입니다.');
    }

    const retweet = await Post.create({
      content: 'retweet',
      UserId: req.user.id,
      RetweetId: retweetTargetId
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }, {
          model: Image,
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image
      }, {
        model: User,
        as: 'Liker',
        attributes: ['id']
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }]
    });

    res.status(200).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;