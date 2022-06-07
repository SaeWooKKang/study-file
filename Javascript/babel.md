# babel

## babel이란 ?
- Babel is a Javascript compiler
- 바벨은 컴파일 결과 js로 만들어 줌 

## 역할
- 트랜스파일러 (코드를 재작성)
- 하위 호환성 재공

> 컴파일러는 특정 프로그래밍 언어로 쓰여 있는 문서를 다른 프로그래밍 언어로 옮기는 언어 번역 프로그램을 말한다 (위키백과)

## 왜 사용 할까 ?
- 급변하는 js언어의 최신 문법에 대해 하위 호환성을 지원하기 위해서
- React에서의 jsx를 브라우저가 이해할 수 있는 js로 바꾸기 위해서
- Typescript -> js 등등

#### 추가적 
- babel
  - babel은 문법을 js로 변환하는 transpiler 역할 
- babel-polyfil 
  - ES6에서 추가된 Promise, 기타등등 ES5 사양으로 트랜스파일링해도 ES5 사양에 대체할 기능이 없기 때믄에 이를 지원하기 위해 사용