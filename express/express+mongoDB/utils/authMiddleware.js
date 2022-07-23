const jwt = require('jsonwebtoken');
const jwtConfig = require('./../config/jwtConfig');

module.exports = async (req, res, next) => {

  // token 값을 request header에서 가져옴
  const accessToken = req.header('accessToken');

  if (!accessToken) {

    res
      .status(403)
      .json({ status: false, message: '로그인 해주세요.' });
  } 
    
  try {
    const tokenInfo = await new Promise((resolve, reject) => {
      
      // 토큰, 비밀키, 
      jwt.verify(accessToken, jwtConfig.secret, (err, decode) => {
        if (err) {
          reject(err);
        } else {

          // decode된 토큰 객체 
          resolve(decode);
        }
      });
    });

    req.tokenInfo = tokenInfo;
    next();
  } catch (e) {
    res
      .status(403)
      .json({ staus: false, message: '권한 오류' });
  }
}