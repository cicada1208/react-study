// Set: 可按照插入的順序迭代元素，其中元素是唯一
let set = new Set();
set.add('hello').add('goodbye').add('hello');
console.log('set.size:', set.size); // 2
console.log('set.has:', set.has('hello')); // true

console.log('set iteration:');
set.forEach(s => console.log(s));

console.log('set to array:');
let arySet = Array.from(set);
console.log('arySet:', arySet); // [ 'hello', 'goodbye' ]
let arySet2 = [...set];
console.log('arySet2:', arySet2); // [ 'hello', 'goodbye' ]

console.log('array to set:');
const nums = [2, 2, 3, 4, 4];
console.log([...new Set(nums)]); // 去重 [ 2, 3, 4 ]

let set2 = new Set();
set2.add('hello').add('test');
let intersection = new Set([...set].filter(x => set2.has(x)));
console.log('intersection:', intersection); // Set { 'hello' }
let difference = new Set([...set].filter(x => !set2.has(x)));
console.log('difference:', difference); // Set { 'goodbye' }

// Map:
let map = new Map();
map.set('hello', 1);
map.set(set, 2);
console.log('map.get:', map.get('hello')); // 1
console.log('map.get:', map.get(set)); // 2
console.log('map.get:', map.get('')); // undefined
console.log('map.size:', map.size); // 2
console.log('map.has:', map.has(set)); // true
console.log('map iteration:');
// for (let [key, val] of map) {
//   console.log('key:', key, 'val:', val);
// }
map.forEach((val, key) => console.log('key:', key, ', val:', val));

// WeakSet:
let ws = new WeakSet();
ws.add({ data: 4 });
// Because the added object has no other references, it will not be held in the set

// WeakMap:
let wm = new WeakMap();
wm.set(set, { extra: 3 });
console.log('wm.get:', wm.get(set)); // { extra: 3 }
console.log('wm.size:', wm.size); // undefined
