# factorial

```
Write a function factorial which accepts a number and returns the factorial of that number. 
A factorial is the product of an integer and all the integers below it; e.g., 
factorial four ( 4! ) is equal to 24, because 4 * 3 * 2 * 1 equals 24.  
factorial zero (0!) is always 1.
```

## My solution

for문
``` javascript
const factorial = (n) => {
  let res = 1;

  for (let i = 1; i <= n; i++) {
    res = res * i;
  }

  return res;
}
```

recursive
``` javascript
const factorial = (n) => {
  if (n <= 1) return 1;

  return n * factorial(n -1);
}
```