const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const postsRouter = require('./routes/post');
const userRouter = require('./routes/user');

const authMiddleware = require('./utils/authMiddleware');

const app = express();

// DB 연결
mongoose.connect('mongodb://localhost:27017/myapp');

mongoose.connection.on('connected', () => {
  console.log('DB connect success!') ;
});

mongoose.connection.on('error', err => {
  console.log(err);
});

// 모든 요청에 대해 json형식으로 변경
app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// post 라우팅
// auth 미들웨어 추가 
app.use('/posts', authMiddleware, postsRouter);

// user 라우팅
app.use('/user', userRouter);

app.listen(
  3000,
  () => console.log('server started!')
);

