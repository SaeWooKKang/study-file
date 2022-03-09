# reduce 하나보다 map + filter + reduce 

``` javascript
const users = [
  {name: 'AA', age: 35},
  {name: 'BB', age: 26},
  {name: 'CC', age: 28},
  {name: 'DD', age: 34},
  {name: 'EE', age: 23}
];

// 30세 이상의 합산을 구하겠다.
// 리듀스의 보조함수를 고치는 식으로 많이 작성을 했었음 

// 이걸
log(
  _.reduce((total, u) => total + u.age, 0, users)
);

// 이렇게
log(
  _.reduce((total, u) => {
    if (u.age >= 30) return total;
    return total + u.age;
    },
    0, 
    users)); 

// 코드가 간결해 보이는거지 실제로 로직이 간결해지는것은 아님
// 코드 변형이 까다로움
log(
  _.reduce((total, u) => u.age >= 30 ? total : total + u.age, 0, users)
  );

// map + filter + reduce 사용하여 간결하게 
log(
  _.reduce(add,
    _.filter(a => a < 31, 
      _.map(u => u.age, users)))
);
```