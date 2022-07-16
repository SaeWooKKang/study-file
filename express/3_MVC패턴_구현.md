## MVC 패턴

- 웹 서비스의 가장 대표적인 **프로젝트 구성 패턴**
- 프로젝트의 기능들을 어떻게 분리할지에 대한 하나의 구성방법
- Model-View-Controller를 구분하여 프로젝트 구조를 구성

### Model
- 데이터에 접근하는 기능
- 데이터 그 자체
- 데이터의 읽기, 쓰기는 Model을 통해서만 이루어지도록 구성해야 함

### View
- 데이터를 표현하는 기능
- controller에 의해 데이터를 전달받음
- 전달받은 데이터를 화면에 표시해주는 기능을 담당

### Controller
- Model을 통해 데이터에 접근하여 처리결과를 View로 전달
- 웹 서비스에서 라우팅 함수가 해당 기능을 수행

## 예시

폴더 구조
```
app.js
model  - note.js
routes - notes.js
```

모델을 만들고  
~~(모델은 DB가 될 듯?)~~
``` javascript
// model/note.js
let notes = [
  {
    id: 1,
    title: 'first note',
    content: 'My first note is here.'
  }
];
```
클로저로 모델 접근하는 기능 만들고  
~~(DB 접근 메서드가 될 듯?)~~
``` javascript
// models/note.js
exports.list = () => notes.map(({ id, title }) => ({
  id,
  title,
}));
```

/notes에 get방식으로 접근시   

import 해온 Note.list로 모델에 접근해  

데이터를 json방식으로 보내주고 있음   
``` javascript
// routes/notes.js
const { Router } = require('express');
const Note = require('../models/note');

const router = Router();

router.get('/', (req, res, next) => {
  const notes = Note.list();
  res.json(notes);
});

module.exports = router;
```

마지막으로 app에 라우터 등록하면 됨
``` javascript
// app.js
const express = require('express');
const noteRouter = require('./routes/notes');

const app = express();

app.use('/notes', noteRouter);

app.listen(3000, () => console.log('server started!'));
```

추가적으로 필요한 동작들은  

다음과 같이 model과 route에 작성하면 됨   

- - -

model 함수 만들고
``` javascript
// models/note.js

/** 
 * ...위의 코드
*/
exports.get = id => {
  const note = notes.find(
    note => note.id == id
  );

  if (!note) {
    throw new Error('Note not found');
  }

  return note;
}
```

model을 사용할 route 작성
``` javascript
// routes/notes.js

/** 
 * ...위의 코드
*/
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const note = Note.get(id);
    res.json(note);
  } catch(e) {
    next(e);
  }
});
```

+ 오류 처리 미들웨어 구현  
-> 모든 라우팅의 공통적인 오류처리 로직 적용
``` javascript
// app.js

/** 
 * ...위의 코드
*/
app.use((err, req, res, next) => {
  res.status(500);

  res.json({
    result: 'fail',
    error: err.message,
  });
});
```

## 글 작성

express.json() 미들웨어로 json데이터 사용
``` javascript
// app.js
/** 
 * ...위의 코드
*/

app.use(express.json());
```

모델 추가하고
``` javascript
// models/note.js

/** 
 * ...위의 코드
*/
exports.create = (title, content) => {
  const { id: lastId } = notes[notes.length - 1];

  const newNote = {
    id: lastId + 1,
    title,
    content,
  };
  
  notes.push(newNote);

  return newNote;
}
```

라우터에 추가
``` javascript
// routes/notes.js

/** 
 * ...위의 코드
*/
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const note = Note.create(title, content);
  
  res.json(note);
});
```

## 글 수정

모델 추가하고 
``` javascript
// models/note.js

/** 
 * ...위의 코드
*/
exports.update = (id, title, content) => {
  const index = notes.findIndex(note => note.id == id);

  if (index < 0) {
    throw new Error("Note not found for updaate");
  }

  const note = notes[index];
  note.title = title;
  note.content = content;
  notes[index] = note;
}
```

라우터에 추가  
- /notes/:id에 put 방식으로 요청하고
- body에 title, content주면 수정해주는 코드 
``` javascript
// routes/notes.js

/** 
 * ...위의 코드
*/
router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  try {
    const note = Note.update(id, title, content);
    res.json(note);
  } catch (e) {
    next(e);
  }
});
```

## 글 삭제

모델 추가하고
``` javascript
// models/note.js

/** 
 * ...위의 코드
*/
exports.delete = id => {

  if (!notes.some(note => note.id == id)) {
    throw new Error("Note not found for delete");
  }

  notes = notes.filter(note => note.id !== id);

  return;
}
```

라우터에 추가
``` javascript
// routes/notes.js

/** 
 * ...위의 코드
*/
router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);

  try {
    Note.delete(id);
    res.json({ result: 'success' });
  } catch (e) {
    next(e);
  }
});
```

## 404오류 처리
- 정의되지 않은 라우팅에 404오류 처리

``` javascript
// app.js

/** 
 * ...위의 코드
*/
app.use((req, res, next) => {
  res.status(404);
  res.send({
    result: 'fail',
    error: `Page not found ${req.path}`
  });
});
```

