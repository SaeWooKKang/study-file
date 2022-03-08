# Kleisli Composition 관점에서의 Promise

##### 오류가 있을 수 있는 상황에서의 함수 합성을 안전하게 할 수 있는 규칙

#### 에러 발생 상황
  1. 인자가 완전히 잘못됐을 때 
  2. 인자는 이상 없지만 함수가 참조하고 있는 외부 상태가 변경 됐을 때

#### < 공통 코드 > 
``` javascript 
var users = [
  { id: 1, name: 'aa'},
  { id: 2, name: 'bb'},
  { id: 3, name: 'cc'}
];

const getUserById = id => 
  find(u => u.id == id, users);

const f = ({name}) => name;
const g = getUserById;
```

#### 상태가 변하지 않을 때 
``` javascript
const fg = id => f(g(id));

fg(2) == fg(2) // 데이터가 변하지 않으면 항상 같다.
```

#### 상태가 변할 때
``` javascript
// f, g 함수는 안전한 함수이지만 외부 상태의 변화로 에러가 남
const r1 = fg(2);
log(r1) // bb

// 상태 변경
users.pop();
users.pop();

const r2 = fg(2); // 오류 발생
log(r2) // 실행되지 않음.
```

#### Promise를 활용한 Kleisli Composition
``` javascript
const fg = id => Promise.resolve(id).then(g).then(f);
```

``` javascript
// find 오류 발생시 Promise 반환
const getUserById = id =>
  find(u => u.id == id, users) || Promise.reject('없어요');

const f = ({name}) => name;
const g = getUserById;

const fg = id => Promise.resolve(id).then(g).then(f).catch(a => a);

// 상태 변화
users.pop();
users.pop();

// Kleisli Composition
// f(g(a)) = g(a)
// g 함수에서 에러가 발생한 경우 g함수를 실행한 결과와 f.g를 실행한 결과를 같게 함.
fg(2).then(log); // 없어요
```
