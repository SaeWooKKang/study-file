const { Router } = require('express');
const asyncHandler = require('./../utils/async-handler');
const { User } = require('./../models');
const cryto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtConfig = require('./../config/jwtConfig');
const nodeMailer = require('nodemailer');

const router = Router();

// SignUp
router.post('/signUp', asyncHandler(async (req, res, next) => {
  const {email, password, name} = req.body;

  // 변수 저장 
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

// LogIn
router.post('/login', asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let hashPassword = passwordHash(password);

  const checkEmail = await User.findOne({ email });

  // 유효성 검사 - Email
  if (!checkEmail) {
    res.status(401);
    res.json({
      fail: '존재하지 않는 이메일 입니다.'
    });

    return;
  }

  // 유효성 검사 - Password
  if (hashPassword !== checkEmail.password) {
    res.status(401);
    res.json({
      fail: '비밀번호가 틀렸습니다.'
    });

    return;
  }

  if (checkEmail.status) {
    res.json({ requireSetPassword: true, email });

    return;
  }
  
  // JWT를 이용하여 email과 name을 서명해줌
  // 토큰을 서버 메모리에 저장 
  jwt.sign({
    email,
    name: checkEmail.name,
  }, jwtConfig.secret, {
    expiresIn: '1d' // 1y, 1d, 2hrs, 2h, 1m, 5s
  }, (err, token) => {

    // 서명 부분에서 오류가 났을 경우
    // TODO 어떨때 서명 오류가 나는거지 ?
    if (err) {
      res.status(401).json({
        status: false,
        message: '로그인을 해주세요'
      });
      return;
    } 

    // 오류가 나지 않았을 경우
    else {
      
      res.json({ 
        status: true,
        accessToken: token,
        email,
        name: checkEmail.name 
      });
    }
  });

}));

// 비밀번호 찾기
router.post('/find/password', asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const myEmail = 'pac11.dev@gmail.com';

  // mail 객체 만들고 
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: myEmail,
      pass: 'twtudrmxyupeqnhf'
    }
  });

  // 랜덤 비밀번호 만들고 
  const randomPassword = randomPw();

  // 암호화된 비밀번호 만들고
  const hashRandomPassword = passwordHash(randomPassword);

  // 서버에 암호화된 비밀번호 저장 
  await User.findOneAndUpdate({shortId: user.shortId} , {
    password: hashRandomPassword,
    status: true,
  });
  
  // to에 작성한 이메일로 요청 보냄
  // 이메일이 존재하는지 확인하고 요청 보냄
  let info = await transporter.sendMail({
    from: `"Elice" <${ myEmail }>`,
    to: user.email,
    subject: 'Reset Password By Elice',
    html: `<b>초기화 비밀번호: ${ randomPassword }</b>`
  });

  console.log('info.messageId', info.messageId);
  res.json({result: '이메일을 전송 하였습니다.' });
}));

// 비밀번호 재설정
router.post('/change/Password', asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const hashPassword = passwordHash(password);

  await User.findOneAndUpdate({ email } , {
    password: hashPassword,
    status: false,
  });

  res.json({
    result: '비밀번호가 변경되었습니다.'
  });
}))

const randomPw = () => {
  return Math.floor(Math.random() * (10 ** 8)).toString().padStart('0', 8);
};

const passwordHash = password => {
  return cryto.createHash('sha1').update(password).digest('hex');
};

module.exports = router;