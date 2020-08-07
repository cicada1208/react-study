// hoisting:
// 1. 每當進入一個 function 的時候，就會產生一個 EC(Execution Contexts)
// 2. 產生 EC 相關的 VO(variable object): 傳入的參數、function 裡宣告的函式與變數
// 2.1. 傳入的參數: 放到 VO 裡並設定傳入的值，無值的設成 undefined
// 2.2. function 裡宣告的函式: 宣告的函式放到 VO 裡，如果已有同名的 VO 就覆蓋
// 2.3. function 裡宣告的變數: 宣告的變數放到 VO 裡，值設成 undefined；如果已有同名的 VO 則忽略
// 3. 產生完 VO 後，並把這個 EC 放進 stack
// 4. 一行行執行程式碼
// 5. 當 function 執行完後，就會把 EC 給 pop 出來

console.log('test:')
function test(v) {
    // 2. 產生的 VO: { v: 1 }, 覆蓋為 { v: [Function: v] }, 忽略 function 裡宣告的變數 var v
    console.log(v) // [Function: v]
    console.log(v()) // 2
    function v() { return 2 }
    var v = 3 // 4. 一行行執行程式碼, v = 3
    console.log(v) // 3
}
test(1)

console.log('testa:')
function testa() {
    // 2. 產生的 VO: { a: undefined, ab: undefined }
    console.log(a) // undefined
    var a = 'aa' // 4. 一行行執行程式碼, a = 'aa'
    var ab = 'ab' // 4. 一行行執行程式碼, ab = 'ab'
}
testa()

console.log('testb:')
var b = 'b'
function testb() {
    console.log(b) // ReferenceError: Cannot access 'b' before initialization
    let b // let、const 的 hoisting 行為與 var 不同
}
testb()
