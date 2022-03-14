# mapObject

``` javascript
// 객체에 값들을 변경하고 싶음
// 값들을 이터러블로 변경, 이터러블 프로그래밍 
const mapObject = (f, obj) => _.go(
  obj,
  _.entries,
  _.map(([k,v]) => [k,f(v)]),
  _.object
);

log(mapObject(a => a + 10, {a:1, b:2, c:3}));
// [['a', 1], ['b', 2], ['c', 3]]
// [['a', 11], ['b', 12], ['c', 13]]
// { a: 11 }
// {a: 11, b: 12, c: 13}
```