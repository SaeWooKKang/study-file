const { Router } = require('express');
const { Post } = require('./../models');

const router = Router();

// get 요청
router.get('/', async (req, res, next) => {
  const posts = await Post.find({});
  
  res.json(posts);
});

// post 요청
router.post('/', async (req, res, next) => {
  const { title, content } = req.body;

  try {
    await Post.create({
      title,
      content
    });

    res.json({
      result: '저장이 완료 되었습니다.'
    });

  } catch (e) {
    next(e);
  }
});

module.exports = router;