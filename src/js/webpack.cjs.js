// webpack bundle CommomJS:

// CommomJS module:
// 每個文件就是一個 module，有自己的作用域，不會污染全局作用域。
// 在一個文件裡定義的變量、函數、類，都是私有的，其他文件不可見。
// 模塊加載順序，按照其在代碼中出現的順序。

// require: 讀入並執行 JavaScript，然後返回 module.exports。
const utils = require('./webpack.cjs.utils')

// module 可多次 require，但只在第一次加載運行，然後運行結果就被緩存，
// 再次 require，就直接讀取緩存結果。要讓 module 再次加載運行，必須清除緩存。
require('./webpack.cjs.utils').x = '10'
console.log('x:', require('./webpack.cjs.utils').x) // x: 10
// 清除所有 module 緩存
Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key];
})
// 清除 module 緩存後重新加載
console.log('x:', require('./webpack.cjs.utils').x) // x: 5


// 直接執行( node module.js ): require.main 指向 module 本身。
console.log('in webpack.cjs:', 'require.main is module', require.main === module) // true
// module.parent is null
console.log('in webpack.cjs:', 'require.main is module.parent', require.main === module.parent) // false


console.log('counter:', utils.counter); // counter: 1
console.log('counter:', utils.prt()); // counter:  print counter and then ++:1
console.log('counter:', utils.counter); // counter: 1, require 後 counter 已被緩存, module 內 counter++ 的變化無法取得


// const divWebpackCjs = document.createElement('div');
// divWebpackCjs.id = 'divWebpackCjs';
// divWebpackCjs.innerText = utils.name + utils.prt();
// document.body.appendChild(divWebpackCjs);
