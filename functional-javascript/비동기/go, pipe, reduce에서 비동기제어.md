``` javascript
// go 함수에 비동기 함수가 있을 경우 오류가 남.
go(1,
  a => a + 1,
  a => Promise.resolve(a + 10),
  //a => a + 100,
  log
);
```


``` javascript
// go 함수의 제어권은 reduce에게 있고 pipe 함수는 go함수를 사용하므로 
// reduce 함수를 수정하면 비동기 함수를 go함수에서 사용할 수 있음.
const go = (...args) => reduce((a,f)=> f(a),args);
const pipe = (f, ...fs) => (...a) => go(f(...a),...fs);
```

``` javascript
// 원래 reduce 코드
const reduce = (f, acc, iter) => {
  if(!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  let cur;
  while(!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
};
```

``` javascript
// 비동기 처리 reduce
const reduce = curry((f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  let cur;
  while(!(cur = iter.next()).done) {
    const a = cur.value;
    // 계속해서 비동기 처리를 하게 됨
    acc = acc instanceof Promise 
      ? acc.then(acc => f(acc, a)) 
      : f(acc, a)
  }
  return acc;
}); 

go(1,
  a => a + 10,
  a => Promise.resolve(a + 100), // 중간에 프로미스 반환시
  a => a + 1000, // 프로미스 반환하므로 게속해서 비동기 처리
  log
);
```

``` javascript
// 재귀 함수 사용
const reduce = curry((f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  // 재귀 함수를 사용하여 비동기 로직다음 코드를 동기적으로 수행
  return function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  } (acc);
});  // 이렇게 작성시 첫번째 값이 프로미스면 오류가 남 

go(1, 
  a => Promise.resolve(a + 100), 
  a => a + 1000, 
  log
);
```

``` javascript
// 첫 번쨰 프로미스값 처리
const go1 = (a, f) => a instanceof Promise ? a.then(f): f(a);

const reduce = curry((f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  // 재귀 로직
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

go(Promise.resolve(1), 
  a => Promise.resolve(a + 100), 
  a => a + 1000, 
  log
);

go(Promise.resolve(1),
  a => a + 10,
  a => Promise.reject('error'), 
  a => console.log('----'), //  실행 되지 않음
  a => a + 1000,
  log
).catch(a => console.log(a));
```