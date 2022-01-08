# shouldComponentUpdate 예시

Parent 컴포넌트 리렌더링시 Child 컴포넌트도 리렌더링 되는데,  Parent의 상태변화와 상관없을 경우 리렌더링을 방지하여 성능을 최적화 할 수 있다.

### shouldComponentUpdate 미사용시 
add 버튼 클릭하면 Parent 컴포넌트의 상태가 변경 되므로 하위 컴포넌트인 Child 컴포넌트도 리렌더링이 발생한다. 하지만 Child 컴포넌트는 상위 컴포넌트의 상태를 상속하지 않으므로 렌더링은 불필요하다. 
### shouldComponentUpdate 사용시
Parent 컴포넌트 상태 변화시 Child 컴포넌트가 렌더링 되기 전에 shouldComponentUpdate 함수가 호출되고 현재 값과 다음 값을 비교한 뒤 같으면 false를 반환해서 Child 컴포넌트가 렌더링되지 않는다. 

``` javascript
class Child extends Component {
  //렌더링 되기 전에 실행
  shouldComponentUpdate(nextProps, nextState){
    if(this.props == nextProps){
      return false
    }
  }
  render(){
    return <div>하위 컴포넌트</div>
  }
}

class Parent extends Component {
  state = {
    count: 1
  }
  
  onCountAdd = () => {
    this.setState({
      count : this.state.count + 1
    })
  }

  render() {
    // this는 WordRelay
    return(
      <div>
        <Child/>
        <div>{this.state.count}</div>
        <button onClick={this.onCountAdd}>add</button>
      </div>
    ) 
  }
}
```