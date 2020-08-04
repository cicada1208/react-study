const path = require('path');
console.log('當前文件所在絕對路徑:', __dirname);


// path.join：使用平台特定分隔符[Unix系統是/，Windows系統是\]
// 把全部給定的路徑片段連接一起，若任一路徑片段類型錯誤會報錯
const path1 = path.join(__dirname, '/foo');
// /Users/cicadawang/Documents/筆記/Web/Src/foo
const path2 = path.join(__dirname, './foo/bar');
// /Users/cicadawang/Documents/筆記/Web/Src/foo/bar
const path3 = path.join('/foo', 'bar', '/baz/apple', 'aaa', '..');
// /foo/bar/baz/apple 
// ..表回上層
const path4 = path.join('foo', 'bar', 'baz');
// foo/bar/baz
const path5 = path.join('foo', 'bar', '..', '..');
// .
// 如果連接後的路徑是一長度為零的字符串，則返回'.'，表當前工作目錄


// path.resolve：把全部給定的路徑片段解析為一個絕對路徑
const path6 = path.resolve('/a/b', '/c/d');
// /c/d
const path7 = path.resolve('/a/b', 'c/d');
// /a/b/c/d
const path8 = path.resolve('/a/b', '../c/d');
// /a/c/d
const path9 = path.resolve('a', 'b');
// /Users/cicadawang/Documents/筆記/Web/Src/a/b
const path10 = path.resolve('www', 'static', '../public', 'src', '..');
// resolve把'／'當成根目錄
// 其處理方式類似對這些路徑逐一進行cd操作，不同的是，路徑片段可以是文件，且不必實際存在
// cd www  /Users/xiao/work/test/www
// cd static /Users/xiao/work/test/www/static
// cd ../public /Users/xiao/work/test/www/public
// cd src /Users/xiao/work/test/www/public/src
// cd .. /Users/xiao/work/test/www/public


// 區別：
// join把各個路徑片段連接在一起， resolve把'／'當成根目錄
path.join('/a', '/b'); // /a/b
path.resolve('/a', '/b'); // /b
// resolve在傳入非/路徑時，會自動加上當前目錄形成一個絕對路徑，而join僅用於路徑拼接
// 當前路徑為/Users/xiao/work/test
path.join('a', 'b', '..', 'd'); // a/d
path.resolve('a', 'b', '..', 'd'); // /Users/xiao/work/test/a/d
