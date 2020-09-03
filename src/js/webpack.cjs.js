// webpack bundle commomJS:

// commomJS module:
// * 每個文件就是一個 module，有自己的作用域，不會污染全局作用域。
//   在一個文件裡定義的變量、函數、類，都是私有的，其他文件不可見。
// * module 可多次加載，但只在第一次加載時運行一次，然後運行結果就被緩存，
//   以後再加載，就直接讀取緩存結果。要讓模塊再次運行，必須清除緩存。
// * 模塊加載順序，按照其在代碼中出現的順序。

const test = require('test.js');

// require: 讀入並執行 JavaScript，然後返回 module.exports。
const utils = require('./webpack.cjs.utils');
const divWebpackCjs = document.createElement('div');
divWebpackCjs.id = 'divWebpackCjs';
divWebpackCjs.innerText = utils.name + utils.prt();
document.body.appendChild(divWebpackCjs);
