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

// object instanceof constructor:
// 判斷 object 是否為 constructor 的實例，比較的是原型(prototype)；
// constructor.prototype 存在於 object 的原型鍊(prototype chain)裡面，
// 則回傳 true，否則 false。例：new Date() instanceof Date，回傳true。
