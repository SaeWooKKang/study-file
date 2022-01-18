# 중첩사용

## range,map,filter,take,reduce 중첩사용
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
```
