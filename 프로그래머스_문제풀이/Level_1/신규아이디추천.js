// 2022-06-27 (+1)
// 2021 KAKAO BLIND RECRUITMENT

const peek = (arr) => arr[arr.length - 1];

function solution(new_id) {
  const 특수문자 = [...'~!@#$%^&*()=+[{]}:?,<>/'];
  let res = [];

  // 1단계 대문자 -> 소문자
  // 2단계 해당 안되는 특수문자 제거     
  const filterd = [...new_id]
      .map(a => a.toLowerCase())
      .filter(a => !특수문자.includes(a));
  
  // 3단계 마침표 연속된 것 1개로 치환
  for (const a of filterd) {
      if (peek(res) == '.' && a == '.') continue;
      res.push(a);
  }

  // 4단계 . 처음이나 끝에 위치하면 삭제
  if (res[0] == '.') res.shift(); 
  else if (peek(res)== '.') res.pop();
  
  // 5단계 빈 문자열이면 'a' 대입
  if (res.length == 0) res.push('a');
  
  // 6단계 글자수 15까지 짜르고 마지막이 . 이면 제거
  res = res.slice(0, 15);
  if (peek(res) == '.') res.pop();
  
  // 7단계 글자가 2자 이하면 마지막 문자 3이될때까지 반복해서 붙임
  while(res.length <= 2) {
    res.push(peek(res));
  }
  
  return res.join('');
}