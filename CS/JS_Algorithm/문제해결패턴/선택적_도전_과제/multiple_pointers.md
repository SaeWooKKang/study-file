# Multiple Pointers

## averagePair

``` 
Write a function called averagePair. 
Given a sorted array of intergers and a target average, 
determine if there is a pair of values in the array where 
the average of the pair equals the target average. 
There may be more than one pair that matches the average target.

Bonus Constraints: 
Time: O(n)
Space: O(1)
```

ex
``` javascript
averagePair([1,2,3], 2.5) // true
averagePair([1,3,3,5,6,7,10,12,19], 8) // true
averagePair([-1,0,3,4,5,6], 4.1) // false
averagePair([], 4) // false
```

### My solution
1. 정렬된 배열, target 주는데 두개 평균으로 target 구할 수 있음?
2. ok
3. 
4. 
- O(n^2)
``` javascript
const averagePair = (arr, n) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if ((arr[i] + arr[j]) / 2 == n) return true;
    }
  }
  return false;
}
```

- O(n), for -> while
``` javascript
const average = (a, b) => (a + b) / 2;

const averagePair = (arr, n) => {
  let left = 0;
  let right = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    const avg = average(arr[right], arr[left]);

    if (avg == n) return true;
    else if (avg > n) right--;
    else left++;
  }

  return false;
}

averagePair([-1,0,3,4,5,6], 4.1)
```

5.
``` javascript
const average = (a, b) => (a + b) / 2;

const averagePair = (arr, n) => {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const avg = average(arr[right], arr[left]);

    if (avg == n) return true;
    else if (avg > n) right--;
    else left++;
  }

  return false;
}

averagePair([-1,0,3,4,5,6], 4.1)
```