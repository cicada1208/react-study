var set = new Set();
set.add('hello').add('goodbye').add('hello');
console.log(set.size); // 2
console.log(set.has('hello')); // true

var m = new Map();
m.set('hello', 1);
m.set(set, 2);
console.log(m.get('hello')); // 1
console.log(m.get(set)); // 2
console.log(m.get('')); // undefined
