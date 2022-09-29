const _ = require('lodash');

let obj1 = { a: 'a' };
let obj2 = obj1;
console.log('difference:', _.difference([obj1, 1], [2, obj2])); // [ 1 ]

console.log(
  'differenceBy:',
  _.differenceBy([2.9, 1.2], [2.3, 3.4], Math.floor)
); // [ 1.2 ]

console.log(
  'differenceBy:',
  _.differenceBy(
    [
      { x: 2, y: 0 },
      { x: 1, y: 1 }
    ],
    [{ x: 1, y: 2 }],
    'x'
  )
); // [ { x: 2, y: 0 } ]
