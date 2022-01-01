
``` javascript
const path = require('path'); 
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // 새로고침



module.exports = {
  name: 'webpack-setting',
  mode: 'development', // 현재: 개발용, 실서비스: production으로 변경
  devtool: 'eval', // 빠르게 하겠다는거
  resolve: {
    extensions: ['.js', '.jsx'] // 확장자 알아서 찾아줌
  },

  // 입력
  entry: {
    app: ['./client.jsx'], //'./other.jsx'이건 다른데서 이미 불러왔기에 중복 작성 안해도 됨
  }, 

  // entry에 옵션들 적용
  module: {
    rules: [{
      test: /\.jsx?/, //정규표현식이고 js파일과 jsx파일을 룰을 적용하는 것 어떤 룰 ? loader: 'babel-loader'
      loader: 'babel-loader', //바벨이랑 웹팩 연결해 줌
     options: {
        presets: [
          ["@babel/preset-env", { // preset-env 버전을 제한함으로서 babel 부하 감소
            target: {
              browser: [' > 1% in KR'], // borwserlist
            },
            debug: true,
          }], 
          "@babel/preset-react",
          ], // 브라우저에게 맞게 최신문법을 알아서 바꿔줌, jsx 이런거 지원

        plugins: [
          "@babel/plugin-proposal-class-properties",
          "react-refresh/babel",
        ],
      },
    }],
  },
  //확장 프로그램 
  plugins: [
    new RefreshWebpackPlugin()
  ],

  // 출력
  output: {
    path: path.join(__dirname,'dist'), // __dirname : 현재 폴더 경로 
    filename: 'app.js'
    publicPath: '/dist',
  }, 

  //서버
  devServer: {
    devMiddleWare: {publicPath: '/dist'},
    static: {directory: path.resolve(__dirname)},
    hot: true,
  },
};
```

프리셋은 하나로 보이지만 수십개의 플러그인들이 합쳐진 것임

핫 리로딩은 기존 데이터 유지 하면서 바꿔줌