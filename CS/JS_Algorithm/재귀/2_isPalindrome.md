# isPalindrome

``` 
Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome (reads the same forward and backward). Otherwise it returns false.
```

ex
``` javascript 
isPalindrome('awesome') // false
isPalindrome('foobar') // false
isPalindrome('tacocat') // true
isPalindrome('amanaplanacanalpanama') // true
isPalindrome('amanaplanacanalpandemonium') // false
```

## My solution

- multiple pointer
``` javascript
const isPalindrome = (str) => {
  let right = str.length - 1;

  for (let i = 0; i < str.length; i++) {
    if (str[right] !== str[i]) return false;

    right -= 1;
  }

  return true;
}
```

- recursive
``` javascript
const isPalindrome = (str) => {
  let left = 0;
  let right = str.length - 1;
  
  let res = true;

  const helper = (left, right) => {
    if (right <= left) return; // base

    if (str[left] !== str[right]) { // condition
      res = false;

      return;
    }
    left += 1;
    right -= 1;
    helper(left, right); // different input
  }

  helper(left, right);

  return res;
}
```

## Lecture solution
``` javascript
function isPalindrome(str){
  if(str.length === 1) return true;
  if(str.length === 2) return str[0] === str[1];
  if(str[0] === str.slice(-1)) return isPalindrome(str.slice(1,-1))

  return false;
}
```