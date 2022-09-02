# Sliding Window - minSubArrayLen
Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.

This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function. If there isn't one, return 0 instead.


Time Complexity - O(n)
Space Complexity - O(1)

Ex
``` javascript
minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
minSubArrayLen([1,4,16,22,5,7,8,9,10],39) // 3
minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0
```

1. 정수보다 같거나 큰 수를 배열의 요소 몇개로 만들수 있냐 최솟값찾기
2. ok
3. 
## My solution
``` javascript
const minSubArrayLen = (arr, int) => {
  const add = (a, b) => a + b;

  const helper = (n) => {
    for (let i = 0; i + n <= arr.length; i++) {
      if (arr.slice(i, i + n).reduce(add, 0) >= int) return true;
    }
  }

  for (let i = 1; i < arr.length; i++) {
    if (helper(i)) return i;
  }
  return 0;
}
```
