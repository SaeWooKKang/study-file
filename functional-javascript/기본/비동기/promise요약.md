# Promise 요약

```
비동기 요청의 처리 상태와 처리 결과를 관리하는 객체 
```

### Promise 생성자 함수는 인수로 콜백함수를 전달 받음. 
``` javascript 
const promise = new Promise(() => {});
```

### 콜백함수는 인수로 resolve, reject 함수를 전달 받음.
``` javascript
const promise = new Promise((resolve, reject) => {});
```

### 비동기 로직은 콜백함수 내부에서 처리 
``` javascript 
const promise = new Promise((resolve, reject) => {
   if(/* 비동기 처리 성공  */){
     resolve(/* 결과 값 */);
   } else { // 비동기 처리 실패
      reject(/* 실패 이유 */);
   }
});
```

### Promise의 상태 정보

- pending : 기본 상태 
- fulfilled : resolve 함수 호출시 
- rejected : reject 함수 호출시 
> 모든 후속 처리 메서드는 프로미스 반환

### Promise 후속 처리 메서드
- 비동기적으로 실행(콜 스택 이후 실행)
- 프로미스 반환

#### then 
- 두 개의 콜백함수를 인수로 전달받음 

##### 인수
- **첫 번째 콜백함수**는 프로미스 상태가 **fulfilled**시 호출
- **두 번째 콜백함수**는 프로미스 상태가 **rejected**시 호출

``` javascript
.then(() => {}, () => {}) 
```

#### catch 
- 한 개의 콜백함수를 인수로 전달받음
- 프로미스 상태가 rejected시 호출

#### finally
- 한 개의 콜백함수를 인수로 전달받음
- 프로미스의 상태와 상관없이 **무조건 한 번 실행**
 
### Promise 에러 처리 
- 후속 처리 메서드 사용

##### 1. then 함수의 두번째 인수 사용
``` javascript
promiseGet(wrongUrl).then(
  res => console.log(res),
  err => console.error(err)
);
```

##### 2. catch 함수 사용
- then 함수의 오류까지 캐치

```javascript
promiseGet(wrongUrl)
  .then(res => console.log(res))
  .catch(err => console.err(err));
```

### Promise 체이닝
- then 핸들러에서 값을 반환하는 경우 Promise.resolve(<값>)을 반환하는것과 같다.

#### 설명
- 후속 처리 메서드의 반환 값이 프로미스라면 프로미스를 반환하고, 프로미스가 아니라면 resolve해서 반환  
- 즉 resolve(<값>) 형태이므로 프로미스를 반환하고, 프로미스의 처리상태는 **fulfilled**이다.

``` javascript
const p1 = Promise.resolve(1000); // {<fulfilled>: 1000}

const p2 = Promise.resolve(1000).then(res => res + 1); // {<fulfilled>: 1001}
```

``` javascript
Promise.resolve('foo')
  .then(string => new Promise(resolve => 
    setTimeout(()=>{
      string += 'bar';
      resolve(string);
    },1)))
  .then(string => {
    setTimeout(()=>{
      string += 'baz';
      console.log(string); // 3
    }, 1);
    return string;
  })
  .then(string => {
    console.log("마지막..."); // 1 
    console.log(string); // 2
  });
```

### Promise 정적 메서드

##### 1. Promise.resolve
- 전달받은 값을 프로미스로 랩핑 함.

다음은 동일하게 동작 한다.  
``` javascript
const p1 = Promise.resolve(2);
console.log(1);
p1.then(log); // 2

// 동일하게 동작
const p1 = new Promise(resolve => resolve(2));
console.log(1);
p1.then(log);
```
실행 순서: 1 -> 2
**설명**  
1. 프로미스 생성자 함수의 콜백함수가 실행
2. resolve 함수가 실행되어 p1는 fulfilled 상태, 값 2인 프로미스 객체임
3. console.log(1) 실행
4. 후속처리메서드 then실행, 콜백함수 bg에 넘김
5. 후속처리 메서드의 특정 조건 fulfilled를 만족했으므로 마이크로 태스크 큐에 프로미스 값과 후속처리 메서드의 콜백함수 넘김
6. 전역 콜스택 비면, 이벤트 루프에 의해 마이크로 큐에있는 함수 콜스택에 푸시 
7. 콘솔 함수 실행, 2찍고 pop됨
##### 2. Promise.reject
- 전달받은 값을 프로미스로 랩핑 함.
``` javascript 
const rejected = Promise.reject(new Error('error!'));
rejected.catch(log);

// 동일하게 동작
const rejected = new Promise((_, reject) => reject(new Error('error!')));
rejected.catch(log);
```

##### 3. Promise.all
- 병렬 처리
- 처리 순서 보장
- rejected 상태가 되면 reject하는 새로운 프로미스 즉시 반환

###### <공통 코드>
``` javascript
const requestData1 = () => new Promise(resolve => 
  setTimeout(() => resolve(1), 3000));
const requestData2 = () => new Promise(resolve => 
  setTimeout(() => resolve(2), 2000));
const requestData3 = () => new Promise(resolve => 
  setTimeout(() => resolve(3), 1000));  
const requestData4 = () => new Promise((_, reject) => 
  setTimeout(() => reject(new Error("error!")), 1000));  
```

프로미스를 요소로 갖는 이터러블을 인수로 받음
- 인수가 프로미스가 아닐경우 Promise.resolve로 래핑
``` javascript
Promise.all([requestData1(), requestData2(), requestData3()])
```

