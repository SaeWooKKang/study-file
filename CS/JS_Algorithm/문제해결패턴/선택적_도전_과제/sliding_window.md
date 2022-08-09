# sliding window

## maxSubarraySum
``` 
Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length of the number passed to the function.  

Note that a subarray must consist of consecutive elements from the original array. In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.  

Constraints:  

Time Complexity - O(N)  

Space Complexity - O(1)  
```

ex)
``` javascript
maxSubarraySum([100,200,300,400], 2) // 700
maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  // 39 
maxSubarraySum([-3,4,0,-2,6,-1], 2) // 5
maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
maxSubarraySum([2,3], 3) // null
```

### My solution

1. sliding-window 문제
2. ok
3. 
  배열의 길이보다 n이 크다면 리턴 null

  임시, 최대값 변수 두개 설정

  for문 한번 돌려서 0부터 n까지의 합 구하기

  for 문 한 번으로 이전 합을 기억하면서 돌기 

``` javascript
const maxSubarraySum = (arr, n) => {
  if (arr.length < n) return null;

  let temp = 0;
  let max; 

  for (let i = 0; i < n; i++) {
    temp += arr[i];
  }

  max = temp;

  for (let i = 0; i < arr.length; i++) {
    temp = arr[n + i] + temp - arr[i];

    if (temp > max) max = temp;
  }

  return max;
}
```