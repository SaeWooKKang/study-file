# useMemo 예제

## useMemo함수는 의존성 배열 값 변경시 호출 됨.

## useMemo 사용 x
토글 버튼: on/off 상태 변경
add 버튼: count를 1씩 증가

count를 인수로 처리하는 함수가 존재한다고 했을 때, count와 토글은 전혀 연관이 없지만 switch 버튼을 클릭하면 리렌더링 되면서 count를 인수로 처리하는 함수가 동일한 연산을 수행한다.

복잡한 계산을 수행하는 함수라면 성능상에 문제가 생길 수 있다. 

``` javascript
const [count, setCount] = useState(0);
const [toggle, setToggle] = useState('on');

const onAddCount = () => {setCount(count + 1)}
const onSwitch = () => {
  toggle == 'on' ? setToggle('off') : setToggle('on')
}

const countChecek = () => {
  setTimeout(()=>{
    console.log(`카운트 수: ${count}`)},
    2000);
}
const foo = countChecek();

return (
  <div>
    <>count: {count}</><button onClick={onAddCount}>add count</button>
    <div></div>
    <>스위치: {toggle}</><button onClick={onSwitch}>토글 버튼</button>
      {console.log(`rendering...`)}
  </div>
)
  
```

## useMemo 사용 
이를 해결하기 위해 렌더링시 동일 인수에 대해서 한 번만 시행되는 useMemo를 사용해보겠다.  

``` javascript
const WordRelay = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState('on');

  const onAddCount = () => {setCount(count + 1)}
  const onSwitch = () => {
    toggle == 'on' ? setToggle('off') : setToggle('on')
  }

  const countChecek = () => {
    setTimeout(()=>{
      console.log(`카운트 수: ${count}`)},
     2000);
     return 
  }
  const foo = useMemo(()=> countChecek(),[count])
  
  // 리렌더링시 함수를 호출하지 않고 값을 기억 
  console.log(foo);

  return (
    <div>
      <>count: {count}</><button onClick={onAddCount}>add count</button>
      <div></div>
      <>스위치: {toggle}</><button onClick={onSwitch}>스위치 버튼</button>
      {console.log(`rendering...`)}
    </div>
  )
}

```
useMemo 사용시 리렌더링 되어도 참조 값이 변경 되지 않았으므로 countCheck함수는 호출되지 않는다. 

add버튼 클릭시엔 count 참조 값이 변경되므로 countCheck함수가 정상적으로 호출된다. 