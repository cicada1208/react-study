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
console.log('prototype:', Object.assign({ a: 0 }, new Class1(), new Class2())); //  { a: 1, c: 3 }

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
