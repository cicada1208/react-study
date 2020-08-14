// Promise：非同步實作，若有多個API要同時發送並待全都回傳成功後再一併顯示，會較$.ajax()更為容易處理。

// 狀態：
// pending：初始狀態。
// fulfilled：代表操作成功所以對應到 resolve()。
// rejected：代表操作失敗所以對應到 reject()。


const $ = require('jquery')
const url = 'https://itunes.apple.com/search?term=twice&limit=2'

// test1:
let promise = new Promise((resolve, reject) => {
    // 執行一些非同步作業，最終呼叫:
    var boolSuccess = true; // false
    if (boolSuccess) {
        // if success -> resolve data
        // 代表操作成功，並將括號內的值回傳回去
        resolve("ok_data");
    }
    else {
        // if error -> reject error
        // 代表操作失敗，並結束操作，並將括號內的值回傳回去
        reject("err_msg");
    }
});

// Promise.then() and Promise.catch()
// 都回傳 Promise 物件且括號內都是 callback funciton
promise.then(
    // 當 Promise 狀態為 fulfill 時，可用 Promise.then() 來操作 resolve() 接收的資料
    // output: "ok_data"
    data => console.log("test1:", data)
).catch(
    // 當 Promise 狀態為 reject 時，可用 Promise.catch() 來操作 reject() 接收的錯誤訊息
    // output: "err_msg"
    err => console.error("test1:", err)
);


// test2:
promise = new Promise(function (resolve, reject) {
    resolve(1);
});

// then() isn't the end of the story, you can chain thens together 
// to transform values or run additional async actions one after another.
// You can transform values simply by returning the new value.
promise.then(function (val) {
    console.log('test2:', val); // test2: 1
    return val + 2;
}).then(function (val) {
    console.log('test2:', val); // test2: 3
    throw Error('raise error')
}).catch(function (err) {
    console.error('test2:', err); // test2: Error: raise error
}).then(function () {
    console.log('test2:', "all done");  // test2: all done
})


// test3:
var p1 = Promise.resolve(1);
var p2 = 2;
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'three');
});
var p4 = new Promise((resolve, reject) => {
    reject(Error('fail'));
});

// 括號內所有的 Promise 其狀態都是 fulfilled 後才實現
// 抑或其一 Promise rejected 後回傳該訊息
Promise.all([p1, p2, p3]).then(
    data => console.log('test3:', data) // test3: [ 1, 2, 'three' ]
).catch(
    err => console.error('test3:', err)
);

Promise.all([p1, p2, p3, p4]).then(
    data => console.log('test3.2:', data)
).catch(
    err => console.error('test3.2:', err) // test3: Error: fail
);


// test4:
// XMLHttpRequest run in browser
// Promisifying XMLHttpRequest
function get_test4(url) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(JSON.parse(req.response));
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function () {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

get_test4(url).then(function (response) {
    console.log("test4:", response);
}, function (error) {
    console.error("test4:", error);
})


// test5:
// run in browser
function get_test5(url) {
    return new Promise((resolve, reject) => {
        var request = $.ajax({
            url,
            method: 'get'
        }).done((data, textStatus, jqXHR) => {
            resolve(data)
        }).fail((jqXHR, textStatus, errorThrown) => {
            reject(Error(textStatus))
        });
    });
}

get_test5(url).then(
    // 簡化2
    JSON.parse

    // 簡化1: 單行即表示以該行值return
    // response => JSON.parse(response)

    // 原式
    // // response => {
    // //     return JSON.parse(response);
    // // }
).then(json =>
    console.log("test5:", json)
).catch(error =>
    console.error("test5:", error)
)


// test6:
promise = new Promise(function (resolve, reject) {
    // JSON.parse throws an error if you feed it some
    // invalid JSON, so this implicitly rejects:
    var json = JSON.parse("This ain't JSON")
    resolve(json);
});

promise.then(function (data) {
    // This never happens:
    console.log("test6:", data);
}).catch(function (err) {
    // Instead, this happens:
    console.error("test6:", err); // test6: SyntaxError: Unexpected token T in JSON at position 0
})


// test7:
function getPromise(data, time) {
    return new Promise((resolve, reject) =>
        setTimeout(resolve, time, data)
    ).then(data =>
        console.log('test7:', data)
    ).catch(err =>
        console.log('test7:', err)
    )
}

let aryData = [1, 2, 3]
let aryTime = [3000, 2000, 1000]

aryData.forEach((data, idx) => {
    // 每個 Promise 執行時間不同，故不會照順序印出
    // output:
    // 3
    // 2
    // 1
    getPromise(data, aryTime[idx])
})

aryData = ['a', 'b', 'c']
var sequence = Promise.resolve();
aryData.forEach((data, idx) => {
    // 以 then 串接，按順序執行
    // output:
    // a
    // b
    // c
    sequence = sequence.then(() =>
        getPromise(data, aryTime[idx])
    )
})

// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
aryData = ['x', 'y', 'z']
aryData.reduce((sequence2, data, idx) => {
    // 以 then 串接，按順序執行
    // output:
    // x
    // y
    // z
    return sequence2.then(() =>
        getPromise(data, aryTime[idx])
    )
}, Promise.resolve())


console.log('promise test end.')
