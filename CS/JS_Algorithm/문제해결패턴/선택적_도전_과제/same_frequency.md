# Frequency Counter - sameFrequency

``` 
Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

Your solution MUST have the following complexities:
Time: O(n)
```

ex
``` javascript
sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false
```

## My Solution

1. 빈도수 구하는 문제
2. ok
3. 
  - 숫자를 문자로 바꾸고 
  - for문 두 번 돌려서 문자 개수 세고 
  - 비교후 반환 

4. 
``` javascript
const sameFrequency = (num1, num2) => {
  num1 = String(num1);
  num2 = String(num2);

  if (num1.length !== num2.length) return false;

  const obj1 = {};
  const obj2 = {};

  for (const a of num1) {
    if (obj1[a]) obj1[a]++;
    else obj1[a] = 1;
  }

  for (const a of num2) {
    if (obj2[a]) obj2[a]++;
    else obj2[a] = 1;
  }

  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}
```

5. 
``` javascript
const sameFrequency = (num1, num2) => {
  num1 = String(num1);
  num2 = String(num2);

  if (num1.length !== num2.length) return false;

  const obj1 = {};
  const obj2 = {};

  for (const a of num1) {
   obj1[a] = (obj1[a] || 0) + 1
  }

  for (const a of num2) {
   obj2[a] = (obj2[a] || 0) + 1
  }

  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}
```