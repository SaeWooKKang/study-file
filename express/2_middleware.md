# middleware

- Express.js 동작의 핵심
- HTTP 요청과 응답 사이에서 단계별로 동작을 수행해주는 함수

- req: HTTP 요청을 처리하는 객체
- res: HTTP 응답을 처리하는 객체
- next: 다음 미들웨어를 실행하는 함수

- Route Handler도 미들웨어의 한 종류
- Route Handler는 라우팅 함수(get,post,put,delete)에 적용된 미들웨어  

## middleware 종류
적용되는 위치에 따라서 다음과 같이 나뉘는데  
- 어플리케이션 미들웨어
- 라우터 미들웨어
- 오류처리 미들웨어
  - 일반적으로 가장 마지막에 위치함
  - err, req, res, next 인자를 가짐
  - next 함수에 인자가 전달되면 실행됨
- 미들웨어 서브 스택
  - 인자에 여러 미들웨어를 작성하는 것
- 함수형 미들웨어
  - ex)auth
필요한 동작 방식에 따라 적용할 위치를 결정하면 됨