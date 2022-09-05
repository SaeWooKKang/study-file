// O(n^3)
function solution(participant, completion) {
    completion.forEach((a, i) =>{
        participant.splice(participant.indexOf(a), 1);
    });
    return participant[0]; 
}

// O(nlogn)
function solution(participant, completion) {
    participant.sort();
    completion.sort();
    
    for (let i = 0; i < participant.length; i++) {
        if (participant[i] != completion[i]) return participant[i];
    }
    
}
// O(n)
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
    
    // 참가자 하나인거 찾기 
    for (const [a, v] of map) {
        if (v) return a;
    }
}

// 2022-09-05
// O(n) 
const solution = (참가자, 완주자) => {
  const obj = {};

  for (let i = 0; i < 참가자.length; i++) {
    obj[참가자[i]] = ++obj[참가자[i]] || 1;
  }

  for (let i = 0; i < 완주자.length; i++) {
    --obj[완주자[i]];
  }

  for (const a in obj) {
    if (obj[a] == 1) return a;
  }
}