const A = 65 // ASCII character code
let obj = Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i))
console.log(obj)

// class Animal {
//     constructor(name) {
//         this.name = name;
//     }

//     speak() {
//         console.log(this.name + ' makes a noise.');
//     }
// }

// class Dog extends Animal {
//     constructor(na) {
//         super(na)
//     }

//     speak() {
//         console.log(this.name + ' barks.');
//     }
// }

// var d = new Dog('Mitzie');
// d.speak(); // Mitzie barks.
