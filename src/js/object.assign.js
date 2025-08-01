// The Object.assign() method copies all enumerable own properties
// from one or more source objects to a target object.
// Properties on the prototype chain and non-enumerable properties cannot be copied.
// It returns the target object.
// Syntax: Object.assign(target, ...sources)

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const source2 = { d: 5, e: 6 };
const returnedTarget = Object.assign(target, source, source2);
console.log('target:', target); // { a: 1, b: 3, c: 4, d: 5, e: 6 }
console.log('returnedTarget:', returnedTarget); // { a: 1, b: 3, c: 4, d: 5, e: 6 }
console.log('target === returnedTarget:', target === returnedTarget); // true

function Class1() {
  this.a = 1;
}
function Class2() {
  this.c = 3;
}
Class1.prototype.b = 2;
Class2.prototype.d = 4;

console.log(
  'Object.assign:',
  Object.assign({ a: 0 }, new Class1(), new Class2())
); // { a: 1, c: 3 }

const _ = require('lodash');

console.log('_.assign:', _.assign({ a: 0 }, new Class1(), new Class2())); // { a: 1, c: 3 }

console.log('_.assignIn:', _.assignIn({ a: 0 }, new Class1(), new Class2())); // { a: 1, b: 2, c: 3, d: 4 }

console.log('_.defaults:', _.defaults({ a: 1 }, { b: 2 }, { a: 3 })); // { 'a': 1, 'b': 2 }

console.log('_.defaults:', _.defaults({ a: { b: 2 } }, { a: { b: 1, c: 3 } })); // { a: { b: 2 } }

console.log(
  '_.defaultsDeep:',
  _.defaultsDeep({ a: { b: 2 } }, { a: { b: 1, c: 3 } })
); // { 'a': { 'b': 2, 'c': 3 } }

var objMergeDes = { a: [{ b: 2 }, { d: 4 }] };
var objMergeSrc = { a: [{ c: 3 }, { e: 5 }] };
console.log('_.merge:', _.merge(objMergeDes, objMergeSrc)); // { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

console.log('_.merge:', _.merge({ a: { b: 1 } }, { a: { d: 2 } })); // { a: { b: 1, d: 2 } }

function customizerMergeWith(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
var objMergeWithDes = { a: [1], b: [2] };
var objMergeWithSrc = { a: [3], b: [4] };

console.log(
  'mergeWith:',
  _.mergeWith(objMergeWithDes, objMergeWithSrc, customizerMergeWith)
); // { 'a': [1, 3], 'b': [2, 4] }

// shallow clone
const obj = { a: 1 };
const shallowCopy = Object.assign({}, obj);
console.log('shallowCopy:', shallowCopy); // { a: 1 }
console.log('obj === shallowCopy:', obj === shallowCopy); // false

// Object.assign is not deep clone.
// For deep cloning, we need to use alternatives,
// because Object.assign() copies property values.
// If the source value is a reference to an object,
// it only copies the reference value.
let obj1 = { a: 0, b: { c: 0 } };
let obj2 = Object.assign({}, obj1);
console.log('obj2:', JSON.stringify(obj2)); // { "a": 0, "b": { "c": 0}}

obj1.a = 1;
console.log('obj1:', JSON.stringify(obj1)); // { "a": 1, "b": { "c": 0}}
console.log('obj2:', JSON.stringify(obj2)); // { "a": 0, "b": { "c": 0}}

obj2.a = 2;
console.log('obj1:', JSON.stringify(obj1)); // { "a": 1, "b": { "c": 0}}
console.log('obj2:', JSON.stringify(obj2)); // { "a": 2, "b": { "c": 0}}

obj2.b.c = 3;
console.log('obj1:', JSON.stringify(obj1)); // { "a": 1, "b": { "c": 3}}
console.log('obj2:', JSON.stringify(obj2)); // { "a": 2, "b": { "c": 3}}

// deep clone
obj1 = { a: 0, b: { c: 0 } };
let obj3 = JSON.parse(JSON.stringify(obj1));
obj1.a = 4;
obj1.b.c = 4;
console.log('obj3:', JSON.stringify(obj3)); // { "a": 0, "b": { "c": 0}}
