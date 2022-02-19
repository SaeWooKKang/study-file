# SCSS

## 특징
- 변수 : '$'
- Partials : _partials.scss / @use 'partials'
- Mixins : @mixin / @include
- Extend/Inheritance : % / @extend

#### 변수 
- 변수명 앞에 '$' 사용
``` javascript
$primary-color: #333;
```

#### Partials
- 모듈화 가능 
- 파일명 앞에 '_' 사용 ex) _partial.scss
- @use 'partial'로 사용 가능

#### Mixins 
- 함수처럼 사용 

``` javascript
@mixin theme($theme: DarkGray) {
  background: $theme;
  color: #fff;
}
.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
```

#### Extend/Inheritance
- '%' 키워드로 상속 구현 
- @extend 
