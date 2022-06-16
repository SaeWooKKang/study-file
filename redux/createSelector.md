# createSelector

- 비용이 많이 드는 함수 계산은 보통 useMemo를 사용하여 캐싱할 수 있는데    
- redux에서 받아온 데이터를 가공하는 경우 한 단계 더 나아가 
- useSelector를 사용하여 의존성 배열 비교조차 안하게 할 수 있다