# Model, Collection 클래스 만들어서 이터러블 프로토콜 지원하기 

``` javascript
// 객체지향 프로그래밍을 사용하고 있더라도, 얼마든지 이터러블 프로그래밍과 함께 쓸 수 있다

class Model {
  constructor(attrs = {}) {
    this._attrs = attrs;
  }
  get(k) {
    return this._attrs[k];
  }
  set(k,v) {
    this._attrs[k] = v;
    return this;
  }
}
// 모델들을 가짐
class Collection {
  constructor(models = []) {
    this._models = models;
  }
  at(idx) {
    return this._models[idx];
  }
  add(model) {
    this._models.push(model);
    return this;
  }
  // 이터러블은 이터레이터를 반환하는 Symbol.iterator 함수를 가진 값
  // *[Symbol.iterator]() {
  //   for (const model of this._models) {
  //     yield model;
  //   }
  *[Symbol.iterator]() {
   yield *this._models;
  }
}

const coll = new Collection();

coll.add(new Model({id: 1, name: 'AA'}));
coll.add(new Model({id: 2, name: 'BB'}));
coll.add(new Model({id: 3, name: 'CC'}));
log(coll.at(2).get('name'));
log(coll.at(1).get('id'));

log([...coll]);

const iter = coll[Symbol.iterator]();
log(iter);

_.go(
  coll,
  L.map(m => m.get('name')),
  _.each(log)
);
```