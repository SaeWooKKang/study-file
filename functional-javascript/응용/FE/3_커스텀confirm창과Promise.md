``` javascript
const $ = {};

// sel == selector
$.qs = document.querySelector.bind(document);
$.qsa = document.querySelectorAll.bind(document);

// nodeList 반환
$.qs = (sel, parent = document) => parent.querySelector(sel);
$.qsa = (sel, parent = document) => parent.querySelectorAll(sel);

$.find = _.curry($.qs);
$.findAll = _.curry($.qsa);

$.el = html => {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;

  return wrap.children[0]; // wrap은 뺴고 넘김 
};

$.append = _.curry((parent, child) => parent.appendChild(child));

// el부터 document까지 거슬러 올라가며 만족하는 sel 하나 찾음 (기준 요소 포함)
$.closest = _.curry((sel, el) => el.closest(sel));

$.remove = el => el.parentNode.removeChild(el);

$.on = (event, f) => els => 
  _.each(el => el.addEventListener(event, f), _.isIterable(els) ? els : [els]);

const Ui = {};

Ui.confirm = msg => new Promise(resolve => _.go(
  `
    <div class="confirm">
      <div class="body">
        <div class="msg">${msg}</div>
        <div class="buttons">
          <button type="button" class="cancel">취소</button>
          <button type="button" class="ok">확인</button>
        </div>
      </div>
    </div>
  `,
  $.el,
  $.append($.qs('body')),
  _.tap(
    $.find('.ok'),
    $.on('click', e => _.go(
      e.currentTarget,
      $.closest('.confirm'),
      $.remove,
      _ => resolve(true)
  ))),
  _.tap(
    $.find('.cancel'),
    $.on('click', e => _.go(
      e.currentTarget,
      $.closest('.confirm'),
      $.remove,
      resolve,
      _ => resolve(false)
  ))),
));

// Ui.confirm('정말 삭제하시겠습니까?')

// Images = namespace 
const Images = {};
  
Images.fetch = () => new Promise(resolve => setTimeout(() => resolve([
  { name: "HEART", url: "https://s3.marpple.co/files/m2/t3/colored_images/45_1115570_1162087.png" },
  { name: "하트", url: "https://s3.marpple.co/f1/2019/1/1235206_1548918825999_78819.png" },
]), 200));

// iter 받아서 문자로 합쳐줌
const string = iter => _.reduce((a, b) => `${a}${b}`, iter);

// 함수를 합성해서 원하는 함수 만듬
_.strMap = _.curry(_.pipe(L.map, string));

// 간소하게 표현되는 imgs는 변수, 인자다 
Images.tmpl = imgs => `
  <div class="images">
    ${_.strMap(img => `
      <div class="image">
        <div class="box" ><img src="${img.url}" alt=""></div>
        <div class="name">${img.name}</div>
        <div class="remove">x</div>
      </div>
    `, imgs)}
  </div>
`;

_.go(
  Images.fetch(), // [ {}, {}, {}, ...]
  Images.tmpl, 
  $.el, // element로 만들고
  $.append($.qs('body')), // body에 element 추가 
  $.findAll('.remove'), // NodeList
  $.on('click', async ({ currentTarget }) => // 구조분해로 불변적으로 다룸
    await Ui.confirm('정말 삭제하시겠습니까?') &&
      _.go(
        currentTarget, // 현재 target에서
        $.closest('.image'), // 
        $.remove)));
```