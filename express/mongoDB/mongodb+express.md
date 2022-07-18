# mongoose + express 연결 및 CRUD 구현
기본 개념

1. Database
  - 하나 이상의 collection 가질 수 있는 저장소
2. Collection
  - 하나 이상의 Document가 저장되는 공간
3. Document
  - MongoDB에 저장되는 자료 

폴더 구조 

```
 📂 root
 ┣ 📂 models
 ┃ ┣ 📂 schemas
 ┃ ┃ ┗ board.js
 ┃ ┗ index.js
 ┃ app.js
```

몽구스 연결하고 
``` javascript
// ./app.js

// 모듈 가져오고 
const mongoose = require('mongoose');

// 데이터베이스 연결
mongoose.connect("mongodb://localhost:27017/myapp");

// 커넥션 이벤트 
// 연결 완료
mongoose.connection.on("connected", () => {
  console.log('connected');
});

// 연결 끊김
mongoose.connection.on("disconnected", () => {
  console.log('disconnected');
});
```

스키마 생성
- collection에 저장될 document의 스키마를 작성
- 형식을 미리 지정하여 생성, 수정 작업시 데이터 형식을 체크 해줌
``` javascript
// ./models/schemas/board.js

const { Schema } = require('mongoose'); 

const PostSchema = new Schema({
    title: String,
    content: String
  },
  {
    // 생성 수정 시간을 자동으로 기록
    timestamps: true
  }
);

module.exports = PostSchema;
```

모델 생성
- 작성된 스키마를 mongoose에서 사용할 수 있는 모델로 만들기
``` javascript
// ./models/index.js

const mongoose = require("mongoose");
const PostSchema = require("./schemas/board");

// 'post'는 collection임
exports.Post = mongoose.model("Post", PostSchema);
```

create 함수로 document 생성
- create 함수 인자로 객체 또는 객체의 배열 전달 가능
- 객체의 배열 전달시 복수의 document 생성 
``` javascript
// ./app.js

/** 
 * ... 기존코드 
*/

const { Post } = require("./models");

async function main() {
  await Post.create({
    title: '제목222',
    content: '내용222'
  });
}

main();
```

find: 데이터 목록 구하기 
``` javascript
// ./app.js
const findList = async () => await Post.find({});


findList()
  .then(res => console.log(res));
```

find: 데이터 구하기
``` javascript
const findItem = async () => await Post
  .find({ title: '제목222' });


findItem()
   .then(res => console.log(res));
```

updateOne: id로 해당 document 업데이트 
``` javascript
const changeItem = async () => await Post
  .updateOne({
    id: '62d4e25f0578148a237218c3',
    title: '33333'
  });

changeItem()
  .then(res => console.log(res));
```

deleteOne: id로 해당 document 삭제
``` javascript
const deleteFun = async () => await Post
  .deleteOne({
    _id:"62d4e25f0578148a237218c3"
  });


deleteFun()
  .then(res => console.log(res));
```