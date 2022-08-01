# Sliding Window

``` 
This pattern invloves creating a window which
can either be an array or number from one position to another 

Depending on a certain condition, the window either increases or closes(and a new window is created)

Very useful for keeping track of a subset of data in an array/string etc.
```

## An Example (1)

``` 
Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.
```
ex 
``` javascript
maxSubarraySum([1,2,5,2,8,1,5], 2); // 10
maxSubarraySum([1,2,5,2,8,1,5], 4); // 17
maxSubarraySum([4,2,1,6], 1); // 6
maxSubarraySum([4,2,1,6,2], 4); // 13
maxSubarraySum([], 4); // null
```

### My Solution

- O(n^2)

1. 배열과 정수 하나 주는데 정수 갯수만큼 연이은 수들의 합 최댓값을 구하기 
2. ok
3. 

규칙을 찾아보자 
([1,2,3,4], 2) 일 때

1, 2
2, 3
3, 4

끝을 정하는게 어렵네 

``` javascript
const maxSubarraySum = (arr, n) => {
  // arr이 자연수일때만 가능 
  let max = null;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i + n - 1] == undefined) return max;

    let sliced;
    if (n == 1) sliced = [arr[i]];
    else sliced = arr.slice(i, i + n);

    const add = (a, b) => a + b
    let sum = sliced.reduce(add, 0);

    if (max < sum) max = sum;
  }
  
  return max;
}
```

### Lecture Solution

- not good

``` javascript
function maxSubarraySum(arr, num) {
  if ( num > arr.length){
    return null;
  }

  var max = -Infinity;

  for (let i = 0; i < arr.length - num + 1; i ++){
    temp = 0;
    for (let j = 0; j < num; j++){
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  
  return max;
}
```

- Sliding Window
- O(n)
``` javascript
function maxSubarraySum(arr, num){
  let maxSum = 0;
  let tempSum = 0;

  if (arr.length < num) return null;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }

  tempSum = maxSum;

  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
}
```


