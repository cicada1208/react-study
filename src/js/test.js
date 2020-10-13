let obj = { x: '1' }
console.log({ x: '2', ...obj, y: 'q' })

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
