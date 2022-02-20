# 클래스 컴포넌트 이벤트 처리 

### 바인드 x 
```javascript
class WordRelay extends React.Component{
  constructor(props) {
    super(props)
    this.state = {click: false};
  }

  handleClick(){
    console.log('클릭시 함수 호출은 됨');
    console.log(this); // window

    // 이벤트 핸들러에 전달된 콜백함수는 함수다. 
    // 따라서 함수로서 호출 된다.
    // 함수로서 호출시 this는 window이므로 
    // 인스턴스의 프로퍼티를 참조 할 수는 없다. 
    this.setState({click: true})// setState is not afunction
  }

  render(){
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
        {console.log(this)} // WordRelay
      </div>
    )
  }
}
```

// TODO 다시 읽어보기 
### 바인드 o 
```javascript
class WordRelay extends React.Component{
  constructor(props) {
    super(props)
    this.state = {click: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log(this) // WordRelay
    this.setState({click: true})
    console.log('인스턴스의 프로퍼티 접근 가능!');
  }

  render(){
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}
```

### 필드 사용
```javascript
class WordRelay extends React.Component{
  constructor(props) {
    super(props)
    this.state = {click: false};
  }

  handleClick = () => {
    //화살표 함수는 this가 없으므로 상위 스코프의 this 참조 
    console.log(this) // WordRelay
    this.setState({click: true})
    console.log('인스턴스의 프로퍼티 접근 가능!');
  }

  render(){
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}
```

