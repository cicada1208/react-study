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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaV9xdWVyeS5qcyJdLCJuYW1lcyI6WyJ1cmwiLCJwcmludERhdGEiLCJkYXRhIiwiJCIsInJlbW92ZSIsImRhdGFPYmoiLCJyZXN1bHRzIiwiZm9yRWFjaCIsImVsIiwiYXJ0aXN0TmFtZSIsImNvbGxlY3Rpb25OYW1lIiwiY29sbGVjdGlvblZpZXdVcmwiLCJhcnR3b3JrVXJsMTAwIiwiYXBwZW5kIiwiZ2V0QWxidW0iLCJheGlvcyIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwiaGVhZGVycyIsImNvbmZpZyIsInJlcXVlc3QiLCJlcnJvciIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNQSxHQUFHLEdBQUcscURBQVo7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDckJDLEdBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CQyxNQUFwQjtBQUNBLE1BQUlDLE9BQU8sR0FBR0gsSUFBZCxDQUZxQixDQUVGOztBQUNuQkcsU0FBTyxDQUFDQyxPQUFSLENBQWdCQyxPQUFoQixDQUF3QixVQUFBQyxFQUFFLEVBQUk7QUFBQSxRQUNsQkMsVUFEa0IsR0FDK0NELEVBRC9DLENBQ2xCQyxVQURrQjtBQUFBLFFBQ05DLGNBRE0sR0FDK0NGLEVBRC9DLENBQ05FLGNBRE07QUFBQSxRQUNVQyxpQkFEVixHQUMrQ0gsRUFEL0MsQ0FDVUcsaUJBRFY7QUFBQSxRQUM2QkMsYUFEN0IsR0FDK0NKLEVBRC9DLENBQzZCSSxhQUQ3QjtBQUUxQlQsS0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVVSxNQUFWLHlHQUdvQkQsYUFIcEIsdUNBRzRERCxpQkFINUQsOEZBTWFGLFVBTmIsc0NBT2FDLGNBUGI7QUFXSCxHQWJEO0FBY0g7O0FBRUQsU0FBU0ksUUFBVCxHQUFvQjtBQUNoQjtBQUNBQyxPQUFLLENBQUM7QUFDRmYsT0FBRyxFQUFFQSxHQURIO0FBRUZnQixVQUFNLEVBQUU7QUFGTixHQUFELENBQUwsQ0FHR0MsSUFISCxDQUdRLFVBQUFDLFFBQVEsRUFBSTtBQUNoQjtBQUNBakIsYUFBUyxDQUFDaUIsUUFBUSxDQUFDaEIsSUFBVixDQUFULENBRmdCLENBR2hCOztBQUNBaUIsV0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVEsQ0FBQ0csTUFBckIsRUFKZ0IsQ0FLaEI7O0FBQ0FGLFdBQU8sQ0FBQ0MsR0FBUixDQUFZRixRQUFRLENBQUNJLFVBQXJCLEVBTmdCLENBT2hCO0FBQ0E7QUFDQTs7QUFDQUgsV0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVEsQ0FBQ0ssT0FBckIsRUFWZ0IsQ0FXaEI7O0FBQ0FKLFdBQU8sQ0FBQ0MsR0FBUixDQUFZRixRQUFRLENBQUNNLE1BQXJCLEVBWmdCLENBYWhCO0FBQ0E7QUFDQTs7QUFDQUwsV0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVEsQ0FBQ08sT0FBckI7QUFDSCxHQXBCRCxXQW9CUyxVQUFBQyxLQUFLLEVBQUk7QUFDZCxRQUFJQSxLQUFLLENBQUNSLFFBQVYsRUFBb0I7QUFDaEI7QUFDQTtBQUNBQyxhQUFPLENBQUNPLEtBQVIsQ0FBY0EsS0FBSyxDQUFDUixRQUFOLENBQWVHLE1BQTdCO0FBQ0FGLGFBQU8sQ0FBQ08sS0FBUixDQUFjQSxLQUFLLENBQUNSLFFBQU4sQ0FBZUksVUFBN0I7QUFDQUgsYUFBTyxDQUFDTyxLQUFSLENBQWNBLEtBQUssQ0FBQ1IsUUFBTixDQUFlaEIsSUFBN0I7QUFDQWlCLGFBQU8sQ0FBQ08sS0FBUixDQUFjQSxLQUFLLENBQUNSLFFBQU4sQ0FBZUssT0FBN0I7QUFDSCxLQVBELE1BT08sSUFBSUcsS0FBSyxDQUFDRCxPQUFWLEVBQW1CO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBTixhQUFPLENBQUNPLEtBQVIsQ0FBY0EsS0FBSyxDQUFDRCxPQUFwQjtBQUNIOztBQUNETixXQUFPLENBQUNPLEtBQVIsQ0FBYyxRQUFkLEVBQXdCQSxLQUFLLENBQUNDLE9BQTlCO0FBQ0FSLFdBQU8sQ0FBQ08sS0FBUixDQUFjQSxLQUFLLENBQUNGLE1BQXBCO0FBQ0gsR0FwQ0QsRUFGZ0IsQ0F3Q2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRHJCLENBQUMsQ0FBQyxZQUFNO0FBQ0pXLFVBQVE7QUFDWCxDQUZBLENBQUQsQyIsImZpbGUiOiJhcGlfcXVlcnkuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvYXBpX3F1ZXJ5LmpzXCIpO1xuIiwiY29uc3QgdXJsID0gJ2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9zZWFyY2g/dGVybT10d2ljZSZsaW1pdD0xMCdcclxuXHJcbmZ1bmN0aW9uIHByaW50RGF0YShkYXRhKSB7XHJcbiAgICAkKCcuZGl2X2FwaV9xdWVyeScpLnJlbW92ZSgpXHJcbiAgICBsZXQgZGF0YU9iaiA9IGRhdGEgLy8gJC5hamF4IC0+IEpTT04ucGFyc2UoZGF0YSkgLy8gYXhpb3Mgb3IgZmV0Y2ggLT4gZGF0YVxyXG4gICAgZGF0YU9iai5yZXN1bHRzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgYXJ0aXN0TmFtZSwgY29sbGVjdGlvbk5hbWUsIGNvbGxlY3Rpb25WaWV3VXJsLCBhcnR3b3JrVXJsMTAwIH0gPSBlbFxyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke2FydHdvcmtVcmwxMDB9XCIgb25jbGljaz1cIndpbmRvdy5vcGVuKCcke2NvbGxlY3Rpb25WaWV3VXJsfScpXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj5cclxuICAgICAgICAgICAgICAgIDxwPiR7YXJ0aXN0TmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICA8cD4ke2NvbGxlY3Rpb25OYW1lfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYClcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFsYnVtKCkge1xyXG4gICAgLy8gbWV0aG9kIDM6XHJcbiAgICBheGlvcyh7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0J1xyXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgLy8gYGRhdGFgIGlzIHRoZSByZXNwb25zZSB0aGF0IHdhcyBwcm92aWRlZCBieSB0aGUgc2VydmVyXHJcbiAgICAgICAgcHJpbnREYXRhKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIC8vIGBzdGF0dXNgIGlzIHRoZSBIVFRQIHN0YXR1cyBjb2RlIGZyb20gdGhlIHNlcnZlciByZXNwb25zZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICAgICAgLy8gYHN0YXR1c1RleHRgIGlzIHRoZSBIVFRQIHN0YXR1cyBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciByZXNwb25zZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIC8vIGBoZWFkZXJzYCB0aGUgSFRUUCBoZWFkZXJzIHRoYXQgdGhlIHNlcnZlciByZXNwb25kZWQgd2l0aFxyXG4gICAgICAgIC8vIEFsbCBoZWFkZXIgbmFtZXMgYXJlIGxvd2VyIGNhc2VkIGFuZCBjYW4gYmUgYWNjZXNzZWQgdXNpbmcgdGhlIGJyYWNrZXQgbm90YXRpb24uXHJcbiAgICAgICAgLy8gRXhhbXBsZTogYHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddYFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmhlYWRlcnMpO1xyXG4gICAgICAgIC8vIGBjb25maWdgIGlzIHRoZSBjb25maWcgdGhhdCB3YXMgcHJvdmlkZWQgdG8gYGF4aW9zYCBmb3IgdGhlIHJlcXVlc3RcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5jb25maWcpO1xyXG4gICAgICAgIC8vIGByZXF1ZXN0YCBpcyB0aGUgcmVxdWVzdCB0aGF0IGdlbmVyYXRlZCB0aGlzIHJlc3BvbnNlXHJcbiAgICAgICAgLy8gSXQgaXMgdGhlIGxhc3QgQ2xpZW50UmVxdWVzdCBpbnN0YW5jZSBpbiBub2RlLmpzIChpbiByZWRpcmVjdHMpXHJcbiAgICAgICAgLy8gYW5kIGFuIFhNTEh0dHBSZXF1ZXN0IGluc3RhbmNlIGluIHRoZSBicm93c2VyXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVxdWVzdCk7XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSByZXF1ZXN0IHdhcyBtYWRlIGFuZCB0aGUgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGEgc3RhdHVzIGNvZGVcclxuICAgICAgICAgICAgLy8gdGhhdCBmYWxscyBvdXQgb2YgdGhlIHJhbmdlIG9mIDJ4eFxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLnJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IucmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IucmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IucmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSByZXF1ZXN0IHdhcyBtYWRlIGJ1dCBubyByZXNwb25zZSB3YXMgcmVjZWl2ZWRcclxuICAgICAgICAgICAgLy8gYGVycm9yLnJlcXVlc3RgIGlzIGFuIGluc3RhbmNlIG9mIFhNTEh0dHBSZXF1ZXN0IGluIHRoZSBicm93c2VyIFxyXG4gICAgICAgICAgICAvLyBhbmQgYW4gaW5zdGFuY2Ugb2YgaHR0cC5DbGllbnRSZXF1ZXN0IGluIG5vZGUuanNcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5yZXF1ZXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5jb25maWcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLy8gbWV0aG9kIDI6XHJcbiAgICAvLyBmZXRjaCh1cmwsIHtcclxuICAgIC8vICAgICBtZXRob2Q6ICdnZXQnXHJcbiAgICAvLyB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAvLyAgICAgLy8gZmV0Y2gg5ZKMIGpRdWVyeS5hamF4KCkg55qE5beu55Ww77yaXHJcbiAgICAvLyAgICAgLy8gZmV0Y2goKSDlm57lgrPnmoQgcHJvbWlzZSDnianku7YsIOeVtumBh+WIsCBIVFRQIFN0YXR1cyA0MDQsIDUwMCDmmYJcclxuICAgIC8vICAgICAvLyDku43mnIPkvb/nlKggcmVzb2x2ZSDkvYYgcmVzLm9rIOeCuiBmYWxzZe+8jFxyXG4gICAgLy8gICAgIC8vIHJlamVjdCDlj6rlnKjntrLot6/nmbznlJ/pjK/oqqTmiJbku7vkvZXkuK3mlrfoq4vmsYLmmYLmiY3kvb/nlKjjgIJcclxuICAgIC8vICAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIHJlc3BvbnNlIHdhcyBub3Qgb2suJyk7XHJcbiAgICAvLyAgICAgLy8g5Y+v6YCP6YGOIGJsb2IoKSwganNvbigpLCB0ZXh0KCkg5Y+W5b6X6LOH5paZXHJcbiAgICAvLyAgICAgLy8g6Iul5Ye654++6Yyv6Kqk77yaXCJGYWlsZWQgdG8gZXhlY3V0ZSAnanNvbicgb24gJ1Jlc3BvbnNlJzogYm9keSBzdHJlYW0gaXMgbG9ja2VkXCJcclxuICAgIC8vICAgICAvLyDljp/lm6DngrogUmVzcG9uc2UgbWV0aG9kZSBsaWtlICdqc29uJywgJ3RleHQnIGNhbiBiZSBjYWxsZWQgb25jZSwgYW5kIHRoZW4gaXQgbG9ja3MuXHJcbiAgICAvLyAgICAgLy8g5Y+v5L2/55So5LiL5YiX5pa55rOV5bCHIGpzb24g5pqr5a2YXHJcbiAgICAvLyAgICAgbGV0IGpzb24gPSByZXMuanNvbigpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGpzb24pO1xyXG4gICAgLy8gICAgIHJldHVybiBqc29uO1xyXG4gICAgLy8gfSkudGhlbihqc29uID0+XHJcbiAgICAvLyAgICAgcHJpbnREYXRhKGpzb24pXHJcbiAgICAvLyApLmNhdGNoKGVyciA9PlxyXG4gICAgLy8gICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG4gICAgLy8gKTtcclxuXHJcbiAgICAvLyAvLyBtZXRob2QgMTpcclxuICAgIC8vIHZhciByZXF1ZXN0ID0gJC5hamF4KHtcclxuICAgIC8vICAgdXJsLFxyXG4gICAgLy8gICBtZXRob2Q6ICdnZXQnXHJcbiAgICAvLyB9KTtcclxuICAgIC8vIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpIHtcclxuICAgIC8vICAgcHJpbnREYXRhKGRhdGEpXHJcbiAgICAvLyB9KTtcclxuICAgIC8vIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAvLyAgIGFsZXJ0KHRleHRTdGF0dXMpXHJcbiAgICAvLyB9KTtcclxuICAgIC8vIHJlcXVlc3QuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgLy8gYWxlcnQoXCJjb21wbGV0ZVwiKVxyXG4gICAgLy8gfSk7XHJcbn1cclxuXHJcbiQoKCkgPT4ge1xyXG4gICAgZ2V0QWxidW0oKTtcclxufSlcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==