# quert To Object
``` javascript
  // a=1&c=CC&d=DD
const split = _.curry((sep, str) => str.split(sep));

const queryToObject = _.pipe(
  split('&'),
  _.map(split('=')),
  _.map(([a, b]) => ({[a]:b})),
  _.reduce(Object.assign)
  );

log(queryToObject('a=1&c=CC&d=DD'));

Object.assign({a:1}, {b:2}); // {a:1, b:2}
```