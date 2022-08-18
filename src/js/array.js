let ary1 = [1, 2, 3];
let ary2 = ['a', 'b'];
let ary3 = ary1.concat(ary2);
console.log('ary1:', ary1); // [ 1, 2, 3 ]
console.log('ary3:', ary3); // [ 1, 2, 3, 'a', 'b' ]

console.log('join:', ary3.join('#')); // 1#2#3#a#b

// 刪除陣列最後一個元素，並傳回其值
let popLastElement = ary3.pop();
console.log('lastElement:', popLastElement); // b
console.log('ary3:', ary3); // [ 1, 2, 3, 'a' ]

// 將一個以上的元素加入陣列後頭，並傳回新的陣列長度
let pushAryLen = ary3.push('d', 'e');
console.log('aryLen:', pushAryLen); // 6
console.log('ary3:', ary3); // [ 1, 2, 3, 'a', 'd', 'e' ]

// 刪除陣列第一個元素，其餘往前遞補，並傳回刪除值
let shiftFirstElement = ary3.shift();
console.log('shiftFirstElement:', shiftFirstElement); // 1
console.log('ary3:', ary3); // [ 2, 3, 'a', 'd', 'e' ]

// 將一個以上的元素加到陣列的前面，原有元素則往後退，並傳回新的陣列長度
let unshiftAryLen = ary3.unshift('x', 'y');
console.log('unshiftAryLen:', unshiftAryLen); // 7
console.log('ary3:', ary3); // ['x', 'y', 2, 3, 'a', 'd', 'e']

let ary4 = [1, 2, 3];
let ary5 = ary4.reverse();
console.log('ary4:', ary4); // [ 3, 2, 1 ]
console.log('ary5:', ary5); // [ 3, 2, 1 ]

// 回傳所選取的元素陣列
let arySlice = ary5.slice(0, 2);
console.log('arySlice:', arySlice); // [ 3, 2 ]

let ary6 = ary5.map(element => element * 2);
console.log('ary6:', ary6); // [ 6, 4, 2 ]
