``` javascript

const a = [['a', 1], ['b', 2], ['c',3]];
const b = {a:1, b:2, c:3};

var object = entries => _.go(
  entries, // [['a', 1], ['b', 2], ['c',3]]
  _.map(([k, v]) => ({[k]: v})), // [{a: 1}, {b: 2}, {c: 3}]
  _.reduce(Object.assign) // {a: 1, b: 2, c: 3}
);

var object = entries => 
  _.reduce((obj, [k, v]) => (obj[k] = v, obj), {}, entries);

log(object(a));

log(object(L.entries({b: 2, c: 3})));

let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);

log(m); // {'a' => 10, 'b' => 20, 'c' => 30}

const it = m[Symbol.iterator]();
log(it.next().value); // ['a', 10]
log(it.next().value); // ['b', 20]
log(it.next().value); // ['c', 30]
log(it.next().value); // undefined

console.log(object(m)); // {a: 10, b: 20, c: 30}
```