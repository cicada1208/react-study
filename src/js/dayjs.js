const dayjs = require('dayjs');
require('dayjs/locale/zh-tw'); // 导入本地化语言
const customParseFormat = require('dayjs/plugin/customParseFormat'); // 导入插件
const minMax = require('dayjs/plugin/minMax');

dayjs.extend(customParseFormat); // 使用插件
dayjs.extend(minMax);
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

console.log('year:', dayjs().get('year'));
console.log('month:', dayjs().get('month'));
console.log('date:', dayjs().get('date'));

// 需使用插件 minMax
console.log(
  'max:',
  dayjs
    .max(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))
    .format('YYYY-MM-DD HH:mm:ss')
);
console.log(
  'min:',
  dayjs
    .min([dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01')])
    .format('YYYY-MM-DD HH:mm:ss')
);
