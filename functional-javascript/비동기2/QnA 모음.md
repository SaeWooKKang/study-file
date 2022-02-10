# QnA

## 공통 코드
``` javascript
async function delayI(a) {
  return new Promise(resolve => setTimeout(()=> resolve(a), 100));
}
```

## Array.prototype.map이 있는데 왜 FxJs의 map 함수가 필요한지 ?
> 값으로 좀 더 잘 다루기 위해  
``` javascript
  function f2() {
    const list = [1, 2, 3, 4];
    const res = list.map(a => delayI(a * a));
    log(res); // [Promise, Promise, Promise, Promise]
  }
  // async await 를 사용하여 프로미스를 풀 수 있을것 같지만 풀리지 않는다.
  async function f2() {
    const list = [1, 2, 3, 4];
    const temp = await list.map(async a => await delayI(a * a));
    log(temp); // [Promise, Promise, Promise, Promise]
    const res = await temp;
    log(res); // [Promise, Promise, Promise, Promise]
  }
  f2();
```

``` javascript
  // 정상적으로 작동 
  async function f3() {
    const list = [1, 2, 3, 4];
    const temp = map(a => delayI(a * a), list); 
    log(temp); // Promise
    const res = await temp;
    log(res); // [1, 4, 9, 16]
    // return res; 반환 값도 프로미스가 아닌 값이므로 값으로서 잘 다룰 수 있음
  }

  f3();
```
## async:await로 제어할 수 있는데 왜 파이프라인이 필요한지 ?
> 비교 대상이 아니라 다른 문제를 해결하기 위한 두 개의 기술 

**async:await의 목적** 
프로미스를 then then then then 표현식으로 다루기 어렵다보니 async await 를 사용하여 특정부분에서 문장으로 다루기 위한 목적을 가지고 있음. (합성이 아닌 풀어놓을 목적)  
함수 안쪽에서 명령형으로 문장을 사용하려 할 떄 사용하는 것이 await임

**파이프라인의 목적**
비동기 프로그래밍이 목적이 아니라 명령형 프로그래밍을 하지않고 안전하게 함수 합성을 하기 위한 목적 (동기냐 비동기냐의 관심 x)
효과적으로 함수들을 조합하고 로직을 테스트하기 쉽고 유지보수하기 쉽게 하기 위한 목적


``` javascript
async function f6(list) {
  for (const a of list) {
    // 이렇게 작성할 경우 
    const b = delayI(a * a);
    log(b); // Promise 임 따라서 풀어주려면 async await 사용 해야 함
  }
}
```

``` javascript
// 동기 혹은 비동기여도 코드의 변화가 없다.
  function f5(list) {
    return go(list,
      L.map(a => delayI(a *a)),
      L.filter(a => delayI(a % 2)),
      L.map(a => delayI(a + 1)),
      take(3), //C.take 로 쉽게 병렬적 처리 할수 있지만 아래코드는 코드를 수정하기 어려움
      reduce((a, b) => delayI(a + b)));
  }

  go(f5([1, 2, 3, 4, 5, 6, 7, 8]), a => log(a, 'f5'));

  // 비동기 함수여도 async 함수 때문에 반환값이 프로미스다 
  // 따라서 async await가 없어야 하고 코드의 변화가 있다.
  async function f6(list) {
    let temp = [];
    for (const a of list) {
      const b = await delayI(a * a); // map 
      if (await delayI(b % 2)) { // filter
        const c = await delayI(b + 1);
        log(c)
        temp.push(c);
        if (temp.length === 3) break;
      }
    }
    let res = temp[0], i = 0;
    while (++i < temp.length) {
      res = await delayI(res + temp[i]);
    }
    return res;
  }

  go(f6([1, 2, 3, 4, 5, 6, 7, 8]), log);
```

## async:await와 파이프라인을 같이 사용하기도 하는지 ?

``` javascript
async function f52(list) {
  const r1 = await go(list,
    L.map(a => delayI(a * a)),
    L.filter(a => delayI(a % 2)),
    L.map(a => delayI(a + 1)),
    C.take(2), 
    reduce((a, b) => delayI(a + b)));

  const r2 = await go(list,
    L.map(a => delayI(a * a)),
    L.filter(a => delayI(a % 2)),
    reduce((a, b) => delayI(a + b)));

  const r3 = await delayI(r1 + r2);

  return r3 + 10;
}

go(f52([1, 2, 3, 4, 5, 6, 7, 8]), a => log(a, 'f52'));
```

## 동기 상황에서 에러 핸들링은 어떻게 해야 하는지 ?

``` javascript
function f7(list) {
  return list
    .map(a => a + 10)
    .filter(a => a % 2)
    .slice(0, 2);
}
log(f7([1, 2, 3])); // [11, 13]
log(f7([])); // [] 문제 없이 흘려보냄
log(f7(null)); // error

// 에러 처리
function f7(list) {
  return (list || [])
    .map(a => a + 10)
    .filter(a => a % 2)
    .slice(0, 2);
}

// js에서 일반적인 에러 핸들링
function f7(list) {
  try{ return list
    .map(a => a + 10)
    .filter(a => a % 2)
    .slice(0, 2);
  } catch (e) {
    return [];
  }
}
```

## 비동기 상황에서 에러 핸들링은 어떻게 해야 하는지 ?
