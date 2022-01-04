# filter 구현

```javascript
const products = [
  {name: 'a', price:100},
  {name: 'b', price:200},
  {name: 'c', price:300}
];

const over200 = [];
for (const price of products) {
  if(price >= 200) over200.push(price)
}

log(over200); //[{name:'b' , price: 200},{name:'c' , price: 300}]

// -- 추상화 -- 
const filter = (f, iter) => {
  const res = [];
  for (const a of iter) {
    if(f(a)) res.push(a)
  }
  return res;
}

log(filter(p=>p.price >= 200,products)); //[{name:'b' , price: 200},{name:'c' , price: 300}]

```