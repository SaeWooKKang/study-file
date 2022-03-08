# range와 느긋한 L.range, take

## range
``` javascript 
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

var list = range(4) // 즉시 배열 생성
log(list);// [0,1,2,3]
log(reduce(add,list)); // 6
```

## L.range
``` javascript
const L = {};
L.range = function* (l) {
  let i = -1;
  while(++i < l) {
    yield i;
  }
}

var list = L.range(4); 
log(list); // 지연평가
log(reduce(add,list)); // 6

list.next(); //{value: 0, done: false}
list.next() //{value: 1, done: false}
```

### 효울성 테스트
``` javascript
function test(name, time, f) {
    console.time(name); // name은 label임
    while (time--) f();
    console.timeEnd(name);
  }

// 전체를 순회 했으므로 결과는 같음
test('range', 1, () => reduce(add, range(100000000))); 
test('L.range', 1, () => reduce(add, L.range(100000000)));
```

## take

``` javascript 
const take = curry((l, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if(res.length === l ) return res;
  }
  return res;
});
```

``` javascript
// 결과는 같지만 효율은 아래가 좋다.
go(
  range(10000),
  take(5),
  reduce(add),
  log 
); // 10

go(
  L.range(10000),
  take(5),
  reduce(add),
  log
); // 10

```