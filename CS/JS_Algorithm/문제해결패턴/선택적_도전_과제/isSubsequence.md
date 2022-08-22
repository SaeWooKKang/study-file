```Multiple Pointers - isSubsequence
Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.
```

Examples:

``` javascript
isSubsequence('hello', 'hello world'); // true
isSubsequence('sing', 'sting'); // true
isSubsequence('abc', 'abracadabra'); // true
isSubsequence('abc', 'acb'); // false (order matters)
```

Your solution MUST have AT LEAST the following complexities:

Time Complexity - O(N + M)
Space Complexity - O(1)

## My solution
``` javascript
const isSubsequence = (str1, str2) => {
  let v1 = 0;
  let count = 0;

  for (let i = 0; i < str2.length; i++) {
    if (str1[v1] == str2[i]) {
      count++;
      v1++;
    }
  }

  return str1.length == count ? true : false;
}
```
