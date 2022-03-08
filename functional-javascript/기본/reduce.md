# reduce 구현

#### 한 값으로 축약
```javascript
const log = console.log

const numbers = [1,2,3,4,5];

let sum = 0;

for (const num of numbers) {
  sum = sum + num;
}
  log(sum); // 15
```

#### 추상화
```javascript
// 사용자로부터 초깃값을 입력받음
const numbers = [1,2,3,4,5];

const reduce = (f, acc, iter) => {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}
const add = (a,b) => a + b;

log(reduce(add, 0, numbers)); // 15
```

#### 추상화2
```javascript
// 초깃값을 입력받지 않고, 이터러블에서 뽑아 만들음
const numbers = [1,2,3,4,5];

const reduce = (f, acc, iter) => {
  if(!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}
const add = (a,b) => a + b;

log(reduce(add, numbers)); // 15

// reduce(add,[1,2,3,4,5]) ->
// reduce(add, 1, [2,3,4,5])ㅍ
```

#### 복잡한 데이터 축약
``` javascript
const log = console.log

const products = [
  {name: 'a', price: 100},
  {name: 'b', price: 200},
  {name: 'c', price: 300},
];

const reduce = (f, arr, iter) => {
  if(!iter) {
    iter = arr[Symbol.iterator]();
    arr = iter.next().value;
  }
  
  for (const a of iter) {
    arr = f(arr,a); 
  }
  
  return arr;
}

log(
  reduce(
    (total_price,product) => total_price + product.price,
      0,
    products));
```