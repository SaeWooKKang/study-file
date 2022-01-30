# 지연평가 + Promise - L.map, map, take

## map 함수 비동기 처리
``` javascript
  go(
    [1,2,3,4],
    map(a => a * a),
    take(2),
    log
  );

  // 비동기 값을 맵에 넣으면 오류 발생 => map 함수에서 비동기 처리 해야 함
  go( 
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    L.map(a => a * a),
    take(2),
    log
  );

  // L.map 비동기 처리 
  L.map = curry(function *(f, iter) {
    for(const a of iter) {
      yield a instanceof Promise ? a.then(f) : f(a);
    }});
  
  go( 
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    L.map(a => a * a),
    take(2),
    log // [Promise, Promise]
  );
  ```

  ## take 함수 비동기 처리
  ``` javascript
  // 기존 take
  var take = curry((l, iter) => {
    const res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur = iter.next()).done){
      const a = cur.value;
      res.push(a);
      if(res.length === l) return res;
    }
    return res;
  });
  ```

  ``` javascript
  //take 함수를 수정해서 프로미스를 값으로 꺼냄
  var take = curry((l, iter) => {
    const res = [];
    iter = iter[Symbol.iterator]();

    return function recur() {
      let cur;
      while(!(cur = iter.next()).done){
        const a = cur.value;
        if (a instanceof Promise) return a.then(a => {
          res.push(a);
          if(res.length === l) return res; 
          return recur(); 
        })
      res.push(a);
      if(res.length === l) return res;
    }
    return res;
    }()
  });
  ```

  #### 1) 코드 정리
  ``` javascript
  //코드 정리 1
  var take = curry((l, iter) => {
    const res = [];
    iter = iter[Symbol.iterator]();

    return function recur() {
      let cur;
      while(!(cur = iter.next()).done){
        const a = cur.value;
        if (a instanceof Promise) return a.then(a => {
          res.push(a);
          return res.length == l ? res : recur(); 
        });
        res.push(a);
        if(res.length === l) return res;
    }
    return res;
    }()
  });
  ```

  #### 2) 코드 정리 
  ``` javascript
  var take = curry((l, iter) => {
    const res = [];
    iter = iter[Symbol.iterator]();

    return function recur() {
      let cur;
      while(!(cur = iter.next()).done){
        const a = cur.value;
        if (a instanceof Promise) return a.then(a => {
          return (res.push(a), res).length == l ? res : recur(); 
        });
        res.push(a);
        if(res.length === l) return res;
    }
    return res;
    }()
  });
  ```

  #### 3) 코드 정리 
  ``` javascript
  var take = curry((l, iter) => {
    const res = [];
    iter = iter[Symbol.iterator]();

    return function recur() {
      let cur;
      while(!(cur = iter.next()).done){
        const a = cur.value;
        if (a instanceof Promise) return a.then(
          a =>(res.push(a), res).length == l ? res : recur());
        res.push(a);
        if(res.length === l) return res;
    }
    return res;
    }()
  });

  go([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    L.map(a => a + 10),
    take(2),
    log
  ); // [11, 12]
```