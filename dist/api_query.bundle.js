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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/api_query.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/api_query.js":
/*!*****************************!*\
  !*** ./src/js/api_query.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var url = 'https://itunes.apple.com/search?term=twice&limit=10';

function printData(data) {
  $('.div_api_query').remove();
  var dataObj = data; // $.ajax -> JSON.parse(data) // axios or fetch -> data

  dataObj.results.forEach(function (el) {
    var artistName = el.artistName,
        collectionName = el.collectionName,
        collectionViewUrl = el.collectionViewUrl,
        artworkUrl100 = el.artworkUrl100;
    $('body').append("\n        <div class=\"card\">\n            <div class=\"image\">\n                <img src=\"".concat(artworkUrl100, "\" onclick=\"window.open('").concat(collectionViewUrl, "')\"/>\n            </div>\n            <div class=\"info\">\n                <p>").concat(artistName, "</p>\n                <p>").concat(collectionName, "</p>\n            </div>\n        </div>\n        "));
  });
}

function getAlbum() {
  // method 3:
  axios({
    url: url,
    method: 'get'
  }).then(function (response) {
    // `data` is the response that was provided by the server
    printData(response.data); // `status` is the HTTP status code from the server response

    console.log(response.status); // `statusText` is the HTTP status message from the server response

    console.log(response.statusText); // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`

    console.log(response.headers); // `config` is the config that was provided to `axios` for the request

    console.log(response.config); // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser

    console.log(response.request);
  })["catch"](function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.status);
      console.error(error.response.statusText);
      console.error(error.response.data);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser 
      // and an instance of http.ClientRequest in node.js
      console.error(error.request);
    }

    console.error('Error:', error.message);
    console.error(error.config);
  }); // // method 2:
  // fetch(url, {
  //     method: 'get'
  // }).then(res => {
  //     // fetch 和 jQuery.ajax() 的差異：
  //     // fetch() 回傳的 promise 物件, 當遇到 HTTP Status 404, 500 時
  //     // 仍會使用 resolve 但 res.ok 為 false，
  //     // reject 只在網路發生錯誤或任何中斷請求時才使用。
  //     if (!res.ok) throw new Error('Network response was not ok.');
  //     // 可透過 blob(), json(), text() 取得資料
  //     // 若出現錯誤："Failed to execute 'json' on 'Response': body stream is locked"
  //     // 原因為 Response methode like 'json', 'text' can be called once, and then it locks.
  //     // 可使用下列方法將 json 暫存
  //     let json = res.json();
  //     console.log(json);
  //     return json;
  // }).then(json =>
  //     printData(json)
  // ).catch(err =>
  //     console.error(err)
  // );
  // // method 1:
  // var request = $.ajax({
  //   url,
  //   method: 'get'
  // });
  // request.done(function (data, textStatus, jqXHR) {
  //   printData(data)
  // });
  // request.fail(function (jqXHR, textStatus, errorThrown) {
  //   alert(textStatus)
  // });
  // request.always(function () {
  //   // alert("complete")
  // });
}

$(function () {
  getAlbum();
});

/***/ })

/******/ });
//# sourceMappingURL=api_query.bundle.js.map