# 중첩사용

### 공통
``` javascript
const take = curry((l, iter) =>  {
  const res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while(!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if(res.length === l) return res;
  }
  return res;
});
```

## range,map,filter,take,reduce 중첩사용

- 엄격한 계산 
- 효율성 ⬇️

``` javascript
const range = l => {
  let i = -1;
  const res = [];
  while(++i < l) {
    res.push(i);
  }
  return res;
};

const map = curry((f, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while(!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while(!(cur = iter.next()).done) {
    const a = cur.value;
    if(f(a)) res.push(a);
  }
  return res;
});

const reduce = (f, acc, iter) => {
  if(!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while(!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
};

go(
  range(10),
  map(n => n + 10),
  filter(n => n % 2),
  take(2),
  log
);

// [0,1,2,3,4,...]
// [10,11,12,...]
// [11,13]
```

## L.range,L.map,L.filter,take 중첩사용

- 느긋한 계산
- 효율성 ⬆️

``` javascript
 const L = {};

  L.range = function *(l) {
    let i = -1;
    while(++i < l) {
      yield i
    }
  };

  L.map = curry(function *(f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur = iter.next()).done){
      const a = cur.value;
      yield f(a);
    }
  });

  L.filter = curry(function *(f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur=iter.next()).done){
      const a = cur.value;
      if(f(a)){
        yield a;
      } 
    }
  });

  go(
    L.range(10),
    L.map(n => n + 10),
    L.filter(n => n % 2),
    take(2),
    log
  );

// 0        1
// 10       1
// false    true
```
