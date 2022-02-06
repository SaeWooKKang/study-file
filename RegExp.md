# 정규 표현식

## 정규 표현식 리터럴
``` javascript
const regexp = /regexp/i // 패턴 + 플래그 
```

## 플래그 
- i : Ignore case (대소문자 구분 x)
- g : Global (전역 검색)
- m : Multi line

## 패턴
- \+ : 한 번 이상 반복
- ? :  {0, 1} 0번이상 1번 이하 
- | : or 
- [a-z] : 대괄호 내의 '-'는 범위 지정
- [AB] : 대괄호 내의 '문자'는 or 
- $ : 문자열의 마지막을 의미 