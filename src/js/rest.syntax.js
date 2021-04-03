// rest syntax:
// allows a function to accept an indefinite number of arguments as an array.
// only the last parameter in a function definition can be a rest parameter(...restParas).
function sum(x, y, ...restParas) {
  console.log('x:', x);
  console.log('y:', y);
  console.log('restParas:', restParas);
  return restParas.reduce((previous, current) => {
    return previous + current;
  });
}

console.log(sum(1, 2, 3, 4, 5));
// x: 1
// y: 2
// restParas: [3, 4, 5]
// 12

const obj = { x: 1, y: 2, z: 3, a: 4, b: 5 };

function func2({ a, b, c, x }) {
  console.log('abcx:', a, b, c, x); // abcx: 4 5 undefined 1
}

function func1({ x, y, z, ...rest }) {
  console.log('xyz:', x, y, z); // xyz: 1 2 3
  console.log('a:', rest.a); // a: 4
  func2({ ...rest, x }); // spread syntax
}

func1(obj);
