// 2022-06-22 (+ 1)
// 해시 

function solution(clothes) {
  const map = new Map();

  let res  = 1;

  clothes.forEach(([a, kind]) => { 
    map.set(kind, map.get(kind) + 1 || 1);
  });

  for (const [_, count] of map) {
    res *= (count + 1);
  }

  return res - 1;
}
