const _ = require('lodash');

let obj1 = { a: 'a' };
let obj2 = obj1;
console.log(_.difference([obj1, 1], [2, obj2])); // [ 1 ]
