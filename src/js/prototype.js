// prototype:

console.log('test1:')
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.log = function () {
    console.log(this.name + ', age:' + this.age);
  }
}

var nick = new Person('nick', 18);
var peter = new Person('peter', 20);
// 該情況，nick.log 與 peter.log 在做同件事，
// 但佔用了兩份空間，他們其實是兩個不同的 function
console.log(nick.log === peter.log) // false
nick.log(); // nick, age:18
peter.log(); // peter, age:20


console.log('test2:')
function Person2(name, age) {
  this.name = name;
  this.age = age;
}

Person2.prototype.log = function () {
  console.log(this.name + ', age:' + this.age);
}

var nick2 = new Person2('nick', 18);
var peter2 = new Person2('peter', 20);
// 把該 function 抽出，所有 Person2 的 instance 皆可共享這個方法
console.log(nick2.log === peter2.log) // true
// nick2.__proto__ 指向 Person2.prototype
console.log(nick2.__proto__ === Person2.prototype) // true
// Person2.prototype.__proto__ 指向 Object.prototype
console.log(Person2.prototype.__proto__ === Object.prototype) // true
// Object.prototype.__proto__ 指向 null，這就是原型鍊的頂端
console.log(Object.prototype.__proto__) // null
// 判斷屬性是存在 instance 上，還是存在於它屬於的原型鍊中
console.log(nick2.hasOwnProperty('log')); // false
console.log(nick2.__proto__.hasOwnProperty('log')); // true

function call(obj, methodName) {
  var realMethodOwner = obj;

  // 不斷往上找，直到 null 或者是找到真的擁有這個 method 的人為止
  while (realMethodOwner && !realMethodOwner.hasOwnProperty(methodName)) {
    realMethodOwner = realMethodOwner.__proto__;
  }

  // 找不到就丟一個 error，否則執行這個 method
  if (!realMethodOwner) {
    console.log('method not found.');
  } else {
    realMethodOwner[methodName].apply(obj);
  }
}

call(nick2, 'log'); // nick, age:18
call(nick2, 'not_exist'); // Uncaught method not found.

// A instanceof B 判斷 A 是不是 B 的 instance
console.log(nick2 instanceof Person2); // true
console.log(nick2 instanceof Object); // true
console.log(nick2 instanceof Array); // false
