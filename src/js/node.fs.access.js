const fs = require('fs'); // File System module
var strFile = 'test.txt'

// check if the file exists
fs.access(strFile, fs.constants.F_OK, (err) => {
  console.log(`${strFile} ${err ? 'does not exist' : 'exists'}`);
});

// check if the file is readable
fs.access(strFile, fs.constants.R_OK, (err) => {
  console.log(`${strFile} ${err ? 'is not readable' : 'is readable'}`);
});

// check if the file is writable
fs.access(strFile, fs.constants.W_OK, (err) => {
  console.log(`${strFile} ${err ? 'is not writable' : 'is writable'}`);
});

// check if the file exists, and if it is writable
fs.access(strFile, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(
      `${strFile} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
  } else {
    console.log(`${strFile} exists, and it is writable`);
  }
});

