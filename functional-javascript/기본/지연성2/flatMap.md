# L.flatMap, flatMap

## L.flatMap
``` javascript
L.flatMap = curry(pipe(L.map, L.flatten));
```

## flatMap
``` javascript
const flatMap = curry(pipe(L.map, flatten));
```

### 2차원 배열 예시
``` javascript
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10]
];

go(arr,
  L.flatten,
  L.filter(a => a % 2),
  L.map(a => a * a),
  take(4),
  reduce(add),  
  log
); // 84;
```