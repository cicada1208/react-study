// Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
// rel = ary.splice(start, deleteCount, el,..);
// rel: 回傳被取代的元素
// start: 起始index
// deleteCount: 取代個數，可為0，optional
// el: 取代的元素(數個)，optional

let ary = ['a', 'b', 'c'];
let rel = ary.splice(0, 0, 'x', 'y');
console.log('rel:', rel); // []
console.log('ary:', ary); // [ 'x', 'y', 'a', 'b', 'c' ]

ary = ['a', 'b', 'c'];
rel = ary.splice(0, 2, 'x', 'y', 'z');
console.log('rel:', rel); // [ 'a', 'b' ]
console.log('ary:', ary); // [ 'x', 'y', 'z', 'c' ]

ary = ['a', 'b', 'c'];
rel = ary.splice(1); // 與此相同 ary.length = 1;
console.log('rel:', rel); // [ 'b', 'c' ]
console.log('ary:', ary); // [ 'a' ]
