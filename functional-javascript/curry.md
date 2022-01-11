# curry

* 함수를 부분적으로 실행

``` javascript
const filter = curry((f,iter) => {
  const arr = [];
  for (const a of iter){
    if(f(a)) arr.push(a);
  }
  return arr;
});

const curry = f => 
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a,..._);

const products = [
  {name: 'a' , price: 100},
  {name: 'b' , price: 200},
  {name: 'c' , price: 300},
  {name: 'd' , price: 400},
  {name: 'e' , price: 500},
];

go(
  products,
  products => filter(p => p.price < 300,products),
  log 
);
go( //go + curry
  products,
  products => filter(p => p.price < 300)(products),
  log
);
go( //go + curry
  products,
  filter(p => p.price < 300) 
);
```
## 함수 조합

``` javascript 
// curry가 적용된 map, filter, reduce 함수 정의..

const products = [
  {name: 'a' , price: 100},
  {name: 'b' , price: 200},
  {name: 'c' , price: 300},
  {name: 'd' , price: 400},
  {name: 'e' , price: 500},
];

go(
  products,
  filter(p => p.price < 300),
  map(p => p.price),
  reduce((acc,p) => acc + p),
  log // 300
); 
go(
  products,
  filter(p => p.price > 200),
  map(p => p.price),
  reduce((acc,p) => acc + p),
  log // 1200
);

// 함수 조합
const totoal_price = pipe(
  map(p => p.price),
  reduce((acc,p) => acc + p)
);
go(
  products,
  filter(p => p.price < 300),
  totoal_price,
  log // 300
);
go(
  products,
  filter(p => p.price > 200),
  totoal_price,
  log // 1200
);

// 함수 조합 2
const base_total_price = f => pipe(
  filter(f),
  totoal_price,
)
go(
  products,
  base_total_price(p => p.price < 300),
  log // 300
);
go(
  products,
  base_total_price(p => p.price > 200),
  log // 1200
);

```