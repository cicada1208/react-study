// 將陣列內元素全部加總
var arr = [1, 2, 3];
var sum = arr.reduce((accumulator, currentValue) => {
  return (accumulator += currentValue);
});
console.log(sum); // 6
