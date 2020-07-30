// // commomJS:
// function calculate(n) {
//     return n + 100
// }

// module.exports = {
//     cal: calculate,
//     name: 'hello'
// } // 把這個物件 export 出去


// ES6:
function calculate(n) {
    return n + 100
}

export default {
    cal: calculate,
    name: 'hello2'
}