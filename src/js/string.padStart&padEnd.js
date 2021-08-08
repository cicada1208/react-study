const fullNumber = '123456';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
console.log('last4Digits:', last4Digits); // 3456
console.log('maskedNumber:', maskedNumber); // **3456

const str = 'abc';
console.log(str.padStart(4)); // " abc"
console.log(str.padStart(1)); // abc
console.log(str.padStart(4, '0')); // 0abc
console.log(str.padStart(10, '123')); // 1231231abc
console.log(str.padStart(6, '123465')); // 123abc
console.log(str.padEnd(5, '.')); // abc..
console.log(str.padEnd(6, '123465')); // abc123
