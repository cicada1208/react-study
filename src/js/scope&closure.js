// scope & closure:

console.log('test1:')
var v1 = 10
function test1() {
  var v2 = 20
  function inner() {
    console.log(v1, v2) //10 20
  }
  return inner
}
var inner = test1()
inner()


console.log('test2:')
var a = 100
function test2() {
  var a = 200
  function inner() {
    console.log(a) // 200
  }
  inner()
}
test2()


console.log('test3:')
var b = 100
function test3() {
  var b = 200
  outer()
}
function outer() {
  console.log(b) // 100
}
test3()


console.log('test4:')
function test4() {
  var counter = 1
  function inner() {
    return counter++
  }
  return inner
}
var counter = test4()
console.log(counter()) // 1
console.log(counter()) // 2
