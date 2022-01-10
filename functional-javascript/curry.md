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
go(
  products,
  products => filter(p => p.price < 300)(products),
  log
);
go(
  products,
  filter(p => p.price < 300) 
);
````