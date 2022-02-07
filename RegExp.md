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
- [^] : 대괄호 내의 '^'은 not
- ^ : 대괄호 밖의 '^'은 시작을 의미

## RegExp 메서드

### RegExp.prototype.test
매칭 결과를 boolean 값으로 반환

### RegExp.prototype.exec
매칭 결과를 배열로 반환
> g 플래그 지정해도 첫 번째 매칭 결과 반환

### String.prototype.match
매칭 결과를 배열로 반환