// 將陣列內元素全部加總
var arr = [1, 2, 3];
var sum = arr.reduce(
  (previousValue, currentValue) => previousValue + currentValue
);
console.log(sum); // 6
