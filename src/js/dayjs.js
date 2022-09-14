const dayjs = require('dayjs');
require('dayjs/locale/zh-tw'); // 导入本地化语言
// const locale_zhTw = require('dayjs/locale/zh-tw');
// console.log(locale_zhTw);
const customParseFormat = require('dayjs/plugin/customParseFormat'); // 导入插件
const minMax = require('dayjs/plugin/minMax');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isBetween = require('dayjs/plugin/isBetween');
const isLeapYear = require('dayjs/plugin/isLeapYear');

dayjs.extend(customParseFormat); // 使用插件
dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(isLeapYear);
dayjs.locale('zh-tw'); // 使用本地化语言

console.log(dayjs().format('YYYY/MM/DD HH:mm:ss')); // now
console.log(
  dayjs('2018/04/13 19:18').format('[YYYY-MM-DD] YYYY-MM-DD HH:mm:ss')
); // YYYY-MM-DD 2018-04-13 19:18:00
console.log(dayjs('2019-01-25').toString()); // Thu, 24 Jan 2019 16:00:00 GMT
console.log(dayjs('2019-01-25').toISOString()); //2019-01-24T16:00:00.000Z
console.log(dayjs('2019-01-25').format()); // 2019-01-25T00:00:00+08:00
console.log(dayjs('2019-01-25').format('YYYY-MM-DD HH:mm:ss')); // 2019-01-25 00:00:00

console.log('year:', dayjs().get('year'));
console.log('month:', dayjs().get('month'));
console.log('date:', dayjs().get('date'));

// 当前月份包含的天数
console.log('daysInMonth:', dayjs('2022-09-15').daysInMonth()); // 30

// 使用已知格式解析日期: 需使用插件 customParseFormat
console.log(dayjs('20180304', 'YYYYMMDD').format('YYYY-MM-DD')); // 2018-03-04
console.log(
  dayjs('2018 三月 15', 'YYYY MMMM DD', 'zh-tw').format('YYYY-MM-DD') // 2018-03-15
);

// 為多種已知格式之一
console.log(
  dayjs('2012-05-28 10:21:15', [
    'YYYY',
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss'
  ]).format('YYYY-MM-DD HH:mm:ss')
); // not strict: 2012-01-01 00:00:00

// 嚴格校驗須提供 format & strict = true
console.log(
  dayjs(
    '2012-05-28 10:21:15',
    ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'],
    true
  ).format('YYYY-MM-DD HH:mm:ss')
); // strict: 2012-05-28 10:21:15

// add、subtract
console.log(
  'add、subtract:',
  dayjs('2019-01-25')
    .add(1, 'day')
    .subtract(2, 'year')
    .format('YYYY-MM-DD HH:mm:ss')
); // 2017-01-26 00:00:00

// diff: default is milliseconds
console.log('diff milliseconds:', dayjs('2019-01-10').diff('2018-12-10')); // 2678400000
// diff: month
console.log('diff month:', dayjs('2019-01-10').diff('2018-12-10', 'month')); // 1
// diff: minute with float
console.log(
  'diff minute with float:',
  dayjs('2019-01-10 00:00:50').diff('2019-01-10 00:00:20', 'minute', true)
); // 0.5

// min、max: 需使用插件 minMax
console.log(
  'min:',
  dayjs
    .min([dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01')])
    .format('YYYY-MM-DD HH:mm:ss')
);
console.log(
  'max:',
  dayjs
    .max(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))
    .format('YYYY-MM-DD HH:mm:ss')
);

// isBefore
console.log(dayjs('2011-02-01').isBefore('2011-02-02', 'month')); // false, compares month and year

// isSame
console.log(dayjs('2011-02-01').isSame('2011-02-01', 'date')); // true, compares month, year and date

// isAfter
console.log(dayjs().isAfter(dayjs('2011-01-01'))); // true, default is compares milliseconds

// isSameOrBefore: 需使用插件 isSameOrBefore
console.log(dayjs().isSameOrBefore('2022-01-02', 'year')); // true

// isSameOrAfter: 需使用插件 isSameOrAfter
console.log(dayjs().isSameOrAfter('2021-02-03', 'date')); // true

// isBetween: 需使用插件 isBetween
// 第四个参数是设置包容性。 [ 表示包含， ( 表示排除。
console.log(
  dayjs('2016-10-30').isBetween('2016-01-01', '2016-10-30', 'date', '[)')
); // false

// startOf
console.log(
  'startOf year:',
  dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss')
); // 2022-01-01 00:00:00

// endOf
console.log('endOf date:', dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss')); // 2022-09-14 23:59:59

// isLeapYear: 判斷闰年，需使用插件 isLeapYear
console.log('isLeapYear:', dayjs('2000-01-01').isLeapYear()); // true
