# 지연 평가 + Promise의 효율성

``` javascript
go([1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => {
    log(a);
    return new Promise(resolve => setTimeout(() => resolve(a * a), 1000))
  }),
  L.filter(a => {
    log(a);
    return new Promise(resolve => setTimeout(() => resolve(a % 2), 1000))
  }),
  take(2),
  log
);
```