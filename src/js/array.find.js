let items = [
  ['2', 'a'],
  ['1', 'a'],
];

console.log(
  'find:',
  items.find((iten) => iten[1] === 'a')
); // find: [ '2', 'a' ]

console.log(
  'filter:',
  items.filter((item) => item[1] === 'a')
); // filter: [ [ '2', 'a' ], [ '1', 'a' ] ]
