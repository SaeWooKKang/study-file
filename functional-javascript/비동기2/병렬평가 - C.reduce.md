# C.reduce

``` javascript
const C = {};

// 전개 연산자로 병렬 처리 
C.reduce = curry((f, acc, iter) => iter 
  ? reduce(f, acc, [...iter]) 
  : reduce(f, [...acc]));

const delay1000 = a => new Promise(resolve => {
  log('delay/`');
  setTimeout(() => resolve(a), 1000);
});

// 약 1s
console.time('');
go([1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  C.reduce(add),
  log,
  _ => console.timeEnd('')
);

// 약 5s
console.time('');
go([1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  C.reduce(add),
  log,
  _ => console.timeEnd('')
);      
```