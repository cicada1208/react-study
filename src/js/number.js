// Converting Variables to Numbers:
let exp = '';
let base = 2;
console.log(Number(exp)); // 0
console.log(parseInt(exp)); // NaN

// 以base為基底轉為10進位
console.log(parseInt(exp, base)); // NaN

// no base parameter
console.log(parseFloat(exp)); // NaN

let num = 123.115;
// 四捨五入
console.log(Math.round(123.115 * 100) / 100); // 123.12

// 銀行家舍入法：四捨六入五取偶(又稱四捨六入五留雙)
// 規則：四捨六入五考慮，五後非零就進一，五後為零看奇偶，五前為偶應捨去，五前為奇要進一。
console.log(num.toFixed(2)); // 123.11

console.log(num.toPrecision(3)); // 123
