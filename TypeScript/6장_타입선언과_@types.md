# 6장: 타입 선언과 @types

- TS에서 의존성이 어떻게 동작하는지, 의존성에 대한 개념을 잡을 수 있다. 

#### 아이템 45: devDependencies에 typescript와 @types 추가하기 
요약
- @types 라이브러리는 타입 정보만 포함하고 있다. 구현체 포함 x 
- typescript를 시스템 레벨 설치하지말고 devDependencies에 넣어 관리하자(팀원들과 버전 동기화)
이해 
- @types가 뭔지 몰랐는데 사용하는 라이브러리에 type 정보가 포함되어 있지 않더라도 커뮤니티에 의해 유지보수되는(DefinitelyTyped) 타입 정보를 다운 받을 수 있게 해주는거군
- dependencies devDependencies 어디에 추가해야 할 지 몰랐는데 typescript는 개발 도구일 뿐이고 런타임에 존재 하지 않으므로 일반적으로 devDependencies에 추가 하면 되는구나!

#### 아이템 46: 타입 선언과 관련된 세 가지 버전 이해하기 
요약
- typescript와 라이브러리 @types 버전을 일치시키자 
이해
- 의존성 관리에 대해 배울 수 있었다. 
- 버전 일치 시키자 

#### 아이템 47: 공개 API에 등장하는 모든 타입을 익스포트하기
이해
- 라이브러리를 사용할 때 타입을 직접 임포트 할 수 없는 경우
- 함수 시그니처에 등장했던 타입들을 Parameters와 ReturnType 제너릭을 이용하여 추출할 수 있다. 

#### 아이템 48: API 주석에 TSDoc 사용하기 
이해
- JSDoc을 TS 관점에서 TSDoc이라고 부르는 것
- 주석을 달 땐 TSDoc 형태로 달자 
- 마크다운도 사용가능 

#### 아이템 51: 오버로딩 타입보다는 조건부 타입을 사용하기
요약
- 오버로딩 타입이 작성하기 쉽지만 조건부 타입 이용하자 
- 조건부 타입은 타입 공간의 if문과 같다. 

#### 아이템 53: 타입스크립트 기능보다는 ECMAScript 기능을 사용하기 
요약
- JS 초기 버전에는 개선할 점들이 많았다 
- JS 초기에 TS는 독립적으로 개발했던 기능이 있다.
- JS는 후에 부족했던 기능들을 내장기능으로 추가 함
- 따라서 호환성 문제가 발생할 수 있는 열거형, 매개변수 속성, 트리플 슬래시 임포트, 데코레이터는 사용하지 않는것이 좋다. 

이해
- 문자열 enum(열거형)을 사용하고 싶다면 리터럴 타입의 유니온을 사용하자 

#### 아이템 54: 객체를 순회하는 노하우 
요약
- 객체의 키가 어떤 타입인지 안다면 let k: keyof T or keyof typeof __ 사용하자 
- 타입 문제없이 객체의 키와 값을 순회하고 싶다면 Object.entries를 사용하자 
  - key는 string, value는 any로 추론됨 

- 이해 
keyof typeof를 나란히 쓴 예제를 통해 typeof의 개념을 확실히 함

#### 아이템 55: DOM 계층 구조 이해하기 
요약
- Event의 currentTarget 속성의 타입은 EventTarget | null
- childern은 HTMLCollection
- childNodes는 NodeList (배열과 유사한 Node의 컬렉션)