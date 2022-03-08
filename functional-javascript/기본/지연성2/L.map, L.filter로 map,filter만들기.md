# map, filter

## map
``` javascript 
const map = (f, iter) => go(iter,
  L.map(f),
  take(Infinity)
);

const map = (f, iter) => go(
  L.map(f, iter),
  take(Infinity)
);

const map = pipe(L.map, take(Infinity));

// 예시
log(map(a => a + 10, L.range(4))); //[10, 11, 12, 13]
```

## filter
``` javascript 
const filter = pipe(L.filter, take(Infinity));

// 예시
log(filter(a => a % 2, range(4))); // [1,3]
```