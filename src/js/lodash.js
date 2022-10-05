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

console.log('union:', _.union([2], [1, 2])); // [ 2, 1 ]

console.log('unionBy:', _.unionBy([2.1], [1.2, 2.3], Math.floor)); // [ 2.1, 1.2 ]

console.log(
  'unionBy:',
  _.unionBy(
    [{ x: 1, y: 0 }],
    [
      { x: 2, y: 1 },
      { x: 1, y: 2 }
    ],
    'x'
  )
); // [ { x: 1, y: 0 }, { x: 2, y: 1 } ]

console.log(
  'unionWith:',
  _.unionWith(
    [
      { x: 1, y: 2 },
      { x: 2, y: 1 }
    ],
    [
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ],
    _.isEqual
  )
); // [ { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 } ]

console.log('uniq:', _.uniq([2, 1, 2])); // [ 2, 1 ]

// forEach: As with other "Collections" methods, objects with a "length" property are iterated like arrays. To avoid this behavior use _.forIn or _.forOwn for object iteration.
console.log('forEach:');
_.forEach({ a: 1, b: 2 }, (value, key) => console.log(`${key} = ${value}`)); // object iteration order is not guaranteed

console.log('countBy:', _.countBy([6.1, 4.2, 6.3], Math.floor)); // { '4': 1, '6': 2 }
console.log('countBy:', _.countBy(['three', 'one', 'two'], 'length')); // { '3': 2, '5': 1 }

console.log('groupBy:', _.groupBy([6.1, 4.2, 6.3], Math.floor)); // { '4': [4.2], '6': [6.1, 6.3] }

console.log('groupBy:', _.groupBy(['one', 'two', 'three'], 'length')); // { '3': ['one', 'two'], '5': ['three'] }

console.log(
  'groupBy:',
  _.groupBy(
    [
      { user: 'barney', group: 1 },
      { user: 'fred', group: 2 },
      { user: 'amy', group: 1 }
    ],
    'group'
  )
);
// {
//   '1': [ { user: 'barney', group: 1 }, { user: 'amy', group: 1 } ],
//   '2': [ { user: 'fred', group: 2 } ]
// }

console.log('includes:', _.includes({ a: 1, b: 2 }, 1));

console.log(
  'invokeMap:',
  _.invokeMap(
    [
      [5, 1, 7],
      [3, 2, 1]
    ],
    'sort'
  )
); // [ [ 1, 5, 7 ], [ 1, 2, 3 ] ]

console.log('invokeMap:', _.invokeMap([123, 456], String.prototype.split, '')); // [ [ '1', '2', '3' ], [ '4', '5', '6' ] ]

console.log(
  'map:',
  _.map({ a: 4, b: 8 }, n => n * n)
); // [16, 64] (iteration order is not guaranteed)

console.log('map:', _.map([{ user: 'barney' }, { user: 'fred' }], 'user')); // ['barney', 'fred']
