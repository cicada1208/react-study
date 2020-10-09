let obj = { x: '456' }
let obj2 = { x: '456' }
console.log(obj2 === obj);


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


// let ary = [1, 2]
// let ary1 = ary
// console.log(Object.is(ary, ary1))
// // let ary2 = ary.concat([])
// // let ary3 = [...ary,]
// let ary4 = [3, 4]
// // ary.push(3, 4)
// ary = [...ary4, ...ary]
// console.log(ary1)
// console.log(ary)
// console.log(Object.is(ary, ary1))
// // console.log(Object.is(ary, ary1))
// // console.log(Object.is(ary, ary2))
// // console.log(Object.is(ary, ary3))
// // console.log(ary3)
