map을 이터러블과 관련지어서 설명하고 있음 

내가 알던 map은 단순히 배열에서 메서드 호출시 1:1 대응 되는걸로 알고 있었는데 

강의에서는 

ES6 -> 배열은 이터러블이 됨 -> map 가능 

직접 map을 구현해보자 


상품의 이름만 뽑아서 새로운 배열 만들기
```javascript
const products = [
  {name: 'a', price:100},
  {name: 'b', price:200},
  {name: 'c', price:300}
];

// -- 이전 사용 -- 
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