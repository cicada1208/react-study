const fs = require('fs'); // File System module
var strFile = 'test.txt'

// open a file asynchronously
fs.open(strFile, 'r', (err, fd) => {
  if (err) throw err;

  // provide infor about a file
  fs.fstat(fd, (err, stats) => {
    if (err) throw err;
    console.log('stats:' + JSON.stringify(stats));
    console.log('isDirectory:' + stats.isDirectory());
    console.log('isFile:' + stats.isFile());

    // the file descriptor will not be closed automatically
    // always close the file descriptor asynchronously
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
});
