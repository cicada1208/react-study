// call by value, call by reference ＆ call by sharing:
// primitive types is call by value
// object is call by reference or call by sharing(一種說法)
// javascript 只有 call by value(與C++定義來比較)

console.log('call by reference or by sharing ex1:')
function add(obj) {
    // 此行為跟 call by reference 一樣
    obj.number++
}
var o = { number: 10 }
add(o)
console.log(o.number) // 11


console.log('call by reference or by sharing ex2:')
function add2(obj) {
    // 如果在 function 裡把 obj 重新賦值(指向)，代表要讓這個 obj 指向一個新的 object，
    // 所以外面的 o2 依舊是原來的值
    obj = {
        number: obj.number + 1
    }
}
var o2 = { number: 10 }
add2(o2)
console.log(o2.number) // 10


console.log('call by reference:')
function run(a) {
    arguments[0] = { name: 'run' } // 同 a = { name: 'run' }
    console.log('a:', a) // a: { name: 'run' }
    // arguments[0].name = 'run'
}
var obj = { name: 'obj' }
run(obj)
console.log('obj: ', obj) // obj:  { name: 'obj' }
