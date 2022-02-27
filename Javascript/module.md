# Module

### 정의 
애플리케이션을 구성하는 개별적 요소로서 **재사용 가능한 코드 조각**

- **기능별로** 파일 단위로 분리
- 모듈이 성립하려면 자신만의 **파일 스코프**를 가질수 있어야 함
- 파일 스코프를 갖는 **모듈의 자산은 캡슐화**되어 다른 모듈에서 접근할 수 없음
- 따라서 애플리케이션과 분리되어 개별적으로 존재
- 공개가 필요한 자산에 한정하여 **export** 키워드로 명시적으로 선택적 공개가 가능 

#### 모듈 사용자 
- 공개된 모듈의 자산을 사용하는 모듈
- **import** 키워드로 자신의 스코프 내로 불러들여 재사용 


## JS의 모듈
모듈을 사용하지 않을 경우 js 파일을 여러개로 script태그로 분리해도 하나의 js파일 내에 있는것처럼 동작 -> 하나의 전역 공유
> ESM을 사용하더라도, 번들링을 해야함 따라서 ESM은 잘 사용하지 않고 별도의 모듈 로더를 사용하는것이 일반적 



#### 사용
``` javascript
// 어트리뷰트 추가로 간단하게 사용가능
<script type="module" src='app.mjs'>

// app.mjs
var a = 'aa'; //전역객체 window의 프로퍼티가 아니게 됨. 

// foo.mjs 
console.log(a); // app.mjs의 변수 a 참조 불가능
```

#### export
- 선언문 앞에 사용 
``` javascript
export const a = 'aa';
```
- 하나의 객체로 구성해서 한 번에 export 가능
``` javascript
const a = 'aa';
const b = 'bb';

export {a, b};

// 하나의 값만 사용한다면 default 키워드 가능
// var, let, const 키워드 생략 
export default a;
```
#### import 
``` javascript
import {a, b} from './app.mjs';

// lib.mjs 모듈이 export한 모든 식별자를 import
import * as lib from './lib.mjs';
```