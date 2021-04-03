// 解構賦值

// array destructuring:
let a, b, aryRest;
[a, b, ...aryRest] = [1, 2, 3, 4, 5];
console.log('a:', a); // 1
console.log('b:', b); // 2
console.log('rest:', aryRest); // [ 3, 4, 5 ]

const c = [1, 2, 3];
const [d, e] = c;
console.log('d:', d); // 1
console.log('e:', e); // 2

// default values
let f, g;
[f = 2, g = 3] = [1];
console.log('f:', f); // 1
console.log('g:', g); // 3

// swapping variables
const ary = [1, 2];
[ary[1], ary[0]] = [ary[0], ary[1]];
console.log('ary:', ary); // [2,1]

// ignoring some function returned values
const fun = () => [1, 2, 3];
const [h, , i] = fun();
console.log('h:', h); // 1
console.log('i:', i); // 3

// object destructuring:
let x, y, objRest;
({ x, y, ...objRest } = { x: 10, y: 20, z: 30, a: 40 });
console.log('x:', x); // 10
console.log('y:', y); // 20
console.log('objRest:', objRest); // {z: 30, a: 40}

// assigning to new variables and default values
// 重命名 j 為 jj
const { j: jj = 1, k = 2 } = { j: 3 };
console.log('jj:', jj); // 3
console.log('k:', k); // 2

// unpacking fields from objects passed as a function parameter
// and setting a function parameter's default value
const user = {
  id: 42,
  displayName: 'jdoe',
  fullName: {
    firstName: 'John',
    lastName: 'Doe',
  },
  // body: { height: 170, weight: 56 },
};

function whois({
  displayName = 'jdoe.def', // set default value
  fullName: { firstName: name }, // 重命名 firstName 為 name
  body = { height: 180, weight: 65 }, // set default value
}) {
  return `${displayName} is ${name}, height=${body.height}, weight=${body.weight}.`;
}
console.log(whois(user)); // jdoe is John, height=180, weight=65.

function whois2({
  displayName: aliasName = 'jdoe.def', // 重命名 displayName 為 aliasName 且 set default value
  fullName = { firstName: 'John.def' },
  body = { height: 180, weight: 65 },
} = {}) {
  return `${aliasName} is ${fullName.firstName}, height=${body.height}, weight=${body.weight}.`;
}
// whois2 之所以可不用傳參數，是因 = {}
console.log(whois2()); // jdoe.def is John.def, height=180, weight=65.

// nested object and array destructuring:
const metadata = {
  title: 'test',
  translations: [
    {
      title: '測試',
      last_edit: '2014-04-14T08:43:37',
    },
  ],
};

let {
  title: engTitle, // rename
  translations: [
    {
      title: chsTitle, // rename
    },
  ],
} = metadata;

console.log('engTitle:', engTitle); // test
console.log('chsTitle:', chsTitle); // 測試

// computed object property names and destructuring:
let key = 'z';
let { [key]: foo } = { z: 'bar' };
console.log('foo:', foo); // bar

// combined array and object destructuring:
const props = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
];
const [, , { name }] = props;
console.log('name:', name); // C

// for of iteration and destructuring:
const people = [
  {
    name: 'Mike Smith',
    family: {
      sister: 'Samantha Smith',
    },
    age: 35,
  },
  {
    // name: 'Tom Jones',
    family: {
      sister: 'Howard Jones',
    },
    age: 25,
  },
];

for (const {
  name: n = 'test',
  family: { sister: s },
} of people) {
  console.log('name: ' + n + ', sister: ' + s);
}
// name: Mike Smith, sister: Samantha Smith
// name: test, sister: Howard Jones

// the prototype chain is looked up when the object is deconstructed
let obj = { self: '123' };
obj.__proto__.prot = '456';
const { self, prot } = obj;
console.log('self:', self); // 123
console.log('prot:', prot); // 456
const { ...rest } = obj; // object rest destructuring is shallow clone (excluding prototype)
console.log('rest:', rest); // rest: { self: '123' }
