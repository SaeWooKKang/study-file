## 제너레이터

### 특징

* 제너레이터는 제어권이 호출자에게 양도할 수 있고, 함수와 상태를 주고 받을 수 있음.
* 제너레이터 호출시 제너레이터 객체 반환

> 제너레이터 객체는 이터러블이면서 이터레이터임

### 정의 
function* 키워드 사용

> function 과 함수 이름 사이에 * 추가 

``` javascript
function* generator(){
  yield 1;
  yield 2;
  yield 3;
}
```
## 제너레이터 객체 

 제너레이터 객체는 이터러블이면서 이터레이터

```javascript
  // 제너레이터 호출로 반환된 제너레이터 객체는 이터레이터 이므로 next() 사용가능 
  const iter1 = generator(); // 제너레이터 객체 반환 
  console.log(iter1.next()); // {value: 1, done: false}
  console.log(iter1.next()); // {value: 2, done: false}
  console.log(iter1.next()); // {value: 3, done: false}
  console.log(iter1.next()); // {value: undefined, done: true}

  // 제너레이터 호출로 반환된 제너레이터 객체는 이터러블이므로 for...of문으로 순회 가능 
  for (const a of iter1) console.log(a) // 1 2 3

 ``` 