let str = 'a,b,c,d';
console.log('split:', str.split(',', 2)); // [ 'a', 'b' ]
console.log('concat:', str.concat(',', 'z')); // a,b,c,d,z

console.log('replace:');
let str5 = 'abc,123,ABC';
let str5r = str5.replace(/abc/gi, 'qaq'); // g: replace all  i: ignore case sensitive
console.log('str5:', str5, 'str5r:', str5r); // str5: abc,123,ABC str5r: qaq,123,qaq

let str6 = 'abc,123,ABC';
console.log('includes:', str6.includes('abc', 1)); // false

console.log('search:');
let str2 = 'ab98cd';
// search: if find return index else -1
console.log('index:', str2.search(/\d/)); // index: 2

console.log('match:');
// not use global search: 回傳第一個匹配的字串
console.log(str2.match(/\d/)); // [ '9', index: 2, input: 'ab98cd', groups: undefined ]
// use global search: 回傳所有匹配的字串
console.log(str2.match(/\d/g)); // [ '9', '8' ]

console.log('Regex.test not use global search:');
// Regex.test、Regex.exec not use global search:
let str3 = 'abcdef';
const reg3 = /c/;
console.log(reg3.test(str3)); // true
console.log(reg3.lastIndex); // 0
console.log(reg3.test(str3)); // true
console.log(reg3.lastIndex); // 0

console.log('Regex.test use global search:');
// Regex.test、Regex.exec use global search:
// 會從 lastIndex 開始匹配，所以 test、exec 不使用 global search 較好
let str4 = 'abcdef';
let str4b = 'cabdef';
const reg4 = /c/g;
console.log(reg4.test(str4)); // true
console.log(reg4.lastIndex); // 3, lastIndex 移至匹配字串下一索引
console.log(reg4.test(str4)); // false
console.log(reg4.lastIndex); // 0, 都找不到時 lastIndex 移至 0
console.log(reg4.test(str4)); // true
console.log(reg4.lastIndex); // 3
console.log(reg4.test(str4b)); // false, 換另一字串仍是從 lastIndex 開始匹配
console.log(reg4.lastIndex); // 0
