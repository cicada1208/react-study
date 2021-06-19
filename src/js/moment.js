const moment = require('moment-taiwan');

// 設定區域:
// moment.locale('zh-tw');
console.log('區域:', moment.locale());
console.log('now:', moment().format('YYYY/MM/DD HH:mm:ss'));
console.log('yesterday:', moment().subtract(1, 'days').format('YYYY/MM/DD'));
console.log('tomorrow:', moment().add(1, 'days').format('YYYY/MM/DD'));
console.log('parse:', moment('19861208', 'YYYYMMDD').format('YYYY/MM/DD'));

// moment().valueOf() === new Date().getTime()
console.log(
  'timestamp format:',
  moment(moment().valueOf()).format('YYYY-MM-DDTHH:mm:ss.SSS')
);

console.log(
  'isBetween:',
  moment('2021-01-02').isBetween('2021-01-01', '2021-01-03', undefined, '[]')
); // true

// isSame 傳入第二參數 month 將檢查 month 和 year
console.log('isSame:', moment('2010-10-01').isSame('2010-10-02', 'month')); // true

let ary = [
  { name: 'A', date: '11.12.1996' },
  { name: 'B', date: '12.12.1989' },
  { name: 'C', date: '5.01.1993' },
];
var aryMoment = ary.map((item) => moment(item.date, 'DD.MM.YYYY'));
console.log('max date:', moment.max(aryMoment).format('YYYY/MM/DD')); // 1996/12/11

// 閏年 2012/02/29 轉民國年
console.log(
  '轉民國年:',
  moment('2012/02/29', 'YYYY/MM/DD').format('YYYY/MM/DD [is] tYY/MM/DD')
);
