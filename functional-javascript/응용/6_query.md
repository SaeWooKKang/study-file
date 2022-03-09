``` javascript
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD'
};
// a=1&&c=CC&d= DD

// 명령형으로 이런식으로 작성하면 복잡도가 꽤 있음
function query1(obj) {
  let res = '';
  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res != '') res += '&';
    res += k + '=' + v;
  }
  return res;
}
``` 

``` javascript
log(query1(obj1));

// 복잡한 reduce 하나로 처리했을 때
function query2(obj) {
  return Object
    .entries(obj)
    .reduce((query, [k, v], i) => {
      if (v === undefined) return query;
      return query + (i > 0 ? '&' : '') + k + '=' + v;
    }, '');
}

log(query2(obj1));
```

``` javascript
const join = _.curry((sep, iter) => 
  _.reduce((a, b) => `${a}${sep}${b}`, iter));

function query3(obj) {
  return (
    join('&',
      _.map((([k, v]) => `${k}=${v}`), 
        _.reject(([_, v])=> v === undefined, 
        Object.entries(obj)))));
}

log(query3(obj1));

var query4 = obj => _.go(
  obj,
  Object.entries,
  _.reject(([_, v])=> v === undefined),
  _.map(join('=')),
  join('&')
);

var query4 = _.pipe(
  Object.entries,
  L.reject(([_, v])=> v === undefined),
  L.map(join('=')),
  join('&')
);

log(query4(obj1));
```