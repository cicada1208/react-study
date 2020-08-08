// webpack bundle commomJS:

// commomJS module:
const utils = require('./webpack.cjs.utils');
const divWebpackCjs = document.createElement('div');
divWebpackCjs.id = 'divWebpackCjs';
divWebpackCjs.innerText = utils.name + utils.prt();
document.body.appendChild(divWebpackCjs);
