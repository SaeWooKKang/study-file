# 즉시, 지연, Promise, 병렬적 조합

### 공통 함수
``` javascript
const delay500 = (a, name) => new Promise(resolve => {
  console.log(`${name}: ${a}`);
  setTimeout(() => resolve(a), 500);
});
```

## 조합
- 필요에 따라 아래의 조합 외 다양하게 조합 가능 
``` javascript
// 최대한 지연적으로 
console.time('');
go([1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => delay500(a * a, 'map 1')),
  L.filter(a => delay500(a % 2, 'filter 2')),
  L.map(a => delay500(a + 1, 'map 3')),
  C.take(2),
  // reduce(add),
  log,
  _=> console.timeEnd(''));
```

``` javascript
// map 3까지 병렬적으로 
console.time('');
go([1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => delay500(a * a, 'map 1')),
  L.filter(a => delay500(a % 2, 'filter 2')),
  C.map(a => delay500(a + 1, 'map 3')),
  take(2),
  // reduce(add),
  log,
  _=> console.timeEnd(''));
```

``` javascript
// filter 2까지 병렬적으로
console.time('');
go([1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => delay500(a * a, 'map 1')),
  C.filter(a => delay500(a % 2, 'filter 2')),
  L.map(a => delay500(a + 1, 'map 3')),
  // take(2),
  reduce(add),
  log,
  _=> console.timeEnd(''));
```