// commomJS module:
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
