# Frequency Counter / Multiple Pointers - areThereDuplicates

```
Implement a function called, areThereDuplicates which 
accepts a variable number of arguments, 
and checks whether there are any duplicates among the arguments passed in. 
You can solve this using the frequency counter pattern OR 
the multiple pointers pattern
```

EX
``` javascript
areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true
areThereDuplicates('a', 'b', 'c', 'a') // true
```

Restrictions 
- Time - O(n)
- Space - O(n)

Bonus: 
- Time - O(nlogn)
- Space- O(1)

## My solution 
1. 중복 존재 하는지 
2. ok
3. frequency counter

``` javascript
const areThereDuplicates = (...arg) => {

  const obj = {};

  for (const a of arg) {
    obj[a] = obj[a] ? ++obj[a] : 1;
  }

  // obj를 순회하면서 값이 두개면 -> true 
  for (const key in obj) {
    if (obj[key] > 1) return true;
  }

  // 아니면 false 반환
  return false;
}
```


