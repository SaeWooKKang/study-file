# map 구현

상품의 이름만 뽑아서 새로운 배열 만들기

```javascript
const products = [
  {name: 'a', price:100},
  {name: 'b', price:200},
  {name: 'c', price:300}
];
 
let names = [];

for(let i = 0; i < products.length; i++){
  names.push(products[i].name);
}

console.log(names)// ['a', 'b', 'c']

// -- map --
const map = (f, iter) => {
  let res = [];
  for (const a of iter){
    res.push(f(a));
  }
  return res;
};
console.log(map(p=>p.name, products)); // ['a', 'b', 'c']
```

## 이터러블 프로토콜을 따른 map의 다형성

map 프로토타입 메서드를 갖지 않지만 이터러블이다.

```javascript
const doc = document.querySelectorAll('*') 
```

이터러블 이므로 위에 작성한 map 함수로
``` javascript
const arr1 = map((el)=>{el.nodeName}, doc) 가능
```
