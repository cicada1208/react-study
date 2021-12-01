// Set: 可按插入的順序迭代元素，其中元素是唯一
let set = new Set();
set.add('hello').add('goodbye').add('hello');
console.log('set.size:', set.size); // 2
console.log('set.has:', set.has('hello')); // true

console.log('set iteration:');
set.forEach(s => console.log(s));

let arySet = Array.from(set);
console.log('set to array:', arySet); // [ 'hello', 'goodbye' ]
let arySet2 = [...set];
console.log('set to array:', arySet2); // [ 'hello', 'goodbye' ]

const nums = [2, 2, 3, 4, 4];
console.log('array to set:', [...new Set(nums)]); // 去重 [ 2, 3, 4 ]

let set2 = new Set();
set2.add('hello').add('test');
let intersection = new Set([...set].filter(x => set2.has(x)));
console.log('intersection:', intersection); // Set { 'hello' }
let difference = new Set([...set].filter(x => !set2.has(x)));
console.log('difference:', difference); // Set { 'goodbye' }

// Map: 可按插入的順序迭代元素，鍵值唯一，鍵或值可為任何型別
let map = new Map();
map.set('hello', 1);
map.set('hello', 3);
map.set(set, 2);
console.log('map.get:', map.get('hello')); // 3
console.log('map.get:', map.get(set)); // 2
console.log('map.get:', map.get('')); // undefined
console.log('map.size:', map.size); // 2
console.log('map.has:', map.has(set)); // true

console.log('map iteration:');
// for (let [key, val] of map) {
//   console.log('key:', key, 'val:', val);
// }
map.forEach((val, key) => console.log('key:', key, ', val:', val));

console.log('map.keys array:', [...map.keys()]);

const obj = {
  one: 1,
  two: 2
};
let mapObj = new Map(Object.entries(obj));
console.log('object to map:', mapObj);
let objMap = Object.fromEntries(mapObj);
console.log('map to object:', objMap);

// WeakSet:
let ws = new WeakSet();
ws.add({ data: 4 });
// Because the added object has no other references, it will not be held in the set

// WeakMap: 鍵只能為 Object，由於弱引用的特性及不可遍歷因此可應用在
// 1. 對特定DOM節點添加狀態時，當DOM節點被刪，將DOM節點作為“鍵”的WeakMap也自動被回收
// 2. 對類或構造函數中私有屬性綁定定義，當實例被刪，作為“鍵”的this消失，WeakMap自動回收
// 3. 系統事件
let wm = new WeakMap();
wm.set(set, { extra: 3 });
console.log('wm.get:', wm.get(set)); // { extra: 3 }
