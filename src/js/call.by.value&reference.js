// call by value, call by reference ＆ call by sharing:
// primitive types: string, number, boolean, null, undefined, bigint, symbol
// object: primitive type 以外的，例如 array, function, map...
// primitive types is call by value
// object is call by reference or call by sharing(一種說法)
// javascript 只有 call by value(與C++定義來比較)

console.log('call by reference or by sharing ex1:');
function add(obj) {
  // 此行為跟 call by reference 一樣
  obj.number++;
}
var o = { number: 10 };
add(o);
console.log(o.number); // 11

console.log('call by reference or by sharing ex2:');
function add2(obj) {
  // 如果在 function 裡把 obj 重新賦值(指向)，代表要讓這個 obj 指向一個新的 object，
  // 所以外面的 o2 依舊是原來的值
  obj = {
    // eslint-disable-next-line no-unused-vars
    number: obj.number + 1
  };
}
var o2 = { number: 10 };
add2(o2);
console.log(o2.number); // 10

console.log('ex3:');
function run(a) {
  arguments[0] = { name: 'run' }; // 同 a = { name: 'run' }
  console.log('a:', a); // a: { name: 'run' }
  // arguments[0].name = 'run'
}
var obj = { name: 'obj' };
run(obj);
console.log('obj:', obj); // obj: { name: 'obj' }

console.log('ex4:');
var ref1 = [1];
var ref2 = ref1;
ref1.push(2);
console.log('ref1:', ref1); // [1, 2]
console.log('ref2:', ref2); // [1, 2]
// == 和 ===，對於 object 比較的是址(reference)而非值(value)
console.log('ref1 === ref2:', ref1 === ref2); // true
var arr1 = ['Hi!'];
var arr2 = ['Hi!'];
console.log('arr1 === arr2:', arr1 === arr2); // false
// 比較 object 內容是否相同，可轉換成 string 比較
var arr1str = JSON.stringify(arr1);
var arr2str = JSON.stringify(arr2);
console.log('arr1str === arr2str:', arr1str === arr2str); // true
