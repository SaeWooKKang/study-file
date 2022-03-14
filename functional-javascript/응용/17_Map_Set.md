``` javascript
let m = new Map(); // 사용자 정의 객체 

m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

const iterator = m[Symbol.iterator]();
log(iterator.next());

_.go(
  m,
  L.filter(([_, v]) => v % 2),
  _.takeAll,
  log
)

let s = new Set(); 

s.add(10);
s.add(20);
s.add(30);

const iterator2 = s[Symbol.iterator]();
log(iterator2.next()); //{value: 10, done: false}

log(_.reduce(add, s));
```