전달받은 프로미스가 모두 fulfilled 상태가 되면 결과를 배열에 저장해 프로미스 반환
``` javascript
Promise.all([requestData1(), requestData2(), requestData3()])
  .then(log) // [1, 2, 3]
```
##### 4. Promise.race 

- 프로미스를 요소로 갖는 이터러블을 인수로 받음
- rejected 상태가 되면 reject하는 새로운 프로미스 즉시 반환  

가장 먼저 fulfilled 상태가 된 프로미스의 결과를 resolve
``` javascript
Promise.race([requestData1(), requestData2(), requestData3()])
  .then(log); // 3
```

##### 5. Promise.allSettled

- 프로미스를 요소로 갖는 이터러블을 인수로 받음
- 전달받은 요소가 모두 settled 상태가 되면 처리결과 배열로 반환
- 반환값은 프로미스

``` javascript
// Promise + 후속처리 메서드
Promise.allsettled( [requestData1(), requestData4()] )
  .then(consol.log);
  // [
  //  {status: 'fulfilled', value: 1}
  //  {status: 'rejected', reason: Error...}
  // ]

// Promise + await
const p = await Promise.allsettled( [requestData1(), requestData4()] )
console.log(p);
```

### 프로미스 처리 순서

``` javascript
const promise = new Promise(resolve => setTimeout(()=>resolve(5), 1000));

p1.then(log);
log('전역 콜스택');

// 출력 순서
// 1. 전역 콜스택 
// 2. 5
```
##### 새로운 이해(22.06.06)
1. 전역 콜스택
2. 프로미스 생성자 함수의 콜백함수 실행(프로미스 생성자함수는 동기임)
3. setTimeout 함수가 실행되고 인자들을 bg에 넘기고 실행 종료
4. 후속 처리 메서드 then이 실행되어 콜백함수 bg에 넘기고 실행 종료
5. '전역 콜스택' 출력
6. 전역 콜스택 종료
7. bg에서는 특정 조건 만족후 큐로 넘기는데 setTimeout 함수의 조건 1 초후 bg에서 매크로 큐로 콜백함수 넘김 
8. 이벤트 루프는 콜스택이 비었으므로 매크로 큐에 있는 함수를 콜스택에 푸시
9. resolve 함수가 실행되어 후속처리메서드의 특정조건 fulfilled가 되었으므로 bg에서 마이크로 태스크 큐로 넘김 
10. setTimeout 함수의 콜백함수가 pop되고 콜스택이 비면 이벤트 루프는 마이크로 태스크 큐에있는 then의 콜백함수를 콜 스택에 푸시 
11. 5 출력 후 콜스택에서 pop

##### 이전의 이해
1. Promise 생성자 함수는 런타임에 평가되어 변수에 할당과 wep api에 처리를 요청 후 즉시 종료
2. 후속 처리 메서드와 콜백함수를 web api에 넘김  
>web api는 프로미스를 처리하고 후속 처리 메서드의 콜백함수를 마이크로 테스크 큐에 넘김 
3. log('전역 콜스택') 출력
4. 콜스택이 비면 microtaskqueue에 등록되어 있는 then의 콜백 함수를 콜스택에 push 
5. 추가 적인 후속처리가 체이닝 되어 있을시 마이크로태스크큐에 push

- - -
## 실행 순서에 관하여...

### 1번
- 다음은 1번이 먼저 출력될까? 아니면 2번이 먼저 출력 될까 ?

``` javascript
const inner = async () => {
  const p1 = await new Promise(resolve => 
    setTimeout(() => resolve(1000), 3000));

  console.log('1번');

  return p1;
};

const outer = () => {
  const p2 = inner();

  console.log('2번');
    
  return p2;
}

outer(); 
```

결과적으로는 outer함수가 실행되고, 이너 함수가 실행되고, 변수 p2는 이너함수의 결과를 기다리지 않고, 프로미스를 즉시 리턴한다.  
따라서 실행순서는 **2번 -> 1번** 이다. 
___

다음과 같이 inner() 앞에 await를 붙이면 실행 순서는 어떻게 될까 ?
``` javascript
const inner = async () => {
  const p1 = await new Promise(resolve => 
    setTimeout(() => resolve(1000), 3000));

  console.log('1번');

  return p1;
};

const outer = async () => {
  const p2 = await inner();

  console.log('2번');
    
  return p2;
}

outer(); 
```

- 실행 순서는 **1번 -> 2번** 이다.

### 2번

- Promise 생성자 함수의 콜백함수는 동기적이다. 
- 콜백함수는 런타임에 호출된다.
``` javascript
const p2 = new Promise((resolve, reject) => {
  console.log(111);
  setTimeout(() => resolve(333),1000);
  reject(err); // 에러가 날 부분 처리
  });

p2.then(console.log);

console.log(222);
```

- 실행순서: 111 -> 222 -> 333

### 3번
- a 함수 먼저 호출 되었고, await 키워드가 붙어있어 1 -> 2 순으로 출력 될것 같지만
``` javascript
async function a() {
  const b = await 1;
  console.log(b);
}
a();
console.log(2);
```

- await 키워드 뒤는 전부 비동기이르로 실행 순서는 2 -> 1이다
``` javascript
async function a() {
  return Promise.resovle(1).then(b => { console.log(b) })
}
a();
console.log(2);
```