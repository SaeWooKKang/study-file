const { Router } = require('express');
const asyncHandler = require('./../utils/async-handler');
const { User } = require('./../models');
const cryto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtConfig = require('./../config/jwtConfig');

const router = Router();

router.post('/signUp', asyncHandler(async (req, res, next) => {

  const {email, password, name} = req.body;

  const hashPassword = passwordHash(password);

  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    res.status(500);
    res.json({ 
      error: '이미 가입된 이메일 입니다.'
    });

    return;
  }

  await User.create({
    email,
    password: hashPassword,
    name
  });

  res.json({
    result: '회원 가입이 완료 되었습니다. 로그인을 해주세요.'
  });
}));

router.post('/login', asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;

  let hashPassword = passwordHash(password);

  const checkEmail = await User.findOne({ email });

  // 유효성 검사 - Email
  if (!checkEmail) {
    res.status(401);
    res.json({
      fail: '존재하지 않는 이메일 입니다.'
    });
  }
  // 유효성 검사 - Password
  if (hashPassword !== checkEmail.password) {
    res.status(401);
    res.json({
      fail: '비밀번호가 틀렸습니다.'
    });
  }
  
  // JWT를 이용하여 email과 name을 서명해줌
  jwt.sign({
    email,
    name: checkEmail.name,
  }, jwtConfig.secret, {
    expiresIn: '1d' // 1y, 1d, 2hrs, 2h, 1m, 5s
  }, (err, token) => {
    // 서명 부분에서 오류가 났을 경우
    if (err) {
      res.status(401).json({
        status: false,
        message: '로그인을 해주세요'
      });
    } 
    // 오류가 나지 않았을 경우
    else {
      res.json({ 
        status: true,
        accessToken: token,
        email,
        name:checkEmail.name 
      });
    }
  });

}));

const passwordHash = password => {
  return cryto.createHash('sha1').update(password).digest('hex');
}

module.exports = router;