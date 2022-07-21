const { Router } = require('express');
const { Post } = require('./../models');
const asyncHandler = require('./../utils/async-handler');

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
    // 저장된 document 객체 줌
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

router.get('/:shortId/delete', async (req, res, next) => {
  const { shortId } = req.params;

  try {
    await Post.deleteOne({ shortId });
    
    res.json({
      result: '삭제가 완료 되었습니다.'
    });

  } catch (e) {

    next(e);

  }

});

router.get('/:shortId/find', async (req, res, next) => {
  const { shortId } = req.params;

  try {
    let data = await Post.findOne({ shortId });

    res.json(data);
    
  } catch (e) {

    next(e);
  }
});

router.post('/:shortId/update', async (req, res, next) => {
  const { shortId } = req.params;
  let { title, content } = req.body;

  try {
    await Post.updateOne({ shortId }, { title, content });

    res.json({
      result: '수정이 완료 되었습니다.'
    });
  } catch (e) {

    next(e);
  }
});

module.exports = router;