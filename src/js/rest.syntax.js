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

console.log(sum(1, 2, 3, 4, 5)); // x: 1, y: 2, restParas: [ 3, 4, 5 ], 12
