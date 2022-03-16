# takeWhile, takeUntil

``` javascript
// 언제까지 그 일을 할것이냐 선택적으로, 전략적으로 선택을 할 수 있는것

// 반환값이 true면 계속 순회, false 나오면 true만 배열로 반환
_.go(
  [1, 2, 3 ,4, 5, 6, 7, 8, 0, 0, 0],
  _.takeWhile(a => a), // [1, 2, 3, 4, 5, 6, 7, 8]
  _.each(log)
);

// true로 평가되는 개번까지만, false 나오면 계속 순회 
_.go(
  [1, 2, 3 ,4, 5, 6, 7, 8, 0, 0, 0],
  _.takeUntil(a => a),
  _.each(log) // 1
);

_.go(
  [0, false, undefined, null, 10, 20, 30],
  _.takeUntil(a => a), // [0, false, undefined, null, 10]
  _.each(log)
);
```