# C.reduce, C.take

## C.reduce
``` javascript
const C = {};

// 전개 연산자로 병렬 처리 
C.reduce = curry((f, acc, iter) => iter 
  ? reduce(f, acc, [...iter]) 
  : reduce(f, [...acc]));

const delay1000 = a => new Promise(resolve => {
  log('delay/`');
  setTimeout(() => resolve(a), 1000);
});

// 약 1s
// C.reduce 함수는 두번째 인자로 제너레이터 객체를 받고, 
// 호출시 전개 연산자로 내부의 값을 모두 yield 함

// const f = function* () {
//   yield 1;
//   yield 2;
// }
// const g = f();
// log([...g]); // [[1, 2]]

console.time('');
go([1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  C.reduce(add),
  log,
  _ => console.timeEnd('')
);

// 약 5s
console.time('');
go([1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  reduce(add),
  log,
  _ => console.timeEnd('')
);      
```
## 에러 처리 
Promise.reject('err');
 -> 나중에 에러를 캐치 하여도, 콜 스택에 프로미스 리젝이 있으면 콘솔에 에러메시지를 띄움

``` javascript
C.reduce = curry((f, acc, iter) => {
  const iter2 = iter ? [...iter] : [...acc];
  iter2.forEach(a => a.catch(function(){})); 
  return iter 
    ? reduce(f, acc, iter2) 
    : reduce(f, iter2)
});

```

### 함수 정리 
``` javascript
function noop () {}; 

const catchNoop = arr =>
  (arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

C.reduce = curry((f, acc, iter) => {
  const iter2 = catchNoop(iter ? [...iter] : [...acc]);
  return iter 
    ? reduce(f, acc, iter2) 
    : reduce(f, iter2)
});
```

## C.take
``` javascript

C.take = curry((l, iter) => {
  iter = catchNoop([...iter]);
  return take(l, iter);
});
```
### 1) 정리 
``` javascript 
C.take = curry((l, iter) => {
  return take(l, catchNoop([...iter]));
});
``` 

### 2) 정리
``` javscript
C.take = curry((l, iter) =>take(l, catchNoop([...iter])));
```