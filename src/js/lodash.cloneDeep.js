const _ = require('lodash');

let obj1 = { a: 0, b: { c: 0 } };
// let obj2 = Object.assign({}, obj1); // shallow clone(not deep clone)
// let obj2 = _.clone(obj1); // shallow clone(not deep clone)
let obj2 = _.cloneDeep(obj1);

obj2.b.c = 3;
console.log('obj1:', JSON.stringify(obj1)); // {"a":0,"b":{"c":0}}
console.log('obj2:', JSON.stringify(obj2)); // {"a":0,"b":{"c":3}}
