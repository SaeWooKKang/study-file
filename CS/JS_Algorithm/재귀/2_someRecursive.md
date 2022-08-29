# someRecursive

```
Write a recursive function called someRecursive which accepts an array and a callback. The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.

// const isOdd = val => val % 2 !== 0;
```

ex 
``` javascript
someRecursive([1,2,3,4], isOdd) // true
someRecursive([4,6,8,9], isOdd) // true
someRecursive([4,6,8], isOdd) // false
someRecursive([4,6,8], val => val > 10); // false
```

1. 배열, 함수받는데 하나라도 홀수 있다면 true, 아니면 false 반환

``` javascript
const someRecursive = (arr, isOdd) => {
  let res = false;
  arr.forEach(a => {
    if (isOdd(a))  res = true;
  });
  return res;
}
```

- recursive
``` javascript
const someRecursive = (arr, isOdd) => {
  if (!arr.length) return false;
  if (isOdd(arr[0])) return true;

  return someRecursive(arr.slice(1), isOdd);
}
```