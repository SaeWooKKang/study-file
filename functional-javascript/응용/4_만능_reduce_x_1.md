#  (reduce + 복잡한 함수 + acc) 보다 (map + 간단한 함수 + reduce)
- 명령형 습관 지우기 
- 만능 reduce? No !

``` javascript
const users = [
  {name: 'AA', age: 35},
  {name: 'BB', age: 26},
  {name: 'CC', age: 28},
  {name: 'DD', age: 34},
  {name: 'EE', age: 23}
];
console.log(
  _.reduce((total, u) => total + u.age, 0, users)
);

// 시작값이 없는 리듀스가 더 좋은 리듀스 
// a, b 의 값의 형을 같게 해주는게 좋음
console.log(
  _.reduce((a, b) => a + b, _.map(u=> u.age, users))
);

// 원래 있는 간단한 함수로 대체 될 수 있음 

const add = (a, b) => a + b;

console.log(
  _.reduce(add, _.map(u=> u.age, users))
);

```