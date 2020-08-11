const fs = require('fs'); // File System module
let strFile = __dirname + '/node.fs.txt';
var strText = "test input.";

// asynchronously write file
fs.writeFile(strFile, strText, 'utf-8', (err) => {
    if (err) throw err;
    console.log('asynchronously write file done.');

    // readFile or readFileSync 放在 writeFile 的 callback function, 確保寫完後再讀取
    // asynchronously read file
    fs.readFile(strFile, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log('asynchronously read file:', data);
    });

    // // synchronously read file
    // strText = fs.readFileSync(strFile, { encoding: 'utf8' })
    // console.log('synchronously read file:', strText)
});
