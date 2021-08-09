// typeof var1:
// To check type of variable.
// return js data type: "number", "string", "boolean", "object", "function", "undefined", "symbol", "bigint"
console.log('typeof 3.14:', typeof 3.14); // number
console.log('typeof Infinity:', typeof Infinity); // number
console.log('typeof NaN:', typeof NaN); // number
console.log('typeof null:', typeof null); // object
console.log('typeof new Number(1):', typeof new Number(1)); // object
console.log("typeof new String('abc'):", typeof new String('abc')); // object
console.log('typeof new Boolean(true):', typeof new Boolean(true)); // object
console.log('typeof new Date():', typeof new Date()); // object
console.log('typeof function() {}:', typeof function () {}); // function
console.log('typeof class C {}:', typeof class C {}); // function

// obj instanceof constructor:
// 判斷 obj 是否為 constructor 的實例，比較的是原型(prototype)；
// constructor.prototype 存在於 obj 的原型鍊(prototype chain)裡面，
// 則回傳 true，否則 false。例：new Date() instanceof Date，回傳true。
function C() {}
function D() {}
var obj = new C();
// true, 因 C.prototype 在 obj 的原型鍊內
console.log('obj instanceof C:', obj instanceof C); // true
console.log(obj.__proto__ === C.prototype); // true
// false, 因 D.prototype 不在 obj 的原型鍊鍊內
console.log('obj instanceof D:', obj instanceof D); // false
console.log(obj.__proto__ === D.prototype); // false
// true, 因 Object.prototype 在 obj 的原型鍊內
console.log('obj instanceof Object:', obj instanceof Object); // true
console.log(obj.__proto__.__proto__ === Object.prototype); // true

// 以此方式可取得所有類型:
// 格式為[object xxx]，xxx包含了String、Number、Boolean、Undefined、Null、Function、Date、Array、RegExp、Error、HTMLDocument 等
console.log(Object.prototype.toString.call('')); // [object String]
console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call(new Date())); // [object Date]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(new Function())); // [object Function]
