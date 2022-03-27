# CORS(Cross Origin Resource Sharing)

#### SOP(Same Origin Policy)
```
Same Origin: protocol + port + host가 같아야함
```
보안상의 이유로 브라우저는 교차출처(서로 다른 주소) HTTP 요청을 제한함.  

XMLHttpRequest, Fetch API는 동일 출처 정책을 따름   

## CORS 
- 추가 HTTP 헤더를 사용
- CORS 정책을 지키면 교차 출처 가능 
- 웹 애플리케이션은 리소스가 자신의 출처와 다를 때 교차 출처 HTTP 요청을 실행함