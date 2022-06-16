// 2018 Summer/Winter Coding
// 2022-06-16

const 조합 = (arr, count) => {
  const res = [];
  if (count == 1) return arr.map(a => [a]);

  arr.forEach((fix, i, origin) => {
    const sliced = origin(i + 1);

    const 조합된 = 조합(sliced, count - 1);

    const 합친 = 조합된.map(a => [fix, ...a]);

    return res.push(...합친);
  })

  return res;
}
const 소수판별 = n => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) return false;
  }
  return true;
}
function solution(nums) {
  return 조합(nums, 3)
    .map(a => a.reduce((b, c) =>  b + c, 0))
    .reduce((acc, a) => 소수판별(a) ? acc + 1 : acc, 0)
}