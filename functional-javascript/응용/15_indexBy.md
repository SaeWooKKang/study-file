# indexBy

``` javascript
  const users = [
    {id: 5, name: 'AA', age: 35},
    {id: 10, name: 'BB', age: 25},
    {id: 19, name: 'CC', age: 15},
    {id: 24, name: 'DD', age: 45},
    {id: 30, name: 'EE', age: 65},
  ];


// users를 순회하면서 19를 만날때까지 순회함 
log(
  _.find(a => a.id === 19, users)
);
```

## indexBy
``` javascript
// 이후에 여러번 순회를 할 것 같은 상황이라면 인덱스로 한 번 쭉 순회하고 
// 후에는 배열을 순회하는것이 아닌 키값으로 원하는 값 찾기 

// 함수의 결과 값으로 인덱스 설정 
_.indexBy = (f, iter) => 
  _.reduce((obj, a) => (obj[f(a)] = a, obj), {}, iter);

const user2 = _.indexBy(u => u.id, users);

log(user2); // {5: {…}, 10: {…}, 19: {…}, 24: {…}, 30: {…}}

// 순회하는것이 아닌 바로, 한 번에 찾을 수 있음 
log(user2[19]);
```