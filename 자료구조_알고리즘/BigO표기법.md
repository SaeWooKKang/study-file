# Big(O) 표기법
- 데이터의 증가율에 따른 처리시간의 증가율을 예측하기 위해 만들어짐

## O(1): Constant Time
- 데이터의 크기와 상관없이 일정한 속도로 결과를 반환
``` javascript 
const f = n => n[0] == 0 ? true : false;
```

## O(n): Linear Time
- 데이터의 크기만큼 처리시간 비례하여 증가
- n
``` javascript
const f = n => {
  for(let i = 0; i < n; i++) {
    console.log(i);
  }
}
```

## O(n^2): Quadratic Time
- n * n
``` javascript
const f = n => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
```

## O(nm): Quadratic Time
- n * m
``` javascript
const f = (n, m) => {
  for (let i  = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      console.log(i, j);
    }
  }
}
```

## O(n^3): Polynomial/Cubic Time
- n * n * n
``` javascript
const f = n => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k ++) {
        console.log(i, j, k);
      }
    }
  }
}
```
## O(2^n): Exponential Time
- 2^n
``` javascript
// Fibonacci

// 0부터 
const f = n => {
  if (n <= 0) return 0;
  else if (n == 1) return 1;
  return f(n - 1) + f(n - 2);
}

// 1부터
const f = n => {
  if (n <= 2) return 1;
  return f(n - 1) + f(n - 2);
}
```
## O(m^n): Exponential Time

## O(log(n))
- 데이터가 늘어나도 성능이 크게 차이나지 않는다. 
``` javascript
// binary search
const f = (k, arr, s, e) => {
  if (s > e) return -1;

  const m = Math.floor((s + e) / 2);

  if (arr[m] == k) return m;
  else if (arr[m] > k) return f(k, arr, s, m - 1);
  else return f(k, arr, m + 1, e);
}
```

## O(sqrt(n))
- 100의 제곱근은 10, 4의 제곱근은 2
- 정사각형 채워서 한 변이 제곱근
- O(log(n))보다 증가율이 높다.

### Constant Drop

#### O(2n) -> O(n)
``` javascript 
const f = n => {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
  for (let j = 0; j < n; j++) {
    console.log(j);
  }
}
```
#### O(n^2 + n^2) -> O(n^2)
``` javascript
const f = n => {
  for (let i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
  for (let i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
```