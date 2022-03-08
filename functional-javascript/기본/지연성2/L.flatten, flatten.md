# L.flatten, flatten

## L.flatten
``` javascript 
const isiterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter) {
  for (const a of iter) {
    if(isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};
```

### yield *
``` javascript
// yield *iterable === for (const val of iter) yield val;

L.flatten = function *(iter) {
  for (const a of iter) {
    if(isIterable(a)) yield *a;
    else yield a;
  }
};
```

## flatten
```javascript
const flatten = pipe(L.flatten,take(Infinity));
```

### 예시
``` javascript
log(...L.flatten([[1,2],3,4,[5,6,7]])); // [1,2,3,4,5,6,7]

log(...flatten([[1,2],3,4,[5,6,7]])); // [1,2,3,4,5,6,7]
```

## L.deepflat
``` javascript 
L.deepflat = function *f(iter) {
  for (const a of iter) {
    if(isIterable(a)) yield *f(a);
    else yield a;
  }
};
```

### 예시
``` javascript
log([...L.deepflat([1,[2,[3]]])); // [1,2,3]
```