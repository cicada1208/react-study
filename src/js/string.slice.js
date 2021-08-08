// The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.
// slice(beginIndex, endIndex)
// beginIndex: zero-based index,
// If negative, it is treated as str.length + beginIndex.
// If beginIndex is greater than or equal to str.length, an empty string is returned.
// endIndex: optional, zero-based index,
// The character at this index will not be included.
// If endIndex is negative, slice() is treated as str.length + endIndex.
// If endIndex is greater than str.length, slice() also extracts to the end of the string.
// 若 endIndex 位置在 startIndex 之前，return ""

const str = '123456';
console.log(str.slice(0, 2)); // 12
console.log(str.slice(-2)); // 56
console.log(str.slice(-7)); // 123456
console.log(str.slice(6)); // ""
console.log(str.slice(1, 10)); // 23456
console.log(str.slice(1, -2)); // 234
console.log(str.slice(1, -10)); // ""
console.log(str.slice(3, 2)); // ""
