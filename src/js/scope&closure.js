// scope & closure:

console.log('test:')
var v1 = 10
function test() {
    var v2 = 20
    function inner() {
        console.log(v1, v2) //10 20
    }
    return inner
}
var inner = test()
inner()

console.log('testa:')
var a = 100
function testa() {
    var a = 200
    function inner() {
        console.log(a) // 200
    }
    inner()
}
testa()

console.log('testb:')
var b = 100
function testb() {
    var b = 200
    outer()
}
function outer() {
    console.log(b) // 100
}
testb()

console.log('testc:')
function testc() {
    var counter = 1
    function inner() {
        return counter++
    }
    return inner
}
var counter = testc()
console.log(counter()) // 1
console.log(counter()) // 2
