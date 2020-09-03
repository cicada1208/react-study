// commomJS module:

// 調用執行( require('module') ): 若該 module 透過 require 執行，require.main 指向 parent。
console.log('require.main is module', require.main === module) // false
console.log('require.main is module.parent', require.main === module.parent) // true

function prnt() {
    return ' print'
}

module.exports = {
    name: 'webpack.cjs',
    prt: prnt
}

var x = 5
var addX = function (value) {
    return value + x
}

module.exports.x = x
module.exports.addX = addX
