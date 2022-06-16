# useSelector

1. useSelector는 store를 subscribe하고 있음
2. action이 dispatch시 selector가 실행되고
3. useSelector의 콜백함수의 반환값이 변경 되었다면
4. 해당 컴포넌트 리렌더링 시킴.