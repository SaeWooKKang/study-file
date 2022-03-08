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

###### 전달받은 값을 프로미스로 랩핑 함.
``` javascript
const resolved = Promise.resolve(5);
resolved.then(log); // 5

// 동일하게 동작
const resolved = new Promise(resolve => resolve(5))
resolved.then(log);
```
##### 2. Promise.reject

###### 전달받은 값을 프로미스로 랩핑 함.
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

``` javascript
Promise.allsettled([requestData1(), requestData4()])
  .then(log);
  // [
  //  {status: 'fulfilled', value: 1}
  //  {status: 'rejected', reason: Error...}
  // ]
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

1. Promise 생성자 함수는 런타임에 평가되어 변수에 할당과 wep api에 처리를 요청 후 즉시 종료
2. 후속 처리 메서드와 콜백함수를 web api에 넘김  
>web api는 프로미스를 처리하고 후속 처리 메서드의 콜백함수를 마이크로 테스크 큐에 넘김 
3. log('전역 콜스택') 출력
4. 콜스택이 비면 microtaskqueue에 등록되어 있는 then의 콜백 함수를 콜스택에 push 
5. 추가 적인 후속처리가 체이닝 되어 있을시 마이크로태스크큐에 push