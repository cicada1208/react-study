function a(fn) {
    setTimeout(fn, 0) // 非同步執行 fn
}

a(function () {
    console.log('a')
})
console.log('hello')