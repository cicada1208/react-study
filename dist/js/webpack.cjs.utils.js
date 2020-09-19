(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["webpack.cjs.utils"],{

/***/ "AzgI":
/*!*************************************!*\
  !*** ./src/js/webpack.cjs.utils.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {// CommomJS module:
console.log('webpack.cjs.utils run.'); // 調用執行( require('module') ): 若該 module 透過 require 執行，require.main 指向 module.parent。

console.log('in webpack.cjs.utils:', 'require.main is module', __webpack_require__.c[__webpack_require__.s] === module); // false

console.log('in webpack.cjs.utils:', 'require.main is module.parent', __webpack_require__.c[__webpack_require__.s] === module.parent); // true

var counter = 1;

function prnt() {
  return ' print counter and then ++:' + counter++;
}

module.exports = {
  name: 'webpack.cjs',
  counter: counter,
  prt: prnt
};
var x = 5;

var addX = function addX(value) {
  return value + x;
};

module.exports.x = x;
module.exports.addX = addX;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "YuTi":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

}]);
//# sourceMappingURL=webpack.cjs.utils.js.map