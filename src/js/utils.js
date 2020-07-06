// // commomJS:
// function calculate(n) {
//     return ((n * 100 + 20 - 4)) % 10 + 3  // 計算價格公式
// }

// module.exports = {
//     cal: calculate,
//     name: 'hello'
// } // 把這個物件 export 出去

// ES6:
function calculate(n) {
    return ((n * 100 + 20 - 4)) % 10 + 3  // 計算價格公式
}

export default {
    cal: calculate,
    name: 'hello2'
}