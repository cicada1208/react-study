// ES6 module:

// export 用法:
// 1. export name:
// 對應 import { name } from 'module'
// exprot 與 import name 需相同
// module 中可以有多個 named exports

// 2. export default name:
// 對應 import defaultExportName from 'module'
// export 與 import name 不需相同
// module 中只能有一個 default export

console.log('webpack.es6.utils run.')

function prnt() {
    return 'print'
}

export const utils_x = 'x'
export function utils_y() { return 'y' }
const utils_z = 'z'
export { utils_z }

export default {
    name: 'webpack.es6',
    prt: prnt
}
