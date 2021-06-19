const moment = require('moment');

// moment.locale('zh-tw');
console.log('區域:', moment.locale());
console.log('Now:', moment().format('YYYY/MM/DD HH:mm:ss'));
console.log('Yesterday:', moment().subtract(1, 'days').format('YYYY/MM/DD'));
console.log('Tomorrow:', moment().add(1, 'days').format('YYYY/MM/DD'));
console.log('Parse:', moment('19861208', 'YYYYMMDD').format('YYYY/MM/DD'));

// 閏年 2012/02/29 轉民國年?
console.log(
  '閏年:',
  moment('2012/02/29', 'YYYY/MM/DD').add(-1911, 'years').format('YYYY/MM/DD')
);
