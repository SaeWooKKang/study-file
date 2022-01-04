# useRef 예제

### 목표: useRef를 사용하여 리렌더링시에도 값을 기억하기 

1. add 버튼 클릭시 1씩 증가하는 컴포넌트 제작 

2. add 버튼 클릭시 count상태가 변경되므로 리렌더링 된다.

  * normal 변수는 onAddCount함수에서 재할당을 기억하지 못하고 리렌더링시 값이 'first normal value'로 초기화된다.

  * useRef사용한 ref 변수는 onAddCount 함수에서 재할당한 값을 기억해 '2nd ref'를 호출한다. 


``` javascript 

const App = () => {

  const [count,setCount] = useState(0);


  const ref = useRef('first Ref');
  let normal = 'first normal value';

  console.log(ref); // 첫렌더: 'first Ref' 리렌더: '2nd Ref'
  console.log(normal); // 첫렌더: 'first normal value' 리렌더: 'first normal value'

  const onAddCount = () => {
    setCount(count + 1); 

    // 변수에 값 재할당
    ref.current = '2nd Ref';
    normal = '2nd normal value';
  }


  return (
    <div>{count}</div>
    <button 
      type="button"
      onClick={onAddCount}
      > add
    </button>
  )
  
}




```
