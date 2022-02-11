# Closure

## 함수 객체의 [[Environment]]

함수 호출시 Lexical scope가 가능하려면 [[Environment]] 내부슬롯에 자신이 정의된 환경의 참조를 저장 해야함  

```
함수 정의가 평가되어 함수 객체 생성시 [[Environment]]에 자신이 정의된 Lexical 환경의 참조 저장  
함수 호출시 L.E의 OuterEnvironmentReference에 [[Environment]]에 저장된 참조값 연결    
```
## 클로저 
클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 **함수**를 말한다.

``` javascript
const x = 1;

function outer() {
  const x = 10;
  const inner = function () { console.log(x); };
  return inner;
}

const innerFunc = outer();
innerFunc();
```
outer 함수는 런타임에 호출되어 inner 함수를 반환하는데 outer함수가 종료되어 콜스택에서 pop되어도 전역변수 innerFunc이 참고 하고 있기 때문에 Outer 함수의 Lecical 환경은 제거 되지 않는다.  
또한 outer함수가 반환한 inner함수는 평가 당시의 Lexical 환경을 [[Environment]]에 기억 하고 있으므로 함수 호출시 L.E의 OuterLecicalEnvironmentReference의 내부슬롯에 참조값을 연결하여 스코프 체이닝을 가능하게 함.

### 클로저 활용 
- 클로저는 상태를 안전하게 변경하고, 유지하기 위해 사용
- 상태를 안전하게 은닉, 특정 함수에게만 상태 변경을 허용

``` javascript
const increase = (() => {
  let num = 0;

  return () => ++num;
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

``` javascript
const counter = (() => {
  let counter = 0;

  return predicate => {
    counter = predicate(counter);
    return counter;
  };
})();

const increase = n => ++n;
const decrease = n => --n;

console.log(counter(increase));
console.log(counter(increase));

console.log(counter(decrease));
console.log(counter(decrease));

```
counter 전역 변수에 할당된 익명함수의 [[Environment]] 내부슬롯에서 즉시실행함수의 L.E를 참조하고 있다. counter 함수가 실행되면 counter함수의 L.E의 Outer Lexical Environment Reference가 즉시실행 함수의 L.E를 가리킴으로 스코프 체이닝을 통해 counter값 접근, 변경 가능
> 전역변수 counter가 L.E 참고 하고 있으므로 계속 살아 있음 
