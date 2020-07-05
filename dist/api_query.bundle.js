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
/******/ 	return __webpack_require__(__webpack_require__.s = "./api_query.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api_query.js":
/*!**********************!*\
  !*** ./api_query.js ***!
  \**********************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBpX3F1ZXJ5LmpzIl0sIm5hbWVzIjpbInVybCIsInByaW50RGF0YSIsImRhdGEiLCIkIiwicmVtb3ZlIiwiZGF0YU9iaiIsInJlc3VsdHMiLCJmb3JFYWNoIiwiZWwiLCJhcnRpc3ROYW1lIiwiY29sbGVjdGlvbk5hbWUiLCJjb2xsZWN0aW9uVmlld1VybCIsImFydHdvcmtVcmwxMDAiLCJhcHBlbmQiLCJnZXRBbGJ1bSIsImF4aW9zIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJoZWFkZXJzIiwiY29uZmlnIiwicmVxdWVzdCIsImVycm9yIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLEdBQUcsR0FBRyxxREFBWjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUNyQkMsR0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JDLE1BQXBCO0FBQ0EsTUFBSUMsT0FBTyxHQUFHSCxJQUFkLENBRnFCLENBRUY7O0FBQ25CRyxTQUFPLENBQUNDLE9BQVIsQ0FBZ0JDLE9BQWhCLENBQXdCLFVBQUFDLEVBQUUsRUFBSTtBQUFBLFFBQ2xCQyxVQURrQixHQUMrQ0QsRUFEL0MsQ0FDbEJDLFVBRGtCO0FBQUEsUUFDTkMsY0FETSxHQUMrQ0YsRUFEL0MsQ0FDTkUsY0FETTtBQUFBLFFBQ1VDLGlCQURWLEdBQytDSCxFQUQvQyxDQUNVRyxpQkFEVjtBQUFBLFFBQzZCQyxhQUQ3QixHQUMrQ0osRUFEL0MsQ0FDNkJJLGFBRDdCO0FBRTFCVCxLQUFDLENBQUMsTUFBRCxDQUFELENBQVVVLE1BQVYseUdBR29CRCxhQUhwQix1Q0FHNERELGlCQUg1RCw4RkFNYUYsVUFOYixzQ0FPYUMsY0FQYjtBQVdILEdBYkQ7QUFjSDs7QUFFRCxTQUFTSSxRQUFULEdBQW9CO0FBQ2hCO0FBQ0FDLE9BQUssQ0FBQztBQUNGZixPQUFHLEVBQUVBLEdBREg7QUFFRmdCLFVBQU0sRUFBRTtBQUZOLEdBQUQsQ0FBTCxDQUdHQyxJQUhILENBR1EsVUFBQUMsUUFBUSxFQUFJO0FBQ2hCO0FBQ0FqQixhQUFTLENBQUNpQixRQUFRLENBQUNoQixJQUFWLENBQVQsQ0FGZ0IsQ0FHaEI7O0FBQ0FpQixXQUFPLENBQUNDLEdBQVIsQ0FBWUYsUUFBUSxDQUFDRyxNQUFyQixFQUpnQixDQUtoQjs7QUFDQUYsV0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVEsQ0FBQ0ksVUFBckIsRUFOZ0IsQ0FPaEI7QUFDQTtBQUNBOztBQUNBSCxXQUFPLENBQUNDLEdBQVIsQ0FBWUYsUUFBUSxDQUFDSyxPQUFyQixFQVZnQixDQVdoQjs7QUFDQUosV0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVEsQ0FBQ00sTUFBckIsRUFaZ0IsQ0FhaEI7QUFDQTtBQUNBOztBQUNBTCxXQUFPLENBQUNDLEdBQVIsQ0FBWUYsUUFBUSxDQUFDTyxPQUFyQjtBQUNILEdBcEJELFdBb0JTLFVBQUFDLEtBQUssRUFBSTtBQUNkLFFBQUlBLEtBQUssQ0FBQ1IsUUFBVixFQUFvQjtBQUNoQjtBQUNBO0FBQ0FDLGFBQU8sQ0FBQ08sS0FBUixDQUFjQSxLQUFLLENBQUNSLFFBQU4sQ0FBZUcsTUFBN0I7QUFDQUYsYUFBTyxDQUFDTyxLQUFSLENBQWNBLEtBQUssQ0FBQ1IsUUFBTixDQUFlSSxVQUE3QjtBQUNBSCxhQUFPLENBQUNPLEtBQVIsQ0FBY0EsS0FBSyxDQUFDUixRQUFOLENBQWVoQixJQUE3QjtBQUNBaUIsYUFBTyxDQUFDTyxLQUFSLENBQWNBLEtBQUssQ0FBQ1IsUUFBTixDQUFlSyxPQUE3QjtBQUNILEtBUEQsTUFPTyxJQUFJRyxLQUFLLENBQUNELE9BQVYsRUFBbUI7QUFDdEI7QUFDQTtBQUNBO0FBQ0FOLGFBQU8sQ0FBQ08sS0FBUixDQUFjQSxLQUFLLENBQUNELE9BQXBCO0FBQ0g7O0FBQ0ROLFdBQU8sQ0FBQ08sS0FBUixDQUFjLFFBQWQsRUFBd0JBLEtBQUssQ0FBQ0MsT0FBOUI7QUFDQVIsV0FBTyxDQUFDTyxLQUFSLENBQWNBLEtBQUssQ0FBQ0YsTUFBcEI7QUFDSCxHQXBDRCxFQUZnQixDQXdDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEckIsQ0FBQyxDQUFDLFlBQU07QUFDSlcsVUFBUTtBQUNYLENBRkEsQ0FBRCxDIiwiZmlsZSI6ImFwaV9xdWVyeS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwaV9xdWVyeS5qc1wiKTtcbiIsImNvbnN0IHVybCA9ICdodHRwczovL2l0dW5lcy5hcHBsZS5jb20vc2VhcmNoP3Rlcm09dHdpY2UmbGltaXQ9MTAnXG5cbmZ1bmN0aW9uIHByaW50RGF0YShkYXRhKSB7XG4gICAgJCgnLmRpdl9hcGlfcXVlcnknKS5yZW1vdmUoKVxuICAgIGxldCBkYXRhT2JqID0gZGF0YSAvLyAkLmFqYXggLT4gSlNPTi5wYXJzZShkYXRhKSAvLyBheGlvcyBvciBmZXRjaCAtPiBkYXRhXG4gICAgZGF0YU9iai5yZXN1bHRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBjb25zdCB7IGFydGlzdE5hbWUsIGNvbGxlY3Rpb25OYW1lLCBjb2xsZWN0aW9uVmlld1VybCwgYXJ0d29ya1VybDEwMCB9ID0gZWxcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7YXJ0d29ya1VybDEwMH1cIiBvbmNsaWNrPVwid2luZG93Lm9wZW4oJyR7Y29sbGVjdGlvblZpZXdVcmx9JylcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgICAgICAgPHA+JHthcnRpc3ROYW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8cD4ke2NvbGxlY3Rpb25OYW1lfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBnZXRBbGJ1bSgpIHtcbiAgICAvLyBtZXRob2QgMzpcbiAgICBheGlvcyh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBtZXRob2Q6ICdnZXQnXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIC8vIGBkYXRhYCBpcyB0aGUgcmVzcG9uc2UgdGhhdCB3YXMgcHJvdmlkZWQgYnkgdGhlIHNlcnZlclxuICAgICAgICBwcmludERhdGEocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIC8vIGBzdGF0dXNgIGlzIHRoZSBIVFRQIHN0YXR1cyBjb2RlIGZyb20gdGhlIHNlcnZlciByZXNwb25zZVxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAvLyBgc3RhdHVzVGV4dGAgaXMgdGhlIEhUVFAgc3RhdHVzIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyIHJlc3BvbnNlXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgICAvLyBgaGVhZGVyc2AgdGhlIEhUVFAgaGVhZGVycyB0aGF0IHRoZSBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGhcbiAgICAgICAgLy8gQWxsIGhlYWRlciBuYW1lcyBhcmUgbG93ZXIgY2FzZWQgYW5kIGNhbiBiZSBhY2Nlc3NlZCB1c2luZyB0aGUgYnJhY2tldCBub3RhdGlvbi5cbiAgICAgICAgLy8gRXhhbXBsZTogYHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddYFxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgICAgLy8gYGNvbmZpZ2AgaXMgdGhlIGNvbmZpZyB0aGF0IHdhcyBwcm92aWRlZCB0byBgYXhpb3NgIGZvciB0aGUgcmVxdWVzdFxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5jb25maWcpO1xuICAgICAgICAvLyBgcmVxdWVzdGAgaXMgdGhlIHJlcXVlc3QgdGhhdCBnZW5lcmF0ZWQgdGhpcyByZXNwb25zZVxuICAgICAgICAvLyBJdCBpcyB0aGUgbGFzdCBDbGllbnRSZXF1ZXN0IGluc3RhbmNlIGluIG5vZGUuanMgKGluIHJlZGlyZWN0cylcbiAgICAgICAgLy8gYW5kIGFuIFhNTEh0dHBSZXF1ZXN0IGluc3RhbmNlIGluIHRoZSBicm93c2VyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnJlcXVlc3QpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBUaGUgcmVxdWVzdCB3YXMgbWFkZSBhbmQgdGhlIHNlcnZlciByZXNwb25kZWQgd2l0aCBhIHN0YXR1cyBjb2RlXG4gICAgICAgICAgICAvLyB0aGF0IGZhbGxzIG91dCBvZiB0aGUgcmFuZ2Ugb2YgMnh4XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLnJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IucmVxdWVzdCkge1xuICAgICAgICAgICAgLy8gVGhlIHJlcXVlc3Qgd2FzIG1hZGUgYnV0IG5vIHJlc3BvbnNlIHdhcyByZWNlaXZlZFxuICAgICAgICAgICAgLy8gYGVycm9yLnJlcXVlc3RgIGlzIGFuIGluc3RhbmNlIG9mIFhNTEh0dHBSZXF1ZXN0IGluIHRoZSBicm93c2VyIFxuICAgICAgICAgICAgLy8gYW5kIGFuIGluc3RhbmNlIG9mIGh0dHAuQ2xpZW50UmVxdWVzdCBpbiBub2RlLmpzXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLnJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLmNvbmZpZyk7XG4gICAgfSk7XG5cbiAgICAvLyAvLyBtZXRob2QgMjpcbiAgICAvLyBmZXRjaCh1cmwsIHtcbiAgICAvLyAgICAgbWV0aG9kOiAnZ2V0J1xuICAgIC8vIH0pLnRoZW4ocmVzID0+IHtcbiAgICAvLyAgICAgLy8gZmV0Y2gg5ZKMIGpRdWVyeS5hamF4KCkg55qE5beu55Ww77yaXG4gICAgLy8gICAgIC8vIGZldGNoKCkg5Zue5YKz55qEIHByb21pc2Ug54mp5Lu2LCDnlbbpgYfliLAgSFRUUCBTdGF0dXMgNDA0LCA1MDAg5pmCXG4gICAgLy8gICAgIC8vIOS7jeacg+S9v+eUqCByZXNvbHZlIOS9hiByZXMub2sg54K6IGZhbHNl77yMXG4gICAgLy8gICAgIC8vIHJlamVjdCDlj6rlnKjntrLot6/nmbznlJ/pjK/oqqTmiJbku7vkvZXkuK3mlrfoq4vmsYLmmYLmiY3kvb/nlKjjgIJcbiAgICAvLyAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcignTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rLicpO1xuICAgIC8vICAgICAvLyDlj6/pgI/pgY4gYmxvYigpLCBqc29uKCksIHRleHQoKSDlj5blvpfos4fmlplcbiAgICAvLyAgICAgLy8g6Iul5Ye654++6Yyv6Kqk77yaXCJGYWlsZWQgdG8gZXhlY3V0ZSAnanNvbicgb24gJ1Jlc3BvbnNlJzogYm9keSBzdHJlYW0gaXMgbG9ja2VkXCJcbiAgICAvLyAgICAgLy8g5Y6f5Zug54K6IFJlc3BvbnNlIG1ldGhvZGUgbGlrZSAnanNvbicsICd0ZXh0JyBjYW4gYmUgY2FsbGVkIG9uY2UsIGFuZCB0aGVuIGl0IGxvY2tzLlxuICAgIC8vICAgICAvLyDlj6/kvb/nlKjkuIvliJfmlrnms5XlsIcganNvbiDmmqvlrZhcbiAgICAvLyAgICAgbGV0IGpzb24gPSByZXMuanNvbigpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhqc29uKTtcbiAgICAvLyAgICAgcmV0dXJuIGpzb247XG4gICAgLy8gfSkudGhlbihqc29uID0+XG4gICAgLy8gICAgIHByaW50RGF0YShqc29uKVxuICAgIC8vICkuY2F0Y2goZXJyID0+XG4gICAgLy8gICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIC8vICk7XG5cbiAgICAvLyAvLyBtZXRob2QgMTpcbiAgICAvLyB2YXIgcmVxdWVzdCA9ICQuYWpheCh7XG4gICAgLy8gICB1cmwsXG4gICAgLy8gICBtZXRob2Q6ICdnZXQnXG4gICAgLy8gfSk7XG4gICAgLy8gcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUikge1xuICAgIC8vICAgcHJpbnREYXRhKGRhdGEpXG4gICAgLy8gfSk7XG4gICAgLy8gcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAvLyAgIGFsZXJ0KHRleHRTdGF0dXMpXG4gICAgLy8gfSk7XG4gICAgLy8gcmVxdWVzdC5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgIC8vICAgLy8gYWxlcnQoXCJjb21wbGV0ZVwiKVxuICAgIC8vIH0pO1xufVxuXG4kKCgpID0+IHtcbiAgICBnZXRBbGJ1bSgpO1xufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=