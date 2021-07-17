// ES6 module:

// export 用法:
// 1. export name:
// 對應 import { name } from 'module'
// export 與 import name 需相同
// 但可重命名 import { name as na } from 'module'
// module 中可以有多個 named exports
// 也可不一一指定 import * as module from 'module'; 再以此叫用 module.name

// 2. export default name:
// 對應 import defaultExportName from 'module'
// export 與 import name 不需相同
// module 中只能有一個 default export
// export default 後面不能接 var, let , const

console.log('webpack.es6.utils run.');

function prnt() {
  return 'print';
}

// utils_x(not object) 即使宣告為 let，仍只能在此 es6.utils.js 修改值；
// es6.js import { utils_x }，不能在 es6.js 修改 utils_x 值，
// 會報錯 utils_x is not defined。
export let utils_x = 'x';

export let utils_a = { text: 'a', id: 1 };

export function utils_y() {
  return 'y';
}

const utils_z = 'z';
export { utils_z };

// const num = 123;
// export default num; 等價於 export { num as default };

// 較為推薦最後再一起 export
// export { name1 as default, utils_x, utils_y, utils_z }

// export default expression
export default {
  name: 'webpack.es6',
  prt: prnt,
};
// or export default function() {}
// or export default class {}
