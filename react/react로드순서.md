# React 로드 순서

1. client가 Front서버에 HTML 요청
2. 브라우저의 렌더링 엔진이 DOM CSSOM 파싱
3. script태그 만나면 js bundle 요청
4. 렌더링엔진으로부터 제어권을 넘겨받은 자바스크립트 엔진이 응답받은 JS 파싱
5. ~ 리액트 생명주기 ~