const fs = require('fs'); // File System module
var strFile = 'test.txt'

// rename a file asynchronously
fs.rename(strFile, strFile, (err) => {
  if (err) throw err;
  console.log('renamed complete');

  // provide infor about a file
  // fs.rename是異步執行,
  // fs.stat移至callback內才能確保於更名後執行
  fs.stat(strFile, (err, stats) => {
    if (err) throw err;
    console.log('stats:' + JSON.stringify(stats));
  });
});
