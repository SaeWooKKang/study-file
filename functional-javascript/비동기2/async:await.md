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

