# productOfArray

```
Write a function called productOfArray which takes in an array of numbers and returns the product of them all.
```

ex
``` javascript
productOfArray([1,2,3]) // 6
productOfArray([1,2,3,10]) // 60
```

## My solution
1.
``` javascript
const productOfArray = (arr) => arr.reduce((a, b) => a * b, 1);
```

2. recursive 
``` javascript
const productOfArray = (arr) => {
  let res = 1;

  const helper = arr => {
    if (arr.length == 0) return;
    
    res = res * arr[0];
    
    helper(arr.slice(1));
  }

  helper(arr); 
  return res;
}
```