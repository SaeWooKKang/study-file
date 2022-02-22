# fetch 

## fetch 란 ?
- Http 요청 전송 기능을 제공하는 client API입니다.  
- 사용하기 쉽고, 프로미스를 반환하므로 콜백 패턴의 단점에서 유리합니다. 
- 내장 API입니다.

## fetch 와 axios의 차이점은 ?
- fetch는 내장 API이고, axios는 모듈을 다운 받아야한다.
- axios가 좀 더 추상화가 잘 되어 있다.
- option부분이 조금 다른데 fetch는 url을 인수로 전달하는 반면, axios는 option 객체의 프로퍼티로 전달한다. 
- fetch는 body프로퍼티에 값을 JSON.stringify로 직렬화하고, axios는 data프로퍼티를 사용한다.

