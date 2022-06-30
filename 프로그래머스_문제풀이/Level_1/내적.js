// 2022-06-30
// 월간 코드 챌린지 시즌 1

function solution(a, b) {
  let res = 0;
  
  for (let i = 0; i < a.length; i++) {
      res += a[i] * b[i];
  }
  
  return res;
}

const solution2 = (a, b) =>  
    a.reduce((acc, c, i) => acc + (c * b[i]), 0);