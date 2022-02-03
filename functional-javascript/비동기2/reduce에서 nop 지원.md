# reduce에서  nop 지원
``` javascript
// 이전 코드
var reduce = curry((f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

go([1, 2, 3, 4],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a % 2)),
  reduce(add),
  log
); // reduce에서 오류

// 1[object Promise][object Promise][object Promise]
// Uncaught (in promise) Symbol(nop)
```
## 오류 처리
``` javascript
// a 값 처리
var reduceF = (acc, a, f) => 
  a instanceof Promise 
    ? a.then(a => f(acc, a)) 
    : f(acc, a) // index.html:1 Uncaught (in promise) Symbol(nop)

// 에러 처리s
var reduceF = (acc, a, f) => 
  a instanceof Promise 
    ? a.then(a => f(acc, a), e => e == nop ? acc : Promise.reject(e)) 
    : f(acc, a)
// 수정 코드
var reduce = curry((f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

go([1, 2, 3, 4],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a % 2)),
  reduce(add),
  log
); // 10
```

## + 추상화 
``` javascript
const head = iter => go1(take(1, iter), ([h]) => h);

var reduce = curry((f, acc, iter) => {
  if(!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter);
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

```