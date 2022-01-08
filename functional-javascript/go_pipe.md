
``` javascript
// 코드를 값으로 다루어 표현력 높이기 
// 값들을 받아서 계산해줌 

초기값을 받아서 함수를 연속적으로 처리 함 
const go = (...args) => reduce((a,f)=>f(a),args)

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log)

```