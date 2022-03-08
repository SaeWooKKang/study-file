# go, pipe

## go 구현

* 함수를 연속적으로 처리 함 
``` javascript
// 코드를 값으로 다루어 표현력 높이기 

// 인수를 rest parameter로 배열로 만들고 
// reduce 함수 사용
const go = (...args) => reduce((a,f)=>f(a),args)

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log) // 111
```
## pipe 구현

* 합성된 함수를 구하는 함수

```javascript
// reduce -> go -> pipe 확장 
// 일급, 고차함수, 클로저
const pipe = (...fs) => (a) => go(a, ...fs);

const f = pipe(
  a => a + 1,
  a => a + 10,
  a => a + 100); // (a) => go(a, ...fs)

log(f(0)); // 111
```

### pipe 확장
``` javascript
// 기존 pipe는 인수를 하나만 넣을 수 있었음 

// 첫번째 함수를 빼두고 
// 호출시 인수들을 rest parameter로 배열로 만들고 
// spread 사용해서 첫번째 함수에 인수로 전달
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const f = pipe(
  add
  a => a + 10,
  a => a + 100); // (a) => go(a, ...fs)

log(f(0,1)); // 111
```

