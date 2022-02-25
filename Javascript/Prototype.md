# Prototype

js는 **객체지향 프로그래밍 언어**이고 객체지향 프로그래밍은   객체(상태 + 동작)의 집합으로 프로그램은 표현한 것이다. 객체지향 프로그래밍에서 중요한 것이 **상속**을 통한 재사용(중복 제거 효과) 인데, js는 **prototype 기반**(어떤 객체를 원형으로 삼고 이를 참조)으로 상속을 구현한다.

#### prototype 체인
prototype 체인은 js가 객체지향 프로그래밍의 상속을 구현하는 매커니즘이다.

### 예시 

``` javascript
const Person = function(name) {
  this.name = name;
};
Person.prototype.getName = function () {
  return this.name;
}

// me 객체는 Person 생성자 함수로 생성된 인스턴스 
const me = new Person('chulsu');
me.__proto__ === Person.prototype // true

// Person 사용자 정의 생성자 함수는 함수 리터럴 표기법으로 생성되었다. 
// 함수 리터럴 표기법으로 생성된 함수도 Function 생성자 함수로 생성된다.
Person instanceof Function // true

// Function 생성자함수는 Object 생성자 함수로 생성된다.
Function instanceof Object // true

// me.__proto__.getName()으로 호출해야 하는게 맞지만, 이렇게 되면 undefined를 반환한다.
// this가 me.__proto__이고, me.__proto__는 getName 프로퍼티를 갖고 있지 않기 때문이다. 
me.__proto__getName(); // undefined

// 정상적으로 작동한다. js에서     __proto__는 생략가능한 프로퍼티이기 때문이다. 
me.getName(); //chulsu

// 따라서 인스턴스는 자신의 prototyoe property를 자신의 프로퍼티 치럼 참조할 수 있다. 
me.hasOwnproperty('getName') // false
Object.hasOwnProperty.call(Person.prototype, 'getName'); // true
```
> \_\_proto__ -> \[[prototype]] -> prototype

1. Function instanceof Object은 true이고,
2. Person instanceof Function이다. 
3. Person 생성자 함수는 new 키워드로 인스턴스인 me 객체를 만든다.   
4. 객체는 prototype 체이닝을 통해서 Object.prototype에 존재하는 \_\_proto__ 접근자 property를 자신의 소유 property처럼 사용할 수 있다. 
5. __proto__는 \[[prototype]] 내부슬롯을 참조하고, \[[prototype]]은 prototype을 참조한다.  

### 객체의 __proto__와 함수의 prototype 프로퍼티
__proto__와 함수의 protype 프로퍼티 모두 프로토타입을 참조한다.

하지만 사용 목적이 다르다. 
- 함수의 prototype 프로퍼티
  - 인스턴스가 상속할 프로퍼티나 메서드를 정의하는데 사용
- 객체의 \_\_proto__
  - prototype 체이닝시 사용된다. 

### 생성자 함수, prototype, constructor 생성시기
함수가 평가되어 함수 객체(화살표 함수, ES6의 메서드 축약표현 제외)가 생성될 때 함수의 프로퍼티로 prototype이 생성되고, 함수.prototype 객체에 함수를 가리키는 constuctor 프로퍼티가 생성된다.