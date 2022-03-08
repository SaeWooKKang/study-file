# L.map, L.filter

``` javascript
const L = {};
```
## L.map
``` javascript
// 배열에 담기지 않음
L.map = function *(f, iter) {
  for (const a of iter) yield f(a);
};
var it = L.map(a=> a + 10, [1,2,3]);
log([...it]);

// log(it.next());
// log(it.next());
// log(it.next());
// log(it.next());
```

## L.filter
``` javascript
L.filter = function *(f, iter) {
  for (const a of iter) if(f(a)) yield a;
}

var it = L.filter(a=> a % 2 ,[1,2,3,4,5]);
log(it.next()); // 1
log(it.next()); // 3
log(it.next()); // 5
log(it.next()); // {value: undefined, done: true}
```