// for function calls:
const numbers = [1, 2, 3];

function sum(x, y, z) {
  return x + y + z;
}
// pass all elements of numbers as arguments to function sum
console.log(sum(...numbers)); // 6

function sum2(a, b, x, y, z) {
  return a + b + x + y + z;
}
console.log(sum2(4, ...numbers, ...[5])); // 15

// for array literals or strings:
let ary = [...numbers, 4, 'five'];
console.log(ary); // [ 1, 2, 3, 4, 'five' ]

// copy an array
let ary2 = [...ary];
console.log(ary2 === ary); // false
ary2.push(6);
console.log(ary2, ary); // [ 1, 2, 3, 4, 'five', 6 ] [ 1, 2, 3, 4, 'five' ]

// not copy
ary2 = ary;
console.log(ary2 === ary); // true
ary2.push(7);
console.log(ary2, ary); // [ 1, 2, 3, 4, 'five', 7 ] [ 1, 2, 3, 4, 'five', 7 ]

// for object literals:
const obj1 = { a: '1', b: '2' };
const obj2 = { a: '3', c: '4' };
let obj = { ...obj1, ...obj2 };
console.log(obj); // { a: '3', b: '2', c: '4' }
obj = { ...obj1, a: '5', c: '6' };
console.log(obj); // { a: '5', b: '2', c: '6' }
