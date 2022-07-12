// 2022-07-12
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  
  for (let i = 0; i < participant.length; i++) {
    if (participant[i] != completion[i]) {
      return participant[i];
    }
  }
}

function solution(participant, completion) {
  const map = new Map();
  
  // 참가자들 map에 저장
  participant.forEach(a => {
    map.set(a, map.get(a) + 1 || 1)
  })
  // 완주자들 map에서 빼기
  completion.forEach(a => {
    map.set(a, map.get(a) - 1)
  })
  // console.log(map)
  // 참가자 하나인거 찾기 
  for (const [a, v] of map) {
    if (v) return a;
  }
}

// 효율성 탈락 코드
function solution(participant, completion) {
  completion.forEach((a, i) =>{

    participant.splice(participant.indexOf(a), 1);

  });
  return participant[0]; 
}