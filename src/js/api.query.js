import $ from 'jquery'
import axios from 'axios'

const url = 'https://itunes.apple.com/search?term=twice&limit=10'

function printData(data) {
    let dataObj = data
    var $divApiQuery = $("<div id='divApiQuery'></div>")
    $('body').append($divApiQuery)
    dataObj.results.forEach(el => {
        const { artistName, collectionName, collectionViewUrl, artworkUrl100 } = el
        $('#divApiQuery').append(`
        <div id="divApiQueryAlbum">
            <img class="divApiQueryImg" src="${artworkUrl100}" onclick="window.open('${collectionViewUrl}')"/>
            <div>
                <p>${artistName}</p>
                <p>${collectionName}</p>
            </div>
        </div>
        `)
    })
}

function getAlbum() {
    // method 3:
    axios({
        url: url,
        method: 'get'
    }).then(response => {
        // `data` is the response that was provided by the server
        printData(response.data);
        // `status` is the HTTP status code from the server response
        console.log(response.status);
        // `statusText` is the HTTP status message from the server response
        console.log(response.statusText);
        // `headers` the HTTP headers that the server responded with
        // All header names are lower cased and can be accessed using the bracket notation.
        // Example: `response.headers['content-type']`
        console.log(response.headers);
        // `config` is the config that was provided to `axios` for the request
        console.log(response.config);
        // `request` is the request that generated this response
        // It is the last ClientRequest instance in node.js (in redirects)
        // and an XMLHttpRequest instance in the browser
        console.log(response.request);
    }).catch(error => {
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
    });

    // // method 2:
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
    //     url,
    //     method: 'get'
    // });
    // request.done(function (data, textStatus, jqXHR) {
    //     printData(JSON.parse(data))
    // });
    // request.fail(function (jqXHR, textStatus, errorThrown) {
    //     alert(textStatus)
    // });
    // request.always(function () {
    //     // alert("complete")
    // });
}

$(() => {
    getAlbum();
})
