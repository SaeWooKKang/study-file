# fetch

- **HTTP 요청 전송 기능** 제공 
- Web APi
- XMLHttpRequst 객체보다 사용이 간단하다
- 프로미스 지원

> fetch 함수는 HTTP 응답을 나타내는 Response 객체를 랩핑한 프로미스를 반환
> response 객체는 프로토타입 메서드로 Response.prototype.json같은 다양한 메서드가 있다.

## GET 요청
``` javascript
fetch('<url>')
  .then(response => response.json())  // 응답 몸체를 취득하여 역직렬화
  .then(obj => console.log(obj));
```
