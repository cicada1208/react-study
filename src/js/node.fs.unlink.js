const fs = require('fs'); // File System module
var strFile = 'test.txt'

// remove a file asynchronously
fs.unlink(strFile, (err) => {
  if (err) throw err;
  console.log('file was deleted');
});
