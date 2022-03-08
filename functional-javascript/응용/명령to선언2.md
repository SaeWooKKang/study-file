## while문을 range로 

``` javascript
// 명령형
function f1(end) {
  let i = 1;
  while (i < end) {
    console.log(i);
    i += 2;
  }
}
f1(10);

// 선언형
function f2(end) {
  _.each(console.log, L.range(1, end, 2));
}
f2(10);
```

## each

- 효과를 each로 구분
- 순수한 영역과 외부에 영향을 주는부분 구분
- each를 사용한다는것은 반드시 부수효과가 있다. 

``` javascript
const foo = _.each(console.log, [1,2,3,4]);
console.log(foo); // 인자로 받은 배열 그대로 반환 -> 외부에 영향을 준다고 보면 됨

function f3(end) {
  _.go(
    L.range(1, end, 2), // 순수 영역
    _.each(console.log) // each 함수의 결과로 부수효과 구분 
  );
}
f3(10);
```