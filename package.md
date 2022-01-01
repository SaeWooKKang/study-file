### package.json 파일

* npm을 통해 설치된 패키지 목록을 관리
* 프로젝트의 정보 및 기타 실행 스크립트를 작성하는 파일

***
## NPM(Node Package Manager)
***

### npm init 
* 노드 패키지 매니저가 해당 폴더를 관리할 것을 알림
* package.json 파일 생성함

### npm install 
반복되는 세팅들을 일일이 타입핑으로 터미널에서 다운받는것은 번거로움 

따라서 package.json에 모듈과 버전 기록 후 npm install시 작성된 dependencies 기반 모듈들을 한 번에 추가 할 수 있음 

***
## 모듈
***

### babel-loader
* 바벨과 웹팩 연결
* babel 및 webpack을 사용하여 javascript 파일을 변환 할 수 있음

### react-refresh 
Fast Refresh를 구현.  
Fast Refresh는 실행 중인 응용프로그램에서 상태를 잃지 않고 React Component 구성요소 편집할 수 있는기능 

> npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin


##### webpack 설정
```javascript
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

"module" : {
  "options": {
    "plugins" : ["react-refresh/babel"]
  },
},
"plugins" : [ new ReactRefreshWebpackPlugin()],
```

