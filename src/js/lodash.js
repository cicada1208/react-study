const _ = require('lodash');

let objDifference1 = { a: 'a' };
let objDifference2 = objDifference1;
console.log(
  'difference:',
  _.difference([objDifference1, 1], [2, objDifference2])
); // [ 1 ]

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

var objMaxBy = [
  { m: 9, n: 1 },
  { m: 7, n: 2 }
];
console.log(
  'maxBy:',
  _.maxBy(objMaxBy, o => o.m + o.n)
); // { m: 9, n: 1 }
console.log('maxBy:', _.maxBy(objMaxBy, 'n')); // { m: 7, n: 2 }

var objHas = { a: { b: undefined } };
console.log('has:', _.has(objHas, 'a.b')); // true

var objInvert = { a: 1, b: 2, c: 1 };
console.log('invert:', _.invert(objInvert)); // { '1': 'c', '2': 'b' }

var objInvertBy = { a: 1, b: 2, c: 1 };
console.log(
  'invertBy:',
  _.invertBy(objInvertBy, function (value) {
    return 'group' + value;
  })
); // { 'group1': ['a', 'c'], 'group2': ['b'] }

function ClassKeys() {
  this.a = 1;
  this.b = 2;
}
ClassKeys.prototype.c = 3;
console.log('keys:', _.keys(new ClassKeys())); // ['a', 'b'] (iteration order is not guaranteed)
console.log('keysIn:', _.keysIn(new ClassKeys())); // ['a', 'b', 'c'] (iteration order is not guaranteed)

console.log('values:', _.values(new ClassKeys())); // [ 1, 2 ]
console.log('valuesIn:', _.valuesIn(new ClassKeys())); // [ 1, 2, 3 ]

console.log(
  'mapKeys:',
  _.mapKeys({ a: 1, b: 2 }, function (value, key) {
    return key + value;
  })
); // { 'a1': 1, 'b2': 2 }

var objMapValues = {
  fred: { id: 'A001', age: 40 },
  pebbles: { id: 'B002', age: 1 }
};
console.log(
  'mapValues:',
  _.mapValues(objMapValues, o => `id=${o.id} is ${o.age} years old.`)
);
// {
//   fred: 'id=A001 is 40 years old.',
//   pebbles: 'id=B002 is 1 years old.'
// } (iteration order is not guaranteed)
console.log('mapValues:', _.mapValues(objMapValues, 'age')); // { 'fred': 40, 'pebbles': 1 }

var users = [
  { user: 'barney', age: 36 },
  { user: 'pebbles', age: 1 }
];
var youngest = _.chain(users)
  .sortBy('age')
  .map(u => u.user + ' is ' + u.age)
  .head()
  .value();
console.log('chain:', youngest); // 'pebbles is 1'

console.log(
  'camelCase:',
  _.camelCase('Foo Bar'),
  _.camelCase('--foo-bar--'),
  _.camelCase('__FOO_BAR__')
); // fooBar fooBar fooBar

console.log(
  'kebabCase:',
  _.kebabCase('Foo Bar'),
  _.kebabCase('fooBar'),
  _.kebabCase('__FOO_BAR__')
); // foo-bar foo-bar foo-bar

console.log(
  'snakeCase:',
  _.snakeCase('Foo Bar'),
  _.snakeCase('fooBar'),
  _.snakeCase('--FOO-BAR--')
); // foo_bar foo_bar foo_bar

console.log(
  'lowerCase:',
  _.lowerCase('Foo Bar'),
  _.lowerCase('fooBar'),
  _.lowerCase('__FOO_BAR__')
); // foo bar foo bar foo bar

console.log(
  'upperCase:',
  _.upperCase('--foo-bar'),
  _.upperCase('fooBar'),
  _.upperCase('__foo_bar__')
); // FOO BAR FOO BAR FOO BAR

console.log(
  'startCase:',
  _.startCase('--foo-bar--'),
  _.startCase('fooBar'),
  _.startCase('FOO BAR')
); // Foo Bar Foo Bar FOO BAR

console.log('capitalize:', _.capitalize('FRED TED')); // Fred ted

console.log('lowerFirst:', _.lowerFirst('FRED TED')); // fRED TED

console.log('upperFirst:', _.upperFirst('fred ted')); // Fred ted

console.log('startsWith:', _.startsWith('abc', 'b', 1)); // true

console.log('endsWith:', _.endsWith('abc', 'b', 2)); // true

console.log('pad:', _.pad('abc', 8, '#&')); // #&abc#&#

console.log('trim:', _.trim('-_-abc-_-', '_-')); // abc

console.log(
  'truncate:',
  _.truncate('hi-diddly-ho there, neighborino', {
    length: 24,
    separator: /,? +/
  })
); // 'hi-diddly-ho there...'

let line = 'fred, barney, & pebbles';
console.log('words:', _.words(line, /[^, ]+/g));
// 結果同 line.match(/[^, ]+/g)
// [ 'fred', 'barney', '&', 'pebbles' ]

var condFunc = _.cond([
  [_.matches({ a: 1 }), _.constant('matches A')],
  [_.conforms({ b: _.isNumber }), _.constant('matches B')],
  [_.stubTrue, _.constant('no match')]
]);
console.log('cond:', condFunc({ a: 1, b: 2 })); // 'matches A'
console.log('cond:', condFunc({ a: 0, b: 1 })); // 'matches B'
console.log('cond:', condFunc({ a: '1', b: '2' })); // 'no match'

console.log(
  'conforms:',
  _.filter(
    [
      { a: 2, b: 1 },
      { a: 1, b: 2 }
    ],
    _.conforms({ b: n => n > 1 })
  )
); // [ { a: 1, b: 2 } ]

var constInvokeTimes = _.times(2, _.constant({ a: 1 }));
console.log('time:', constInvokeTimes); // [ { a: 1 }, { a: 1 } ]
console.log('constant:', constInvokeTimes[0] === constInvokeTimes[1]); // true

function square(n) {
  return n * n;
}
var addSquare = _.flow([_.add, square]);
console.log('flow:', addSquare(1, 2)); // 9

let objMixinDes = { f1: () => console.log('mixin:', 'f1') };
function objMixinSrc() {
  this.fa = () => console.log('mixin:', 'fa');
  this.fb = () => console.log('mixin:', 'fb');
}
objMixinSrc.prototype.fc = () => console.log('mixin:', 'fc');
_.mixin(objMixinDes, new objMixinSrc());
objMixinDes.fa(); // fa
objMixinDes.fb(); // fb
// objMixinDes.fc(); // exception
