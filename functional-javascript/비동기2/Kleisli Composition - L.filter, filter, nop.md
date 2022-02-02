# Kleisli Composition - L.filter, filter, nop

``` javascript
// 기존 L.filter
L.filter = curry(function *(f, iter) {
  for (const a of iter) {
    if(f(a)) yield a;
  }
});

// Promise 처리 
const nop = Symbol("nop");

L.filter = curry(function *(f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop))
    else if(b) yield a;
  }
});


go(
  [1, 3, 5, 6],
  L.map(a => Promise.resolve(a * a)), 
  L.filter(a => a % 2),
  take(4),
  log // take 함수에서 애러 캐치를 못함
);
```

``` javascript 

// 애러 처리
var take = curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  return function recur() {
    let cur;
    while(!(cur = iter.next()).done){
      const a = cur.value;
      if(a instanceof Promise) {
        return a
          .then(a => (res.push(a), res).length === l ? res : recur())
          .catch(e => e == nop ? recur() : Promise.reject(e));
      }
      res.push(a);
    if(res.length === l) return res;
  }
  return res;
  }();
}); 

go(
  [1, 3, 5, 6],
  L.map(a => Promise.resolve(a * a)), 
  L.filter(a => a % 2),
  take(4),
  log // [1, 9, 25]
);

```