# 값으로서의 Promise 활용

## 공통
``` javascript
const delay100 = a => new Promise(resolve =>
  setTimeout(() =>resolve(a), 100));

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;
```

### 1)
``` javascript
log(go1(10, add5)); 
log(go1(delay100(5), add5));
```

### 2)
``` javascript
var r1 = go1(10, add5);
log(r1);

var r2 = go1(delay100(10), add5);
r2.then(log);
```

### 3)
``` javascript
const n1 = 10;
go1(go1(n1, add5), log);

const n2 = delay100(10);
go1(go1(n2, add5), log);
```