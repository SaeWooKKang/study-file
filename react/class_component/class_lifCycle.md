# Class Componet lifeCycle 실행 순서

아래 예시 호출 순서 

1. render
2. did mount( 상태 변경 )
3. render
4. did update


```javascript

class WordRelay extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      count: 0
    };
    this.addCount = this.addCount.bind(this);
  }
  addCount() {
    this.setState({
      count: this.state.count + 1
    })
  }
  // 컴포넌트가 마운트된 직후 시행
  // 마운트 = 트리에 삽입 된 직후
  // 페인트 되기 전
  componentDidMount() {
    console.log('did mount')
    this.setState({
      count : this.state.count + 100
    })
  }
  //  1. props가 바뀔 때
  //  2. state가 바뀔 때
  //  3. 부모 컴포넌트가 리렌더링 될 때
  //  4. this.forceUpdate로 강제로 렌더링을 트리거할 때
  componentDidUpdate(){
    console.log('did update');
  }
  // 비동기 요청 정리 
  componentWillUnmount() {
     // componentDidMount에서 비동기 요청후 컴포넌트가 종료되면
     // 언마운트 하지 않았을 경우 비동기 요청이 계속 살아 있다.

     // ex) setInterval(()=>{log('zombie)},1000)
     // 컴포넌트 종료시에도 로그를 계속 찍음.

     // 타이머 제거, 네트워크 요청 취소, componentDidMount()내에서 생성된 구독 해지 등등 작업 처리
  }
  render() {
    return (
      <div>
        <button onClick={this.addCount}>증가</button>
        <div>{this.state.count}</div>
        <div>{console.log(`render`)}</div>
      </div>
    )
  }

}
```