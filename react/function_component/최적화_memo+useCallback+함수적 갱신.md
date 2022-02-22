# memo + useCallback + 함수적 갱신을 활용한 최적화

#### 시나리오
비동기 요청으로 데이터들을 받고, state에 저장, 하위 컴포넌트에서 state를 변경하는 상황을 가정

#### 순서 
1. 하위 컴포넌트를 **memo**로 감쌈
2. props로 전달되는 함수를 **useCallback**으로 감쌈
3. useCallback으로 감싸더라도 의존성 배열에서 상태를 참조할 경우 리렌더링시 새로운 함수 객채를 만듬으로 의존성 배열을 빈배열로 만들고 **함수적 갱신**을 사용하여 리렌더링 방지

#### 결과적으로  
Names 컴포넌트의 onAddName() 호출할 경우 Prices 컴포넌트는 리렌더링 되지 않는다.  
Prices 컴포넌트의 onAddPrice() 호출할 경우 Names 컴포넌트는 리렌더링 되지 않는다.  

#### 부모 컴포넌트 Container 
``` javascript
const Container = () => {
  // axios 요청으로 상품 데이터를 받았다.
  const products = [{name:'a', price: 100}, {name:'b', price: 200}, {name:'c', price: 300}];
  
  // 상품 이름과 가격을 분리 했다. 
  const Pnames = products.map(p => p.name);
  const Pprices = products.map(p => p.price);

  // 상태 저장
  const [names, setNames] = useState(Pnames); // [a, b, c]
  const [prices, setPrices] = useState(Pprices); // [100, 200. 300]
  
  // useCallback + 함수적 갱신
  const onAddName = useCallback(() => {
    setNames(preNames => { 
      copyNames = [...preNames];
      copyNames.push('f'); // 새로운 상품 이름 'f'
      return copyNames;
    })
  },[]);
  // useCallback + 함수적 갱신
  const onAddPrice = useCallback(() => {
    setPrices(preProducts => { 
      copyProducts = [...preProducts];
      copyProducts.push('700'); // 새로운 상품 이름 'f'
      return copyProducts;
    })
  },[]);

  return (
    <div> 
      <Names names={names} onAddName={onAddName}/>
      <Prices prices={prices} onAddPrice={onAddPrice}/>
    </div>)
};
```

#### Container의 하위 컴포넌트 Names
``` javascript
// 상품 이름들을 다루는 컴포넌트
// memo 사용
const Names = memo(({names, onAddName}) => {
  console.log('Names 컴포넌트');
  return (
    <div>
      <div>상품목록</div>
      <div>{names.map(a => <span key={a}>{a}</span>)}</div>  
      <button onClick={onAddName}>이름 추가</button>
    </div>)
});
```

#### Container의 하위 컴포넌트 Prices
``` javascript 
// 상품 값들을 다루는 컴포넌트
// memo 사용
const Prices = memo(({prices, onAddPrice}) => {
  console.log('Prices 컴포넌트');
  return (
    <div>
      <div>상품 가격</div>
      <div>{prices.map(p => <span key={p}>{p}</span>)}</div>
      <button onClick={onAddPrice}>가격 추가</button>
    </div>
  )
});

```