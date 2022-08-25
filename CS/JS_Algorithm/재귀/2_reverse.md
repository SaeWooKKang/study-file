# reverse

``` 
Write a recursive function called reverse which accepts a string and returns a new string in reverse.
```

ex
``` javascript
reverse('awesome') // 'emosewa'
reverse('rithmschool') // 'loohcsmhtir'
```

## My solution
``` javascript
const reverse = (str) => {
  let res = '';

  const helper = (str) => {
    const last = str.length - 1; 
    
    if (!str[last]) return;

    res += str[last];

    helper(str.slice(0, last));
  }

  helper(str);
  return res;
}
```

## Lecture solution

``` javascript
function reverse(str){
	if(str.length <= 1) return str;

	return reverse(str.slice(1)) + str[0];
}
```

