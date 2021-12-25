
```javascript
// <ES2015 모듈 문법>
// 여러개 작성 가능
import React, { Component } from 'react';
export const hello = 'hello' // import {hello}
export const bye = 'hello' // import {hello, bye}
// 한 번만 작성 가능
export default NumberBaseball // import NumberBaseball

// <node commonJS> 
const React = require('react');
exports.hello = 'hello';
module.exports = "NumberBaseball";
```
require : 노드의 모듈 시스템
module.exports like export default

노드는 require만 가능한데 바벨이 import를 require로 바꿔줌