# XMLHttpRequest

XMLHttpRequest 객체를 사용한 HTTP 요청

``` javascript 
// 객체 생성
const xhr = new XMLHttpRequest();
```

### XMLHttpRequest 객체의 프로토타입 프로퍼티

- readyState
- status
- statusText
- responseType
- response


### XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티

- onreadystateChange
- onerror
- onload

### XMLHtppRequest 객체의 메서드

- open
- send
- abort
- setRequestHeader

### XMLHttpRequst 객체의 정적 프로퍼티

- DONE

## HTTP 요청 전송 순서
``` javascript 
const xhr = XMLHttpRequest(); // XMLHttpRequest 객체 생성

xhr.open('GET', '<url>'); // 요청 초기화

xhr.setRequestHeader('content-type', 'application/json'); //Http 요청 헤더 설정

xhr.send('<payload>') // HTTP 요청 전송
```

## HTTP 응답 처리

``` javascript 
const xhr = XMLHttpRequest();

xhr.open('GET', '<url>');

xhr.send();

// readystatechange 이벤트로 응답 캐치
xhr.onreadystatechange = () => { // 이벤트 핸들러 프로퍼티
  if(xhr.readyState !== XMLHttpRequest.DONE) return; // 요청이 끝나고

  if(xhr.staus === 200) { // 정상적으로 응답된 상태
    console.log(JSON.parse(xhr.response)); // xhr.response 프로퍼티에 응답 결과가 담김
  } else { // 에러 처리
    console.error('Error', xhr.status, xhr.statusText);
  }
};

// load 이벤트로 응답 캐치
xhr.onload = () => {
  // 요청이 성공적으로 완료된 경우 발생
   if(xhr.staus === 200) { 
    console.log(JSON.parse(xhr.response));
  } else { 
    console.error('Error', xhr.status, xhr.statusText);
  }
}
```