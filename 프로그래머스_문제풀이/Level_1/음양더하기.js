// 월간 코드 챌린지 시즌 2

// 속도 < 가독성  
function solution(absolutes, signs) {
  return absolutes
      .map((a, i) => signs[i] ? a : a * -1)
      .reduce((a, b) => a + b);
}

// 2022-06-23
// 속도 > 가독성 
const solution = (absolutes, signs) => absolutes
    .reduce((acc, b, i) => acc + (signs[i] ? b : -b) , 0);