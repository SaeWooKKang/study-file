# L.flatMap, flatMap

## L.flatMap
``` javascript
L.flatMap = curry(pipe(L.map, L.flatten));
```

``` javascript
const flatMap = curry(pipe(L.map, flatten));
```