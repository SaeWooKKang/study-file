# TS로 마이그레이션하기 

#### 아이템 58: 모던 자바스크립트로 작성하기 
요약
- 최신 JS 문법 사용해라

이해 
- ES6 설명임 

#### 아이템 59: 타입스크립트 도입 전에 @ts-check와 JSDoc으로 실험해 보기
이해
- @ts-check 사용한 경우 발견할 수 있는 오류
  - 타입 불일치
  - 매개변수 불일치 
  - 선언되지 않은 전역 변수 
- .js 파일에 // @ts-check를 추가하면 자바스크립트 파일에서도 타입 체크를 수행할 수 있다. 
- JSDoc 주석을 활용하여 .js파일에서 타입 단언과 타입 추론을 할 수 있다.

이해
- @ts-check와 JSDoc을 적용하면 코드 아래서 부터 점진적으로 적용할 수 있겠군 
- 한 파일이 길지 않은 이상 그냥 .ts 변경해도 될것 같은데 ..?

#### 아이템 60: allowJs로 타입스크립트와 자바스크립트 같이 사용하기
이해
- allowJs는 TS와 JS 함께 쓸 수 있는 설정인줄 알았는데 
- allowJs는 타입 체크와 관련이 없고 기존 빌드 과정에 TS 컴파일러를 추가하기 위해서 필요한 옵션이었군

#### 아이템 61: 의존성 관계에 따라 모듈 단위로 전환하기 
요약
1. 서드파티 모듈, 외부 API 호출에 대한 @types 추가 
2. 의존성 관계도의 아래에서부터 위로 (유틸 함수 먼저)
3. 이상한 설계 중간에 리팩터링 x  -> 목록 만들어두고 나중에

이해
- 구조 변경하면서 작업하고 있었는데 나중에 하는게 좋을것 같다. 
- 일단 TS 전환에 집중

#### 62: 마이그레이션의 완성을 위해 noImplicitAny 설정하기 
이해
- .ts로 전환했더라도 마지막 단계가 남았다. 
- 마지막 단계에서 noImplicitAny 설정하기 
- 미설정시 타입 체크가 매우 허술하다. 