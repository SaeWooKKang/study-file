# 이터레이션 프로토콜 탄생 배경
ES6 이전에는 통일된 규약 없이 컬렉션(자료구조)을 순회 하였음  
ES6에서는 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for...of문, 스프레드 문법, 배열 디스트럭처링 할당을 사용할 수 있도록 일원화 함.

> 일급함수 : 함수가 값으로 다뤄질 수 있다.  
> 고차함수 : 함수를 값으로 다루는 함수

빌트인 심볼 값 = Well-known Symbol = Symbol.iterator

### 이터러블
*  iterator를 리턴하는 \[Symbol.iterator]()를 가진 값

### 이터레이터
* {value, done} 객체(이터레이터 리절트 객체)를 리턴하는 next() 를 가진 값

## for...of 문

for (변수선언문 in 이터러블){...}

내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for...of문의 변수에 할당한다.

## 사용자 정의 이터러블

```javascript
const iterable = {
  //Symbol.iterator 메서드를 구현하여 이터러블 프로토콜 준수
  [Symbol.iterator](){
    let i = 3;
    return {
      // next 메서드는 이터레이터 리절트 객체를 반환
      next(){
        return i == 0 ? {done:true} ! {value: i--, done:false }
      },
      [Symbloe.iterator](){
        return this;
      }
    }
  }
};
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); //{value: 3, done:false}
console.log(iterator.next()); //{value: 2, done:false}
console.log(iterator.next()); //{value: 1, done:false}

for (const a of iterator) console.log(a); // 3  2  1
```
