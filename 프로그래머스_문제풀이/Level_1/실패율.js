// 2022-06-20
// 2019 KAKAO BLIND RECRUITMENT

function solution(N, stages) {
  // stages.lengh == '지원한 도전자 수'
  const res = [];
  let prev = 0;

  for (let i = 0; i < N; i++) {
      const filtered = stages.filter(a => a == i + 1); // 1

      res.push(filtered.length / (stages.length - prev));

      prev += filtered.length;
  }

  return res
      .map((a, i) => ({ stage: i + 1, value: a }))
      .sort((a, b) => b.value - a.value)
      .map(a => a.stage);
}
