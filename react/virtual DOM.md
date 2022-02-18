# virtual DOM
메모리에 virtual DOM을 만들고 ReactDOM과 같은 라이브러리로 실제 DOM과 동기화 하는 프로그래밍 개념  

이러한 과정을 **재조정**이라 한다. 

## 재조정(Reconciliation)  

### 휴리스틱 알고리즘 
state, props가 변경되면 render() 함수는 새로운 React 엘리먼트 트리를 반환하고, 이를 효과적으로 비교하여 갱신 하는 알고리즘 