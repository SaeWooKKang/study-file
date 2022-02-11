# Execution Context

js의 동작 원리를 담고있는 핵심 개념  

실행 컨택스트를 이해하면 다음을 이해할 수 있음.  

1. 스코프 기반 식별자에 바인딩 된 값을 관리하는 방식
2. 호이스팅 발생 이유
3. 클로저의 동작 방식
4. 비동기 처리의 동작 방식

## 실행 컨택스트 구성

1. VariableEnvironment  
    1. environmentRecord(snapshot)
    2. outerEnvironmentReference(snapshot)
2. LexicalEnvironment
    1. environmentRecord
    2. outerEnvironmentReference
3. ThisBinding

#### 실행 컨택스트의 스택(콜 스택)  
- 코드의 **실행 순서를 관리**한다. 

### Lexical Environment  
- 식별자와 식별자에 바인딩 된 값, 상위 스코프에 대한 참조를 기록하는 자료구조.  
- 스코프와 식별자를 관리한다.  
- 키와 값을 갖는 객체 형태의 스코프를 생성하여 식별자와 값을 관리  

#### Environment Record
- 식별자와 값 관리  
- 컨택스트 생성 후 환경 정보를 수집하는데 이 때문에 **호이스팅**이 발생하게 됨  
> 실행 컨텍스트 생성후 환경정보 수집하고 수집이 다 되면 콜 스택에 푸시되어 런타임이 시작되는데 식별자 정보를 이미 알고 있기 때문에 호이스팅이 되는것 
#### Outer Lexical Environment Reference
- 함수 정의가 평가되는 시점에 상위 Lexical Environment Record를 참조함   
- **스코프 체인을 가능**하게 함



실행 컨텍스트 생성이 평가 과정이다

### 블럭 레벨 스코프 
**var**  
var 키워드로 선언한 변수는 함수 내에서만 지역 변수로 사용 되고 if문에서 선언한 경우 전역 변수로 선언된다.

**let**, **const**  
let, const 키워드는 블록 안에서 선언 되면 지역 레벨 스코프를 갖는다.
> 해당 블록의 실행이 종료되면 참조가 사라짐 


``` javascript
let x = 1;

if(true) {
  let x = 10;
  log(x); // 10
}
log(x); // 1
```

블록을 만나게 되면 새로운 Lexical Environment을 생성하고 기존 실행컨테스트의 L.E의 참조를 새로운 L.E로 참조를 변경한다. 
