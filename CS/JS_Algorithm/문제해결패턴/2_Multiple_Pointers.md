# Multiple Pointers

``` 
Creating pointers or values that correspond 
to an  index or position and move towards the beginning,  
end or middle based on a certain condition  

Very efficient for solving problems  
with minimal space complexity as well
```

## An Example (1)

``` 
Write a function called sumZero which accepts a sorted array of integers. 
The function should find the first pair where the sum is 0. 
Return an array that includes both values that 
sum to zero or undefined if a pair does not exist.
```

ex)  
``` javascript
sumZero([-3,-2,-1,0,1,2,3]) // [-3, 3]
sumZero([-2,0,1,3]) // undefined
sumZero([[1,2,3]]) // undefined
```

### Naive Solution
시간복잡도: O(n^2)
``` javascript
const sumZero = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}
```

### Refactor
시간복잡도: O(n)
``` javascript
function sumZero(arr){
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum ===0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  } 
}

sumZero([-4,-3,-2,-1,0,1,2,5])
```


## An Example (2)

- O(n)

countUniqueValues
``` 
Implement a function called countUniqueValues,
which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.
```
ex
``` javascript
countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4 
```

### My Solution

- O(n)

1. 배열에 unique한 정수 개수 구하라는 문제 
2. ok
3. set(arr) 하면 될듯 ?
4. 
``` javascript
const countUniqueValues = (arr) => {
  if (arr.length == 0) return 0;

  // set(...arr) 하면 될듯 ?
  const set = new Set(arr);

  return set.size;
}
```

5. Refactor
``` javascript
const countUniqueValues = (arr) => new Set(arr).size;
```

### Lecture Solution

- 정렬 되어 있어야 함.

``` javascript
function countUniqueValues(arr){
  if(arr.length === 0) return 0;

  var i = 0;
  for(var j = 1; j < arr.length; j++){

      if(arr[i] !== arr[j]){
          i++;
          arr[i] = arr[j]
      }
  }
  return i + 1;
}
```