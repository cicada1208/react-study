(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["webpack.es6.utils"],{

/***/ "Zx/R":
/*!*************************************!*\
  !*** ./src/js/webpack.es6.utils.js ***!
  \*************************************/
/*! exports provided: utils_x, utils_y, utils_z, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils_x", function() { return utils_x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils_y", function() { return utils_y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils_z", function() { return utils_z; });
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
// export default 後面不能接 var, let , const
console.log('webpack.es6.utils run.');

function prnt() {
  return 'print';
}

var utils_x = 'x';
function utils_y() {
  return 'y';
}
var utils_z = 'z';
 // export { name1 as default, … }
// export default expression

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'webpack.es6',
  prt: prnt
});

/***/ })

}]);
//# sourceMappingURL=webpack.es6.utils.js.map