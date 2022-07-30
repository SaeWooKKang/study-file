# Frequency Counter

## An Example (1)
```
Write a function called same, which accepts two arrays.

The function should return true if every value in the array has 
it's corresponding value squared in the second array.

The frequency of values must be the same.
```

ex) 
``` javascript
same([1,2,3], [4,1,9]) // t
same([1,2,3], [1,9]) // f
same([1,2,1], [4,4,1]) // f
(must be same frequency )
```

### My Answer 

시간복잡도: nlogN

``` javascript
const same = (arr1, arr2) => {
  // arr1과 arr2를 정렬하고
  arr1.sort();
  arr2.sort();
  let res = true;

  arr1.forEach((v, i) => {
    const square = v * v;
    // arr1의 요소들을 제곱해서  
    // arr2의 요소들과 비교
    if (square !== arr2[i]) {
      res = false;
    }
  })
  // 결과를 boolean으로 반환
  return res;
}
 ```

### Lecture Answer 
시간 복잡도: O(N)
``` javascript

const same = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};

  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
  } 
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1
  } 
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}
 ```

## An Example: Anagrams (2)

```
Given two strings, write a function to determine if the second string 
is an anagram of the first. An anagram is a word,
phrase, or name formed by rearranging the letters
of another, such as cinema, 
formed from iceman.
```

ex )  
``` javascript
validAnagram('', '') // t
validAnagram('aaz', 'zza') // f
validAnagram('anagram', 'nagaram') // t
validAnagram('rat', 'car') // f
validAnagram('awesome', 'awesom') // f
validAnagram('qwerty', 'qeywrt') // t
validAnagram('texttwisttime', 'timetwisttext') // t
``` 

## My Answer 
시간복잡도: O(N)

두 개의 문자열이 주어지는데 

두번째 문자열이 첫번쨰 문자의 애너그램인지를 확인하는 문제구나 

애너그램은 문자를 재배치한 거야 

cinema -> iceman과 같이

이거 frequency conter 같은데 ?

1. 문자를 재비치해서 두번쨰 문자로 바꿀 수 있음?

2. ok

3. 
// 개수만 비교하면 되겠네 ?

  // 객체 만들고 

  // for문 순회해서 key: value 만들고

  // 비교 하면 될 듯 ?

  // 반환


4. 
``` javascript
const validAnagram = (str1, str2) => {
  // 객체 만들고 
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};

  // for문 순회해서 key: value 만들고
  for (const str of str1) {
    frequencyCounter1[str] = (frequencyCounter1[str] || 0) + 1;
  }
  for (const str of str2) {
    frequencyCounter2[str] = (frequencyCounter2[str] || 0) + 1;
  }

  // 비교 하면 될 듯 ?
  for (const str in frequencyCounter1) {
    if (!(str in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter1[str] !== frequencyCounter2[str]) {
      return false;
    }
  }

  // 반환
  return true;
}
```

### Lecture Answer

시간 복잡도: O(N)

``` javascript

function validAnagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }

  const lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    // if letter exists, increment, otherwise set to 1
    lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
  }
  console.log(lookup)

  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    // can't find letter or letter is zero then it's not an anagram
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }

  return true;
}

// {a: 0, n: 0, g: 0, r: 0, m: 0,s:1}
validAnagram('anagrams', 'nagaramm')
```
