let exp = '';
// converting variables to numbers
console.log(Number(exp)); // 0
console.log(parseInt(exp)); // NaN
// 轉為10進位
console.log(parseInt(11, 10)); // 11
// 轉為2進位
console.log(parseInt(11, 2)); // 3
// no base parameter
console.log(parseFloat(exp)); // NaN

let num = 1.045;
// 四捨五入
function Round(num, fraction = 0) {
  var aid = Math.pow(10, fraction);
  return Math.round(num * aid) / aid;
}
console.log(Round(num, 2)); // 1.05

// 銀行家舍入法：四捨六入五取偶(又稱四捨六入五留雙)
// 規則：四捨六入五考慮，五後非零就進一，五後為零看奇偶，五前為偶應捨去，五前為奇要進一。
console.log(num.toFixed(2)); // 1.04
console.log(num.toPrecision(3)); // 1.04

num = 0.001658853;
// formats a number to a specified length
console.log(num.toPrecision()); // 0.001658853
console.log(num.toPrecision(2)); // 0.0017
console.log(num.toPrecision(3)); // 0.00166
console.log(num.toPrecision(10)); // 0.001658853000
console.log((1234).toPrecision(2)); // 1.2e+3

// 運算式計算函數
let expp = '(1 + 2) * 3';
console.log(eval(expp)); // 9, type is number
