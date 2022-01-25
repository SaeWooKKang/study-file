# callback과 Promise

## callback

``` javascript
function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100);
}

add10(5, res => console.log(res)); // 15
```

## Promise

``` javascript
function add20 (a) {
  return new Promise(resolve => setTimeout(() => resolve(a + 20), 100));
}

add(5)
  .then(res => console.log(res)); // 25
```