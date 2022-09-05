// 2022-09-05
const solution = (N, K) => {
  // 00 01 10 11 만들기 
  // N 자릿수의 최댓값을 구하면 ? 2^2 -1 = 3
  const max = 2 ** N;  
  
  const res = [];
  // for문 돌면서 이진수로 바꾸고 
  for (let i = 0; i < max; i++) {
    const 이진수 = i.toString(2); // string
    let 갯수 = 0;
    // k 갯수 일치 확인
    for (let j = 0; j < 이진수.length; j++) {
      if (이진수[j] == 1) ++갯수; // 1 == '1' -> true
    }
    if (갯수 == K) res.push(i);
  }
  
  // 배수 거르기 
  return res.filter(a => a % 3 == 0).length;
}