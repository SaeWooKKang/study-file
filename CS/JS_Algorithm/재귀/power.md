## power
```
Write a function called power which accepts a base and an exponent. 
The function should return the power of the base to the exponent.
This function should mimic the functionality of Math.pow()  
- do not worry about negative bases and exponents.
```

Ex
``` javascript
// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16
```

1. Math.pow 만들기 
``` javascript
const power = (n1, n2) => {
  let res = 1;

  for (let i = 0; i < n2; i++) {
    res = res * n1;
  }

  return res;
}
```

``` javascript
const power = (n1, n2) => {
  if (n2 == 0) return 1;

  return n1 * power(n1, n2 - 1);
}

power(2, 2)
// -> 1
// return 2 * power(2, 0) -> 2
// return 2 * power(2, 1) -> 4
```