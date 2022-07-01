// 2022-06-30 (+3)
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

// 2022-07-01
// for -> forEach
const solution3 = (a, b) => {
  let res = 0;

  a.forEach((_, i) => {
    res += a[i] * b[i];
  });
  
  return res;
}

// 2번을 통일감 있게 변경
const solution4 = (a, b) => 
    a.reduce((acc, _, i) => acc + a[i] * b[i], 0);