// Converting Variables to Numbers:
let exp = '';
let base = 2;
console.log(Number(exp)); // 0
console.log(parseInt(exp)); // NaN

// 以base為基底轉為10進位
console.log(parseInt(exp, base)); // NaN

// no base parameter
console.log(parseFloat(exp)); // NaN
