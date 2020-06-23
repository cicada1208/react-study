function calculate(n) {
    return ((n * 100 + 20 - 4)) % 10 + 3  // 計算價格公式
}

module.exports = {
    cal: calculate,
    name: 'hello'
} // 把這個物件 export 出去