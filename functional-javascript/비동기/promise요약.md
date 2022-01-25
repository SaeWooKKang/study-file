# promise

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
> 후속 처리 메서드는 프로미스 반환

### Promise 후속 처리 메서드

#### then 

- 비동기적으로 실행(콜 스택 이후 실행)
- 두 개의 콜백함수를 인수로 전달받음 

##### 인수
- **첫 번째 콜백함수**는 프로미스 상태가 > **fulfilled**시 호출
- **두 번째 콜백함수**는 프로미스 상태가 > **rejected**시 호출

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
```javascript
promiseGet(wrongUrl)
  .then(res => console.log(res))
  .catch(err => console.err(err));
```

### Promise 체이닝

### Promise 정적 메서드