# fib

```
Write a recursive function called fib 
which accepts a number and returns the nth number in the Fibonacci sequence. 
Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... 
which starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.
```

ex
``` javascript
fib(4) // 3
fib(10) // 55
fib(28) // 317811
fib(35) // 9227465
```

## My Solution

``` javascript
const fib = n => {
  if (n <= 2) return 1;

  return fib(n - 2) + fib(n - 1);
}
```

``` javascript
const fib = (n) => {
  if (n <= 2) return 1;

  let preprev = 1;
  let prev = 1;
  let now;

  for (let i = 3; i <= n; i++) {
    now = preprev + prev;
    preprev = prev;
    prev = now;
  }

  return now;
}
```