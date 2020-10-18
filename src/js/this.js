// this:
// this 在 class, object 裡，代表 instance 後本身
// 脫離物件後指向預設綁定:
// 1. 嚴格模式底下是 undefined
// 2. 非嚴格模式，瀏覽器底下是 window
// 3. 非嚴格模式，node.js 底下是 global

// 作用域: 是靜態，根據變數、函式定義在程式碼的「哪裡」，決定值。
// this: 是動態，看這個函式「怎麽」被呼叫，決定值。
// 把 a.b.c.hello() 看成 a.b.c.hello.call(a.b.c)，以此類推，就能輕鬆找出 this 值。

'use strict';

console.log('teat1:')
function hello(a, b) {
  console.log(this, a, b)
}

hello(1, 2) // undefined 1 2

// 3 種更改 this 值方式
hello.call('self.define.this', 1, 2) // self.define.this 1 2
hello.apply('self.define.this', [1, 2]) // self.define.this 1 2
const myHello = hello.bind('self.define.this', 1, 2)
myHello() // self.define.this 1 2


console.log('teat2:')
class square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  print() {
    console.log(this)
  }
}

const square1 = new square(1, 2)
square1.print() // this is instance: square { width: 1, height: 2 }
square1.print.call('self.define.this') // self.define.this


console.log('teat3:')
const obj3 = {
  value: 1,
  hello: function () {
    console.log(this.value)
  }
}

obj3.hello() // 1
// const hey = obj3.hello
// hey() // Cannot read property 'value' of undefined


console.log('teat4:')
const obj4 = {
  value: 1,
  hello: function () {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value)
    }
  }
}

obj4.inner.hello() // obj4.inner.hello.call(obj4.inner) => 2
const obj4a = obj4.inner
obj4a.hello() // obj4a.hello.call(obj4a) => 2
// const hello4 = obj4.inner.hello
// hello4() // hello4.call() => Cannot read property 'value' of undefined


console.log('teat5:')
function hello5() {
  console.log(this)
}

var a = { value: 1, hello5 }
var b = { value: 2, hello5 }
hello5() // hello5.call() => undefined
a.hello5() // a.hello5.call(a) => a
b.hello5() // b.hello5.call(b) => b
b.hello5.apply(a) // a


console.log('teat6:')
var x = 10
var obj = {
  x: 20,
  fn: function () {
    var test = function () {
      console.log(this.x)
    }
    test()
  }
}
// obj.fn() // Cannot read property 'x' of undefined


console.log('teat7:')
const obj7 = {
  x: 20,
  fn: function () {
    // 這邊印出來的 this 是什麼，test 的 this 就是什麼
    // obj7.fn()呼叫時，宣告 Arrow functions 的地方，this 是什麼，test 的 this 就是什麼
    const test = () => {
      console.log(this.x)
    }
    test()
  }
}
obj7.fn() // 20
// const fn7 = obj7.fn
// fn7() // Cannot read property 'x' of undefined
