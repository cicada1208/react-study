// Regex:
// g: global search
// i: ignore case sensitive
// m: multiline matches
// ?: Finds zero or one occurrence of the regular expression
// *: Finds zero or more occurrences of the regular expression
// +: Finds one or more occurrences of the regular expression
// {x}: Finds the exact (x) number of the regular expression grouped together
// {x,}: Finds the exact (x) or more number of the regular expression grouped together
// {x,y}: Finds between x and y number of the regular expression grouped together

let str = 'a,b,c,d';
console.log('split:', str.split(',', 2)); // [ 'a', 'b' ]
console.log('concat:', str.concat(',', 'z')); // a,b,c,d,z

// replace:
let str5 = 'abc,123,ABC';
let str5r = str5.replace(/abc/gi, 'qaq');
console.log('replace:', 'str5 =', str5, 'str5r =', str5r); // str5 = abc,123,ABC str5r = qaq,123,qaq

let str6 = 'abc,123,ABC';
console.log('includes:', str6.includes('abc', 1)); // false

// search: if find return index else -1
let str2 = 'ab98cd';
console.log('search:', 'index =', str2.search(/\d/)); // index = 2

// match:
console.log('match not use global search:'); // return first match
console.log(str2.match(/\d/)); // [ '9', index: 2, input: 'ab98cd', groups: undefined ]
console.log('match use global search:'); // return all match
console.log(str2.match(/\d/g)); // [ '9', '8' ]
for (let m of str2.matchAll(/\d/g)) console.log(m);
// [ '9', index: 2, input: 'ab98cd', groups: undefined ]
// [ '8', index: 3, input: 'ab98cd', groups: undefined ]

const imageDescription = 'This image has a resolution of 1440×900 pixels.';
const regexpSize = /([0-9]+)×([0-9]+)/;
const matchSize = imageDescription.match(regexpSize);
console.log(matchSize);
// [
//   '1440×900', // 整個匹配
//   '1440', // 匹配第1個()
//   '900', // 匹配第2個()
//   index: 31,
//   input: 'This image has a resolution of 1440×900 pixels.',
//   groups: undefined
// ]
console.log(`Width: ${matchSize[1]} / Height: ${matchSize[2]}.`); // Width: 1440 / Height: 900.

// Regex.test: return false if not found, and true if found
console.log('Regex.test not use global search:');
let str3 = 'abcdef';
const reg3 = /c/;
console.log(reg3.test(str3)); // true
console.log(reg3.lastIndex); // 0
console.log(reg3.test(str3)); // true
console.log(reg3.lastIndex); // 0

console.log('Regex.test use global search:');
// 會從 lastIndex 開始匹配，所以 test 在此案不使用 global search 較適合
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

// Regex.exec: return the matched text if a match is found, and null if not
console.log('Regex.exec not use global search:');
let str7 = 'abc123xyz987';
const reg7ng = /\d/;
console.log(reg7ng.exec(str7)); // [ '1', index: 3, input: 'abc123xyz987', groups: undefined ]
console.log(reg7ng.exec(str7)); // [ '1', index: 3, input: 'abc123xyz987', groups: undefined ]

console.log('Regex.exec use global search:');
const reg7g = /\d/g;
console.log(reg7g.exec(str7)); // [ '1', index: 3, input: 'abc123xyz987', groups: undefined ]
console.log(reg7g.lastIndex); // 4
console.log(reg7g.exec(str7)); // [ '2', index: 4, input: 'abc123xyz987', groups: undefined ]
console.log(reg7g.lastIndex); // 5

// Word boundary: Get a match at the beginning or end of a word in the string
// new RegExp(/\bregexp/) or /regexp\b/
const strWB = 'The Caterpillar and Alice looked at each other';
const regexpWithoutE = /\b[a-df-z]+\b/gi;
console.log('Word boundary:', strWB.match(regexpWithoutE)); // [ 'and', 'at' ]

// Non-word boundary: Get a match when it is not at the beginning or end of a word in the string
// new RegExp(/\Bregexp/) or /\Bregexp/
