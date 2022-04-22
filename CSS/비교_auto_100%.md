# auto, 100% 다른 점 
```
100%는 부모 태그의 영향을 받고, auto는 자식 태그의 영향을 받는다.
```
### auto
``` javascript
// #innerDiv의 높이는 50px
<div style="height: 50px">
  <div id="innerDiv" style="height: 100%"></div>
</div>
```

### 100%
``` javascript
// #innerDiv의 높이는 10px
<div style="height: 50px">
    <div id="innerDiv" style="height: auto">
        <div id="evenInner" style="height: 10px"></div>
    </div>
</div>
```

#### 참고
> [stackoverflow](https://stackoverflow.com/questions/15943009/difference-between-css-height-100-vs-height-auto)