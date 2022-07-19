폴더 구조

```
root
 ┣ 📂 models
 ┃ ┣ 📂 schemas
 ┃ ┃ ┣ 📂 type
 ┃ ┃ ┃ ┗ short-id.js
 ┃ ┃ ┗ post.js
 ┃ ┗ index.js
 ┣ 📂 routes
 ┃ ┗ post.js
 ┣ 📂 view
 ┃ ┣ 📂 posts
 ┃ ┃ ┗ list.html
 ┃ ┣ 📂 static
 ┃ ┃ ┣ 📂 css
 ┃ ┃ ┗ 📂 js
 ┃ ┃ ┃ ┣ header.js
 ┃ ┃ ┃ ┗ postsList.js
 ┃ ┗ index.html
 ┣ app.js
```

## view 만들기 
<details>
<summary>root index.html 파일 생성</summary>
<div markdown="1">

- JQuery cdn 등록
- 부트스트랩 cdn 등록

``` html
<!-- ./index.html-->

<!DOCTYPE html>
  <html>
    <head>
      <title>index</title>
      <!-- JQuery-->
      <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
      <!-- CSS only -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
      <!-- JavaScript Bundle with Popper -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </head>
    <body>
     <div class="container">

     </div>
     
     <!-- header 작성하고 넣기 -->
     <script src="./static/js/header.js"></script>
    </body>
  </html>
```


</div>
</details>
<details>
  <summery>
    부트스트랩 + JQuery로 헤더 만들기
  </summery>
  <div markdown="1">

- 경로 지정
- DOM 생성시 실행

``` javascript
// ./view/static/js/header.js

$(document).ready(() => {
  let header = ` 
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src="https://elice.io/static/dc6054e07cd72edccb4c2f0ceccedb97/cdfa4/elice_logo.webp">
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/view/index.html" class="nav-link px-2 link-dark">Home</a></li>
        <li><a href="/view/posts/list.html" class="nav-link px-2 link-dark">List</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
    </header>`;

  $(".container").prepend(header);
});
```

  </div>
</details>

## models 만들기 
<details>
  <summery>스키마 만들고
  </summery>
</details>

``` javascript
// ./models/schemas/post.js

const { Schema } = require('mongoose');
const shortId = require('./type/short-id');

// shortId는 mongodb의 키값을 이용하지 않기 위해 등록
module.exports = new Schema({
  shortId,
  title: String,
  content: String,
}, {
  timestamps: true
}
);
```

short-id 만들기
- nanoid 라이브러리 사용

``` javascript
// ./models/schemas/type/short-id.js

const { nanoid } = require('nanoid');

const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  require: true,
  index: true
}

module.exports = shortId;
```

모델 등록
``` javascript
// ./models/index.js

const mongoose = require('mongoose');
const Post = require('./schemas/post')

// Post 컬렉션에 Post 스키마 사용한다.
exports.Post = mongoose.model('Post', Post);
```

## app.js
- DB 
- 라우터

``` javascript
// ./app.js
const express = require('express');
const mongoose = require('mongoose');

// cors 처리 라이브러리
const cors = require('cors');

const postsRouter = require('./routes/post');

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

// 모든 요청에 대해 cors 처리
app.use(cors());

app.use('/posts', postsRouter);

app.listen(
  3000,
  () => console.log('server started!')
);
```

라우터 만들고 app에 연결

``` javascript
// ./routes/post.js

const { Router } = require('express');
const { Post } = require('./../models');

const router = Router();

router.get('/', async (req, res, next) => {
  const posts = await Post.find({});

  res.json(posts);
});

module.exports = router;
```