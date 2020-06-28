/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./utils.js\");\n/* harmony import */ var _node_modules_pad_left_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/pad-left/index.js */ \"./node_modules/pad-left/index.js\");\n/* harmony import */ var _node_modules_pad_left_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pad_left_index_js__WEBPACK_IMPORTED_MODULE_1__);\n// // commomJS:\n// var utils = require('./utils')\n// console.log(utils.cal(30)) // 9\n// console.log(utils.name) // hello\n\n// ES6:\n\n\nconsole.log(_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cal(30))\nconsole.log(_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].name)\nconsole.log(_node_modules_pad_left_index_js__WEBPACK_IMPORTED_MODULE_1___default()('4', 4, 0))\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./node_modules/pad-left/index.js":
/*!****************************************!*\
  !*** ./node_modules/pad-left/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * pad-left <https://github.com/jonschlinkert/pad-left>\n *\n * Copyright (c) 2014-2015, Jon Schlinkert.\n * Licensed under the MIT license.\n */\n\n\n\nvar repeat = __webpack_require__(/*! repeat-string */ \"./node_modules/repeat-string/index.js\");\n\nmodule.exports = function padLeft(str, num, ch) {\n  str = str.toString();\n\n  if (typeof num === 'undefined') {\n    return str;\n  }\n\n  if (ch === 0) {\n    ch = '0';\n  } else if (ch) {\n    ch = ch.toString();\n  } else {\n    ch = ' ';\n  }\n\n  return repeat(ch, num - str.length) + str;\n};\n\n\n//# sourceURL=webpack:///./node_modules/pad-left/index.js?");

/***/ }),

/***/ "./node_modules/repeat-string/index.js":
/*!*********************************************!*\
  !*** ./node_modules/repeat-string/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * repeat-string <https://github.com/jonschlinkert/repeat-string>\n *\n * Copyright (c) 2014-2015, Jon Schlinkert.\n * Licensed under the MIT License.\n */\n\n\n\n/**\n * Results cache\n */\n\nvar res = '';\nvar cache;\n\n/**\n * Expose `repeat`\n */\n\nmodule.exports = repeat;\n\n/**\n * Repeat the given `string` the specified `number`\n * of times.\n *\n * **Example:**\n *\n * ```js\n * var repeat = require('repeat-string');\n * repeat('A', 5);\n * //=> AAAAA\n * ```\n *\n * @param {String} `string` The string to repeat\n * @param {Number} `number` The number of times to repeat the string\n * @return {String} Repeated string\n * @api public\n */\n\nfunction repeat(str, num) {\n  if (typeof str !== 'string') {\n    throw new TypeError('expected a string');\n  }\n\n  // cover common, quick use cases\n  if (num === 1) return str;\n  if (num === 2) return str + str;\n\n  var max = str.length * num;\n  if (cache !== str || typeof cache === 'undefined') {\n    cache = str;\n    res = '';\n  } else if (res.length >= max) {\n    return res.substr(0, max);\n  }\n\n  while (max > res.length && num > 1) {\n    if (num & 1) {\n      res += str;\n    }\n\n    num >>= 1;\n    str += str;\n  }\n\n  res += str;\n  res = res.substr(0, max);\n  return res;\n}\n\n\n//# sourceURL=webpack:///./node_modules/repeat-string/index.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// // commomJS:\n// function calculate(n) {\n//     return ((n * 100 + 20 - 4)) % 10 + 3  // 計算價格公式\n// }\n\n// module.exports = {\n//     cal: calculate,\n//     name: 'hello'\n// } // 把這個物件 export 出去\n\n// ES6:\nfunction calculate(n) {\n    return ((n * 100 + 20 - 4)) % 10 + 3  // 計算價格公式\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    cal: calculate,\n    name: 'hello2'\n});\n\n//# sourceURL=webpack:///./utils.js?");

/***/ })

/******/ });