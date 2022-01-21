# find

- 조건에 만족하는 첫 번째 값을 배열에 담아 반환.

``` javascript 
// take 함수를 활용한 join

const find = (f, iter) => go(
  iter,
  filter(f),
  take(1)
);
```

``` javascript
// 지연성 
const find = (f, iter) => go(
  iter,
  L.filter(f),
  take(1)
);
```

## 예시

``` javascript
const users = [
  {age: 20},
  {age: 23},
  {age: 25},
  {age: 30},
  {age: 35},
  {age: 40}
];

find(a => a.age > 23, user); // {age: 25}
```