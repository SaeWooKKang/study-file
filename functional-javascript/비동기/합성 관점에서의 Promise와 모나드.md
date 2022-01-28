# 합성 관점에서의 Promise와 모나드

## 모나드 

- 모나드는 함수 합성을 안전하게 하기 위한 도구    
- 모나드는 박스라고 보면 됨  
- 어떤 값이 들어올지 모르는 함수에 대하서 어떻게 안전하게 합성을 할 수 있을까 

공통
``` javascript
const g = a => a + 1;
const f = a => a * a;
```

``` javascript
// 값을 배열에 담아 배열의 메서드를 통해 합성을 안전하게 함.
[1].map(g).map(f).forEach(a => console.log(a)); // forEach를 통해 효과를 만들음.
[].map(g).map(f).forEach(a => console.log(a)); // 효과를 아예 일으키지 않음
```

### Promise

``` javascript
// 프로미스는 비동기적으로 일어나는(특정 시점에 일어나는) 상황을 안전하게 합성하기 위한도구
Promise.resolve(1).then(g).then(f).then(console.log) // 4 

// 프로미스는 값이 있거나 없거나의 관점이 아니다.
Promise.resolve().then(g).then(f).then(console.log) // NaN
```