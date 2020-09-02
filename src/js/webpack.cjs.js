// webpack bundle commomJS:

// commomJS module:
// 每個文件就是一個 module，有自己的作用域。
// 在一個文件裡定義的變量、函數、類，都是私有的，其他文件不可見。

const utils = require('./webpack.cjs.utils');
const divWebpackCjs = document.createElement('div');
divWebpackCjs.id = 'divWebpackCjs';
divWebpackCjs.innerText = utils.name + utils.prt();
document.body.appendChild(divWebpackCjs);
