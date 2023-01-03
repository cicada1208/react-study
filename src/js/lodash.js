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

console.log(
  'orderBy:',
  _.orderBy(
    [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 }
    ],
    ['user', 'age'],
    ['asc', 'desc']
  )
);
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 }
// ];

console.log(
  'partition:',
  _.partition(
    [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
      { user: 'pebbles', age: 1, active: false }
    ],
    user => user.active // 'active'
  )
);
// [
//   [{ user: 'fred', age: 40, active: true }],
//   [
//     { user: 'barney', age: 36, active: false },
//     { user: 'pebbles', age: 1, active: false }
//   ]
// ];

console.log(
  'reduce:',
  _.reduce(
    { a: 1, b: 2, c: 1 },
    function (result, value, key) {
      (result[value] || (result[value] = [])).push(key);
      return result;
    },
    {}
  )
); // { '1': [ 'a', 'c' ], '2': [ 'b' ] }

console.log(
  _.reduceRight(
    [
      [0, 1],
      [2, 3],
      [4, 5]
    ],
    (flattened, other) => flattened.concat(other),
    []
  )
); // [4, 5, 2, 3, 0, 1]

// 延遲一秒執行，若於 delay 時間內多次執行 delay1s，
// 會以最後一次延遲一秒才執行
var delay1s = _.debounce(p => console.log('debounce:', p), 1000);
delay1s('debounce.test');
delay1s('debounce.test'); // print once debounce: debounce.test
// delay1s.cancel(); // 取消就不會執行印出東西

// Creates a throttled function that only invokes func at most once per every wait milliseconds.
var throttle1 = _.throttle(p => console.log('throttle1:', p), 100);
// print throttle1: throttle1.test.a
// print throttle1: throttle1.test.d
throttle1('throttle1.test.a');
throttle1('throttle1.test.b');
throttle1('throttle1.test.c');
throttle1('throttle1.test.d');

// Invoking on the leading edge of the timeout, but not more than once every 1 sec.
var throttle2 = _.throttle(p => console.log('throttle2:', p), 1000, {
  trailing: false
});
// print throttle2: throttle2.test.a
throttle2('throttle2.test.a');
throttle2('throttle2.test.b');

// Performs a deep comparison between two values to determine if they are equivalent.
var objIsEqual = { a: 1 };
var otherIsEqual = { a: 1 };
console.log('isEqual:', _.isEqual(objIsEqual, otherIsEqual)); // true
console.log('===:', objIsEqual === otherIsEqual); // false

function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}
function customizer(objValue, othValue) {
  if (isGreeting(objValue) && isGreeting(othValue)) {
    return true;
  }
}
var aryIsEqualWith = ['hello', 'goodbye'];
var otherIsEqualWith = ['hi', 'goodbye'];
console.log(
  'isEqualWith',
  _.isEqualWith(aryIsEqualWith, otherIsEqualWith, customizer)
); // true

var objIsMatch = { a: 1, b: 2 };
console.log('isMatch:', _.isMatch(objIsMatch, { b: 2 })); // true
console.log('isMatch:', _.isMatch(objIsMatch, { b: 1 })); // false
