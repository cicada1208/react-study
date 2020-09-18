// CommomJS module:

console.log('webpack.cjs.utils run.')
// 調用執行( require('module') ): 若該 module 透過 require 執行，require.main 指向 module.parent。
console.log('in webpack.cjs.utils:', 'require.main is module', require.main === module) // false
console.log('in webpack.cjs.utils:', 'require.main is module.parent', require.main === module.parent) // true

var counter = 1;
function prnt() {
    return ' print counter and then ++:' + counter++;
}

module.exports = {
    name: 'webpack.cjs',
    counter: counter,
    prt: prnt
}

var x = 5
var addX = function (value) {
    return value + x
}

module.exports.x = x
module.exports.addX = addX
