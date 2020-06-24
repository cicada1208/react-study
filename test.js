function main(require) {
    var obj = require('./utils')
    console.log(obj.cal(30))
    console.log(obj.name)
}

function utils(module) {
    function calculate(n) {
        return ((n * 100 + 20 - 4)) % 10 + 3
    }

    module.exports = {
        cal: calculate,
        name: 'hello'
    }
}

var m = {}
utils(m)

// 加入底下這幾行
function r() {
    // 回傳我們所需要的 m.exports
    return m.exports
}
main(r)

// import * as ex from './test_module.js';
// console.log(ex.counter);

//------------

// const axios = require('axios');
// const fs = require('fs');
// axios({
//   method: 'get',
//   url: 'http://bit.ly/2mTM3nY',
//   responseType: 'stream'
// }).then(function (response) {
//   console.log(response)
//   // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
// });

//------------

// const url = 'https://itunes.apple.com/search?term=twice&limit=10'

// function printData(data) {
//   $('.loading').remove()
//   let dataObj = data //JSON.parse(data)
//   dataObj.results.forEach(el => {
//     const { artistName, collectionName, collectionViewUrl, artworkUrl100 } = el
//     $('body').append(`
//       <div class="card">
//         <div class="image">
//           <img src="${artworkUrl100}" onclick="window.open('${collectionViewUrl}')"/>
//         </div>
//         <div class="info">
//           <p>${artistName}</p>
//           <p>${collectionName}</p>
//         </div>
//       </div>
//     `)
//   })
// }

// function getAlbum() {
//   fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(json => {
//       printData(json)
//     })
//     .catch(err => {
//       console.log(err)
//     });

//   // var request = $.ajax({
//   //   url,
//   //   method: 'GET'
//   // });
//   // request.done(function (data, textStatus, jqXHR) {
//   //   printData(data)
//   // });
//   // request.fail(function (jqXHR, textStatus, errorThrown) {
//   //   alert(textStatus)
//   // });
//   // request.always(function () {
//   //   // alert("complete")
//   // });
// }

// $(() => {
//   // fetch_test();
//   // $("button").click(test);
//   getAlbum();
// })
