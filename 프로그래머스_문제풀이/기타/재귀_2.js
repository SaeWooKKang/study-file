// 2022-09-05
const solution = (arr) => {
  if (arr.length == 1) return arr;

  const res = [];
  for (let i = arr.length - 1; i >= 0; i--) {
   res.push(arr[i]); 
  }

  let front, back;
  // 짝수일 경우
  if (arr.length % 2 == 0) {
    front = res.slice(0, arr.length / 2);
    back = res.slice(arr.length / 2);

  } 
  // 홀수일 경우
  else {
    front = res.slice(0, Math.ceil(arr.length / 2));
    back = res.slice(Math.ceil(arr.length / 2));
  }

  return [...solution(front), ...solution(back)]
}