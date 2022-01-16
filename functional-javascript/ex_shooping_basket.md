# 장바구니 예제

``` javascript
const products = [
  {name: '반팔티', price: 15000, quantity: 1,},
  {name: '긴팔티', price: 20000, quantity: 2},
  {name: '핸드폰케이스', price: 15000, quantity: 3},
  {name: '후드티', price: 30000, quantity: 4},
  {name: '바지', price: 25000, quantity: 5}
];
```

## go + curry
``` javascript
// 총 수량
go(products,
  map(p => p.quantity),
  reduce(add),
  log);

// 함수로 제작
const total_quantity = products => go(products,
  map(p => p.quantity),
  reduce(add));

log(total_quantity(products));
```
### go + curry -> pipe
```javascript

const total_quantity = pipe(
  map(p => p.quantity),
  reduce(add));
log(total_quantity(products));

const total_price = pipe(
  map(p =>p.price * p.quantity),
  reduce(add));
log(total_price(products));
```
## sum함수로 추상화
``` javascript
const sum = (f, iter) => go(
  iter,
  map(f),
  reduce(add));

const total_quantity = products => sum(p => p.quantity, products);
log(total_quantity(products));

const total_price = products => sum(p =>p.price * p.quantity,products);
log(total_price(products));
```
### sum + curry
``` javascript 
// curry 적용
const sum = curry((f, iter) => go(
  iter,
  map(f),
  reduce(add)));

// const total_quantity = products => sum(p => p.quantity)(products);
// log(total_quantity(products));

const total_quantity = sum(p => p.quantity);
log(total_quantity(products));
```

## HTML로 출력하기 

```javascript
document.querySelector("#cart").innerHTML = `
  <table>
    <tr>
      <th></th>
      <th>상품 이름</th>
      <th>가격</th>  
      <th>수량</th>  
      <th>충 가격</th>   
    </tr>
    ${go(
      products,
      map(p => `
        <tr>
          <td>${p.name}</td>
          <td>${p.price}</td>  
          <td><input type="number" value="${p.quantity}"></td>
          <td>${p.price * p.quantity}</td>   
        </tr> 
      `),
      reduce(add)
      )
    }
    <tr>
      <td colspan="2">합계</td>  
      <td>${total_quantity(products)}</td>
      <td>${total_price(products)}</td>
    </tr> 
  </table>
  `;

```

``` javascript 
document.querySelector("#cart").innerHTML = `
  <table>
    <tr>
      <th></th>
      <th>상품 이름</th>
      <th>가격</th>  
      <th>수량</th>  
      <th>충 가격</th>   
    </tr>
    ${go(products, sum(
      p => `
        <tr>
          <td><input type="checkbox" ${p.is_selected ? 'checked' : ''}</td>
          <td>${p.name}</td>
          <td>${p.price}</td>  
          <td><input type="number" value="${p.quantity}"></td>
        <td>${p.price * p.quantity}</td>   
        </tr> 
      `))}
    <tr>
      <td colspan="3">합계</td>  
      <td>${total_quantity(products)}</td>
      <td>${total_price(products)}</td>
    </tr> 
  </table>
  `;
```
