// 2022-06-21
// 2018 KAKAO BLIND RECRUITMENT

// 점수(0 ~ 10), 보너스(S, D, T), 옵션 (*, #)
function solution(dartResult) {
  let res = [];
  const option = [];
  let strIndex = 0;     

  // 데이터 가공 
  // res = [ [점수, 보너스], [...], [...] ]
  // option = ["*", null, "#"]
  for (i = 0; i < dartResult.length; i++) {
    const bonus = ['S','D','T'].includes(dartResult[i]);
    const option2 = ['*','#'].includes(dartResult[i + 1]);

    if (bonus && option2) {
      res.push([
        dartResult.slice(strIndex, i),
        dartResult[i]    
      ]);

      option.push(dartResult.slice(i + 1, i + 2));
      strIndex = i + 2;
      } else if (bonus) {
        res.push([
          dartResult.slice(strIndex, i),
          dartResult[i],
        ]);
        
        strIndex = i + 1;
        option.push(null);
      }
  }

  // bonus 적용
  res = res.map(([value, bonus]) => {
    let res;

    if (bonus == 'S') {
      res = Number(value) ** 1;
    } else if (bonus == 'D') {
      res = Number(value) ** 2;
    } else {
      res = Number(value) ** 3;
    }

    return res;
  });

  // option 적용
  option.forEach((a, i) => {
    if (a == '*') {
      if (i == 0) {
        res[i] = res[i] * 2;
      } else {
        res[i - 1] = res[i - 1] * 2;
        res[i] = res[i] * 2;
      }
    } else if (a == '#') {
      res[i] = res[i] * -1;
    }
  });

  return res.reduce((a, b) => a + b, 0);
}