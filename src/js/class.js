// class: ES6 引入類別作為 JavaScript 現有原型程式(prototype-based)繼承的語法糖，
// 並不是要引入物件導向，而是提供一個更簡潔的語法來建立物件和處理繼承。
// 函數宣告是 hoisted ，類別宣告/類別敘述不是，故需宣告後存取，否則會 ReferenceError。

// 類別宣告(class declarations):
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
    console.log('this:', this);
  }

  // static method
  static owner() {
    console.log('pepole.');
    console.log('this:', this);
  }
}

var animal = new Animal('Godzilla');
animal.speak(); // this: Animal { name: 'Godzilla' }
Animal.owner(); // this: [(Function: Animal)]

// 類別宣告:
class Dog extends Animal {
  constructor(na) {
    super(na); // 呼叫父類別建構子
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

var dog = new Dog('Mitzie');
dog.speak(); // Mitzie barks.

// 函式基礎類別(function based classes):
function Animal2(name) {
  this.name = name;
}

Animal2.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
};

// 類別敘述(class expressions):
// named:
// var Cat = class Cat extends Animal {
// unnamed:
var Cat = class extends Animal2 {
  constructor(na) {
    super(na);
    // super.speak();
  }

  speak() {
    console.log(this.name + ' miou.');
  }
};

var cat = new Cat('Kit');
cat.speak(); // Kit miou.
