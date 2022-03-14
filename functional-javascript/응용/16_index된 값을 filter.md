``` javascript
const users = [
  {id: 5, name: 'AA', age: 35},
  {id: 10, name: 'BB', age: 25},
  {id: 19, name: 'CC', age: 15},
  {id: 24, name: 'DD', age: 45},
  {id: 30, name: 'EE', age: 65},
];

// 인덱스 설정하고
// {5: {…}, 10: {…}, 19: {…}, 24: {…}, 30: {…}}
const user2 = _.indexBy(u => u.id, users); 

// 인덱스 설정된 객체를 프로그래밍 하는 방법
const user3 = _.go(
  user2,
  L.entries, // [Array(2), Array(2), Array(2), Array(2), Array(2)]
  L.filter(([_, {age}]) => age < 30), // [[['10', {…}]], []]
  L.take(2),
  _.object,
);

console.log(user3[19]);
```