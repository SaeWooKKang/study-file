# async / await
- 비동기 처리 결과를 후속처리 메서드로 처리할 필요가 없이 마치 동기처리 처럼 프로미스를 사용할 수 있음.

### async 함수
- 항상 프로미스 반환
- 반환값이 없더라도 프로미스 반환
- 반환 값이 있으면 Promise.resolve로 감싸서 반환

### await 키워드
- 프로미스 앞에서 사용해야 함
- 프로미스가 setteld 상태까지 기다리고, Promise값 꺼내는 역할 

### 에러처리 
```
에러는 호출자 방향으로 전파 되는데, 비동기 처리를 위한 콜백 패턴에서 콜백함수를 호출한 것은 비동기 함수가 아니기 때문에  
cb에서 발생한 에러를 try...catch문으로 에러 캐치 불가  
비동기 요청은 web api가 수행하고 완료되면 cb함수를 task queue에 push, 콜스택이 비면 event loop에 의해 콜스택에  push되므로 아래로 전파시 전역 실행 컨택스트에서 catch 하지 못함.  
```

반면에 async/await는 에러 처리를  try...catch 문을 사용할 수 있음.  
프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 떄문에 호출자가 명확함.  

``` javascript
  function delay(a) {
    return new Promise(resolve => setTimeout(() => resolve(a), 500));
  }

  async function delayIdentity(a) {
    await delay(500);
    return a;
  }

  async function f1() {
    const a = await delay(10);
    log(a); // await 사용시 프로미스가 값으로 풀어짐 //10
  }

  f1();
```

``` javascript
// 함수 내부에서 로직이 끝나면 상관 없지만 
async function f1() {
    const a = await delayIdentity(10);
    const b = await delayIdentity(5);

    return a + b; // 함수 내부에서만 값으로 풀어지고, 프로미스로 감싸서 리턴함
  }
  log(f1()); // Promise 
```

``` javascript
// 반환 하는 값을 사용하려면 프로미스를 반환하므로 후속 메서드를 사용해야 함.
// async 함수는 프로미스를 반환
async function f1() {

  const a = 10;
  const b = 15;
  // log(a + b);
  return a + b;
}
log(f1()); // promise {<fulfilled>: 25}
f1().then(log); // 25
```

``` javascript
const pa = Promise.resolve(10);

(async () => {
  log(await pa); // await 뒤에 프로미스로 평가 
}) (); // 10
```

