- **[1-2]** 자바스크립트 스펙 외우지 마세요
    - 언어학자 아니다
    - 90프로를 학습하는데 10%의 힘이 들면 100프로 학습하는데 90프로가 든다.
    - 나머지 1%는 안쓰면 된다.
    - 머리속에 그림을 그려야 한다.
    - 스택, 큐에 대해 설명했음
- **[1-3]** 호출 스택분석
  - 함수 선언, 실행 구분해서 콜스택에 EC 쌓이는것 머릿속에서 생각할 수 있도록 연습
- **[1-4]** 스코프 체인
    - 스코프 체인은 함수에서 어떤 값에 접근이 가능한가, 어떤 값에 접근이 불가능한가 이다.
    - 함수의 선언부만 보면됨. 화살표로 표시할 것 foo → 전역
    - 이런게 lexical scope임 어휘적 스코프
    - 한 번 실행되면 이런 화살표 관계는 절대 변경되지 않음으로
    - 들여쓰기 잘하면 좋음
    - → 코드를 분석하는 법을 배웠다.
- **[1-6]** this는 호출 때 결정된다고!!!
    - node 에서는 global이고, JS에서는 window
    - 사용시 분기 처리 해야하므로 globalThis로 통합됨
    - use strict 모드에서는 this는 undefined
    ``` javascript
    const obj = {
        name: 'pac',
        getName: () => console.log(this.name)
    };
    obj.getName(); 
    // 메서드로서 호출한다고 했을 때에도 함수가 화살표함수로 정의가 되어 
    // 있다면 객체 obj를 가르키지 않는다.
    // 위의 코드는 window.name을 가리킴 결과값은  ''이다.
    ```
    - bind는 this 전달해서 함수 만들고,
    - apply는 this 전달해서 즉시 실행
    - call
    - this는 LE처럼 정해져 있는것이 아니라 호출할 때 결정된다고!!!!
    - new 키워드, object.method하는 경우 call, bind, apply하는 경우 바뀜
    ``` javascript
    const obj = {
        name: 'pac',
        getName() { 
            console.log(this.name);
            function inner () {
                console.log(this.name);
            }
            inner();
        }
    };
    // inner의 scope 체인은 
    // inner -> getName -> 전역 

    const getN = obj.getName; // 메서드는 함수에 종속되어 있는것이 아닌 
    // 참조값을 저장하고 있는것임 
    getN(); // this는 호출될때 결정되는데 이는 함수로서 호출됨 따라서 this는 window
    // 호출 -> 콜스택에 EC 쌓을때 this 옆에 그려놓으면 좋음
    ```
- **[1-7]** this를 분석할 수 없는 케이스
    - this는 호출시 결정되는데 콜백함수가 어떻게 실행됐는지 보이지 않으니 알 수 없음.
    - addEventListener의 this는 경험적으로 알 수 있음.
    ``` javascript
    const root = document.querySelector('#root');
    root.addEventListener('click', function() {
        console.log(this); // <div id="root"></div>
    });

    const root = {
        addEventListener: function(event, callback) {
            callback(); // this는 window이다.
            callback.call(this); // 이런식으로 되어있을거다.
        }
    };
    // 화살표 함수일 때
    // this는 window임 
    // this가 addEventListener라고 생각할 수 있지만. 
    // addEventListener는 호출이고 화살표 함수는 선언이다
    // 화살표 함수 this는 스코프 체이닝을 통해 전역객체 window를 가리킴
    root.addEventListener('click', () => console.log(this));
    ```
    ``` javascript
    a.apply(window) === a.bind(window)() === a.call(window)

    // 인자를 배열로 넘기느냐 값으로 넘기느냐의 차이
    a.apply(null, [3, 5]);
    a.call(null, 3, 5);
    ```

#### 참고
[제로초](https://www.youtube.com/c/ZeroChoTV) 