// Array.filter(Boolean): 移除所有 false 類型元素 (null, undefined, NaN, 0, false, '')
// Array.filter(Boolean) 相等於 Array.filter(function(elt) { return Boolean(elt); })

var arySrc = [1, 2, 'b', {}, null, undefined, NaN, 0, false, ''];
var aryFilter = arySrc.filter(Boolean);
console.log('aryFilter =', aryFilter); // aryFilter = [ 1, 2, 'b', {} ]

// Boolean 是一個函式，根據元素的真假類型，返回 true 或 false
console.log('Boolean(0) = ', Boolean(0)); // false
console.log('Boolean("") = ', Boolean('')); // false
console.log('Boolean(1) = ', Boolean(1)); // true
console.log('Boolean("false") = ', Boolean('false')); // true
console.log('Boolean(true) = ', Boolean(true)); // true
