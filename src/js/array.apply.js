const aryNotInit = Array(2); // 未初始化
// 等價於 let ary = new Array(2);
console.log('aryNotInit:', aryNotInit); // [ <2 empty items> ]

const aryInit = Array.apply(null, { length: 2 }); // 初始化
// 等價於 let aryInit = Array.apply(null, Array(2));
console.log('aryInit:', aryInit); // [ undefined, undefined ]

// map 不會遍歷 ary 中未初始化或者被 delete 的元素
let aryMap = aryInit.map((elem, index) => index);
console.log('aryMap:', aryMap); // [0, 1]
