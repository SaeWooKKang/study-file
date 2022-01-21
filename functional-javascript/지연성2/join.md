# join

- 다형성이 높은 join

``` javascript 
const join = (sep = ',', iter) => 
  reduce((a, b) => `${a}${sep}${b}`, iter);
```

### L.entries
``` javascript
L.entries = function *(obj) {
  for(const k in obj) {
    yield [k, obj[k]];
  }
};
```

## 예제 
``` javascript
function *a(){
  yield 10;
  yield 11;
  yield 12;
  yield 13;
}
log(join(' - ', a())); // 10 - 11 - 12 - 13
```

``` javascript
 const queryStr = str => go(
    str,
    L.entries,
    L.map(([k, v]) =>`${k}=${v}`),
    join('&')
  );

  log(queryStr({limit: 10, offset: 10, type: "noice"})); // limit=10&offset=10&type=noice
```