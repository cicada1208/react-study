// ==: 一般相等("雙等於")，不同型別先轉型後再比較值
// ===: 嚴格相等("三等於"、"全等")，比較型別及值
// Object.is: 和嚴格相等做同樣的事，但會將 NaN、-0、+0 獨立處理


// objExp = false、0、''、null、undefined 判斷式印出 print
let objExp = 0
if (!objExp)
    console.log('print')

console.log('null == undefined:', null == undefined) // true
console.log('null === undefined:', null === undefined) // false
console.log('Object.is(null, undefined):', Object.is(null, undefined)) // false

console.log('null == false:', null == false) // false
console.log('null === false:', null === false) // false
console.log('Object.is(null, false):', Object.is(null, false)) // false

console.log('undefined == false:', undefined == false) // false
console.log('undefined === false:', undefined === false) // false
console.log('Object.is(undefined, false):', Object.is(undefined, false)) // false

console.log('0 == null:', 0 == null) // false
console.log('0 === null:', 0 === null) // false
console.log('Object.is(0, null):', Object.is(0, null)) // false

console.log('0 == undefined:', 0 == undefined) // false
console.log('0 === undefined:', 0 === undefined) // false
console.log('Object.is(0, undefined):', Object.is(0, undefined)) // false

console.log('0 == NaN:', 0 == NaN) // false
console.log('0 === NaN:', 0 === NaN) // false
console.log('Object.is(0, NaN):', Object.is(0, NaN)) // false

// ==: 0、false、'' -> 相等
// ==＝: 0、false、'' -> 不等
// Object.is: 0、false、'' -> 不等
console.log(`0 == '':`, 0 == '') // true
console.log(`0 === '':`, 0 === '') // false
console.log(`Object.is(0, ''):`, Object.is(0, '')) // false

console.log('+0 == -0:', +0 == -0) // true
console.log('+0 === -0:', +0 === -0) // true
console.log('Object.is(+0, -0):', Object.is(+0, -0)) // false
console.log('1 / +0 === 1 / -0:', 1 / +0 === 1 / -0) // false  Infinity !== -Infinity
console.log('0 / 0:', 0 / 0) // NaN

console.log('NaN == NaN:', NaN == NaN) // false
console.log('NaN === NaN:', NaN === NaN) // false
console.log('Object.is(NaN, NaN):', Object.is(NaN, NaN)) // true

// a new object reference value is different (記憶體位址)
console.log(`{ x: 'test' } == { x: 'test' }:`, { x: 'test' } == { x: 'test' }) // false
console.log(`{ x: 'test' } === { x: 'test' }:`, { x: 'test' } === { x: 'test' }) // false
console.log(`Object.is({ x: 'test' }, { x: 'test' }):`, Object.is({ x: 'test' }, { x: 'test' })) // false

let ary = [1]
let ary2 = ary
console.log(`Object.is(ary, ary2):`, Object.is(ary, ary2)) // true
let ary3 = ary.concat([])
console.log(`ary === ary3:`, ary === ary3) // false
console.log(`Object.is(ary, ary3):`, Object.is(ary, ary3)) // false
let ary4 = [...ary,]
console.log(`ary === ary4:`, ary === ary4) // false
console.log(`Object.is(ary, ary4):`, Object.is(ary, ary4)) // false
let ary5 = ary
ary5.push(2)
console.log(`Object.is(ary, ary5):`, Object.is(ary, ary5)) // true
