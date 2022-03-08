# Symbol

* 다른 값과 중복 x 
* for...in 반복문 배제
* 주로 프로퍼티 키로 사용 

## 값의 생성

함수 호출로 가능 
```javascript
// 인자로 문자열을 전달 할 수 있고 이는 심벌 값에 대한 설명임.
const sym1 = Symbol('symbol 이름..');

// 심볼 값은 외부로 노출되지 않고, 확인 할 수 없음.
log(sym1) // Symbol('symbol 이름..')

// 키가 같아도 다른 값이다. 
const sym2 = Symbol("id");
const sym3 = Symbol("id");
log(sym2 === sym3) // false
```

### Symbol.for(key)

**전역 심벌 레지스트리**(키와 심벌값의 쌍)에서 인수로 전달받은 키값을 찾아서
> !키값 존재 ? 심벌 값 생성 : 심벌 값 반환 
```javascript
const s1 = Symbol.for('symbol1');
const s2 = Symbol.for('symbol1');

log(s1 === s2); // true
```