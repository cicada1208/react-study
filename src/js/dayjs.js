const dayjs = require('dayjs');
require('dayjs/locale/zh-tw'); // 导入本地化语言
const customParseFormat = require('dayjs/plugin/customParseFormat'); // 导入插件
const isLeapYear = require('dayjs/plugin/isLeapYear');

dayjs.extend(customParseFormat); // 使用插件
dayjs.extend(isLeapYear);
dayjs.locale('zh-tw'); // 使用本地化语言

console.log(dayjs().format('YYYY/MM/DD HH:mm:ss')); // now
console.log(dayjs('2018/04/13 19:18').format('YYYY-MM-DD HH:mm:ss')); // 2018-04-13 19:18:00

// 使用已知格式解析日期，需使用插件 customParseFormat
console.log(dayjs('20180304', 'YYYYMMDD').format('YYYY-MM-DD')); // 2018-03-04
console.log(
  dayjs('2018 三月 15', 'YYYY MMMM DD', 'zh-tw').format('YYYY-MM-DD') // 2018-03-15
);

// 格式是其中一種
console.log(
  dayjs('2012-05-28 10:21:15', [
    'YYYY',
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss'
  ]).format('YYYY-MM-DD HH:mm:ss')
); // not strict: 2012-01-01 00:00:00
console.log(
  dayjs(
    '2012-05-28 10:21:15',
    ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'],
    true
  ).format('YYYY-MM-DD HH:mm:ss')
); // strict: 2012-05-28 10:21:15
// 嚴格校驗須提供 format & strict
