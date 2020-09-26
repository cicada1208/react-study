// var fs = (x) => {
//     return x
// }

// function f(fs) {
//     var y = 'test'
//     return fs(y)
// }

// console.log(f(fs))

// console.log('' == 0) // true
// console.log('' === 0) // false
// console.log(+0 == -0) // true
// console.log(+0 === -0) // true
// console.log(NaN == NaN) // false
// console.log(NaN === NaN) // false

let ary = [1, 2]
let ary1 = ary
console.log(Object.is(ary, ary1))
// let ary2 = ary.concat([])
// let ary3 = [...ary,]
let ary4 = [3, 4]

// ary.push(3, 4)
ary = [...ary4, ...ary]
console.log(ary1)
console.log(ary)
console.log(Object.is(ary, ary1))

// console.log(Object.is(ary, ary1))
// console.log(Object.is(ary, ary2))
// console.log(Object.is(ary, ary3))
// console.log(ary3)

// let obj = { k1: 'a' }
// let obj2 = { k2: 'b' }
// let obj3 = { ...obj, ...obj2 }
// console.log(obj3)