# 객체로 부터 url의 쿼리스트링을 얻어내는 코드
``` javascript 
const queryStr = str => go(
  str,
  Object.entries,
  map(([k, v]) =>`${k}=${v}`),
  reduce((a,b) => `${a}&${b}`)
);

log(queryStr({limit: 10, offset: 10, type: "noice"}));
```

``` javascript
const queryStr = str => go(
  str,
  Object.entries,
  map(([k, v]) =>`${k}=${v}`),
  reduce((a,b) => `${a}&${b}`)
);

log(queryStr({limit: 10, offset: 10, type: "noice"}))
```