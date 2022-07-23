const { Router } = require('express');
const { Post, User } = require('./../models');
const asyncHandler = require('./../utils/async-handler');

const router = Router();

// get 요청
router.get('/', async (req, res, next) => {
  const posts = await Post
    .find({})
    .populate('author');
  
  res.json(posts);
});

// post 요청
router.post('/', async (req, res, next) => {
  const { title, content, email } = req.body;
  try {
    const authData = await User.findOne({ email });
    // 저장된 document 객체 줌
    await Post.create({
      title,
      content,
      author: authData,
    });

    res.json({
      result: '저장이 완료 되었습니다.'
    });

  } catch (e) {
    next(e);
  }
});

// delete
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

// find
router.get('/:shortId/find', async (req, res, next) => {
  const { shortId } = req.params;

  try {
    let data = await Post.findOne({ shortId });

    res.json(data);
    
  } catch (e) {

    next(e);
  }
});

// update
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