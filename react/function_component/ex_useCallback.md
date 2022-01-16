# useCallback 예제

### useCallback 사용 X
다음 예시는 useEffect에 의존성 배열로 함수를 넣었다.

``` javascript
const WordRelay = () => {

  const [count, setCount] = useState(0);

  const irrelevant = () => { // count와 아무 상관 없는 함수 
    // do something...
    console.log('irrelevant');
  }

  useEffect(() => {
    console.log('useEffect');
  }, [irrelevant])

  const onCountAdd = () => {setCount(count + 1)}

  return (
    <div>
      <p>{count}</p>
      <button onClick={onCountAdd}>add</button>
      <div>{console.log('render')}</div>
    </div>
  )
}

```

처음 렌더링 될 때 콘솔은 다음과 같이 출력된다. 
> irrelevant  
> render 

add버튼을 클릭하면 count 상태가 변경되므로 리렌더링되고, 컴포넌트가 리렌더링 될 때마다 새로운 함수가 생성되고, useEffect에서는 의존성 배열 참조값이 변경 되었으므로 count와 연관이 없는 생성 함수를 의도치 않게 동작하게 한다. 

클릭시 콘솔은 다음과 같다.
> irrelevant  
> render  
> irrelevant  
> render... 클릭시 마다 반복  

### useCallback 사용 O

useCallback으로 의존성 값이 변경되지 않는 이상 함수를 기억하므로 add 버튼 클릭시에도 useEffect가 호출되지 않는다.
```javascript
const WordRelay = () => {

  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  const irrelevant = useCallback(()=>{
      console.log('irrelevant');
  },[user])

  useEffect(() => {
    console.log('useEffect');
  }, [irrelevant])

  const onCountAdd = () => {setCount(count + 1)}

  return (
    <div>
      <p>{count}</p>
      <button onClick={onCountAdd}>add</button>
      <div>{console.log('render')}</div>
    </div>
  )
}
```