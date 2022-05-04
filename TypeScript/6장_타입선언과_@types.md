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