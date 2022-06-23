// 2022-06-23 (count: 1)
// 2021 Dev-Matching 웹 백엔드 개발자

const order = n =>  n == 6 ? 1 
  : n == 5 ? 2
  : n == 4 ? 3
  : n == 3 ? 4
  : n == 2 ? 5
  : 6;

function solution(lottos, win_nums) {
  let correct = 0;
  let zero_count = 0;
  
  for (const a of lottos) {
      if (win_nums.includes(a)) correct++;
      if (a == 0) zero_count++;
  }
      
  return [order(correct + zero_count), order(correct)];
}