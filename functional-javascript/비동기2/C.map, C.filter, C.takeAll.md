# C.takeAll, C.map, C.filter

## C.takeAll
``` javascript
C.takeAll = C.take(Infinity);
```

## C.map
``` javascript
//var map = pipe(L.map, take(Infinity));

C.map = curry(pipe(L.map, C.takeAll));

// 즉시 병렬적으로 평가
C.map(a => delay1500(a * a), [1, 2, 3, 4]).then(log);
```

## C.filter
``` javascript
// var filter = pipe(L.filter, take(Infinity));

C.filter = curry(pipe(L.filter, C.takeAll));

// 즉시 병렬적으로 평가
C.filter(a => delay1500(a % 2), [1, 2, 3, 4]).then(log);
```