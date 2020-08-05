const fs = require('fs'); // File System module
var strFile = __dirname + '/node.fs.txt';

// append data to a file asynchronously,
// creating the file if it does not yet exist.
fs.appendFile(strFile, 'data to append\n', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

// open then append
fs.open(strFile, 'a', (err, fd) => {
  if (err) throw err;
  fs.appendFile(fd, 'data2 to append\n', 'utf8', (err) => {
    // the file descriptor will not be closed automatically
    fs.close(fd, (err) => {
      if (err) throw err;
    });
    if (err) throw err;
  });
});
