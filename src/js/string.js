let str = 'a,b,c,d';
console.log(str.split(',', 2)); //[ 'a', 'b' ]
console.log(str.concat('1', '2')); // a,b,c,d12

let str2 = 'a,b,1,2,c,d';
console.log(str2.match(/\d/g)); // [ '1', '2' ]
console.log(str2.search(/\d/)); // 4
