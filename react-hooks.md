# React Hooks 문서 발췌

hook은 props, state, context, refs, lifecycle 같은 react 개념에 좀 더 직관적인 API를 제공한다.

Hook은 계층의 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와줍니다.

Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수

## 내장 Hook

### State Hook: useState

일반적으로 일반 변수는 함수가 끝날 때 사라지지만, state 변수는 React에 의해 사라지지 않습니다.
useState 함수의 반환값: state 변수, 해당 변수를 갱신할 수 있는 함수 이 두 가지 쌍을 반환

```javascript
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState("banana");
```

### Effect Hook: useEffect

생명주기 메서드를 하나로 통합한 것
side effects를 수행할 수 있게 도와줌
렌더링 이후에 effects를 실행
첫번째 렌더링과 이후의 모든 업데이트에서 수행됨.

React는 우리가 넘긴 함수를 기억했다가 DOM 업데이트를 수행한 이휴에 불러낸다.

subscription과 같은 clean-up이 필요할 경우(메모리 누수 방지) useEffect의 반환값을 함수로 반환한다.

Effect를 건너뛰어 성능 최적화 하기

첫 번째 렌더링 혹은 업데이트시 매번 Effect는 실행 되므로 성능 저하를 발생 시키는 경우도 있음. 이를 해결하기 위해 useEffect함수의 두번째 인수로 배열을 넘기면 이전 값과 비교해서 변경되면 useEffect를 수행하게 함. -> 성능 최적화

###Hook 규칙

반복문, 조건문 혹은 중첩된 함수 내에서 Hook을 호출하지 마세요

Effect Hook: useCallback
부모 component의 state 변화시 자식 컴포넌트도 rerendering 되는데 일부만 변경시키고 최적화를 위해서 사용

useMemo: 특정 결과값을 재사용
useCallback: 특정 함수를 새로 만들지 않고 재사용

함수들은 컴포넌트가 리렌더랑 될 때 마다 새로 만들어 진다. useCallback을 사용함으로서 함수를 rememorization 함.