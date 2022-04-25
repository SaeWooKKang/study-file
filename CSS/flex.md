# flex
``` javascript
display: flex; 

<div class='container'>
  <div class='child'>aa</div>
  <div class='child'>bbbbbb</div>
  <div class='child'>cccc</div>
</div>
```
flex 아이템들의
- width는 각 컨텐츠 크기 만큼 차지
- height는 컨테이너 높이 만큼 차지

## 컨테이너 속성
- flex-direction
- justify-content
- align-items
- flex-wrap
  - align-content
  - 아이템들의 행이 2줄 이상 되었을 때의 수직축 방향 정렬
- flex-flow
  - flex-direction + flex-wrap 
  
## 아이템 속성
- flex-basis
  - flex-direction 방향에 따라 **기본 크기 설정**
  - 컨텐츠 크기 넘으면, 컨텐츠 크기 유지
  - 컨텐츠 크기 작으면, flex-basis 크기 유지 
- flex-glow
- flex-shrink
- flex
- align-self
  - align-items를 상속받음

#### 참고 
[1분 코딩](https://studiomeal.com/archives/197)