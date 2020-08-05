const fs = require('fs'); // File System module
let strFile = __dirname + '/node.fs.txt';
var strText = "test input.";

// Asynchronously writes a file
fs.writeFile(strFile, strText, 'utf-8', (err) => {
    if (err) throw err;
    console.log('The file has been writed!');

    // Asynchronously reads a file
    fs.readFile(strFile, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
});
