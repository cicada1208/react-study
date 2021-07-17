// webpack bundle ES6:

// ES6 module:
// 該 App 各個地方所 import 的 es6.utils 其內的資料/函式都是同一份
import utils, {
  utils_x,
  utils_a,
  utils_y,
  utils_z,
} from './webpack.es6.utils.js'; // ES6 自定義需明確給予副檔名
// import padLeft from 'pad-left' // node_modules 不需副檔名

// utils_x = 'test'; // utils_x is read-only, 報錯 utils_x is not defined。
console.log('utils_a', utils_a);
utils_a.text = 'a be modified'; // object property 值可修改
utils_a.id = 2;
console.log('utils_a', utils_a);
// utils_a = { text: 'a be modified 2', id: 1 }; // utils_a is read-only

// run in browser
// import css:
// import '../css/style.css'
import '../css/style.scss';
import style2 from '../css/style2.module.scss'; // CSS Modules

const divWebpackES6 = document.createElement('div');
// divWebpackES6.id = 'divWebpackES6'
divWebpackES6.id = style2.divWebpackES6;
divWebpackES6.innerText = `${
  utils.name
} ${utils.prt()} ${utils_x} ${utils_y()} ${utils_z}`;
document.body.appendChild(divWebpackES6);

// import image:
import jpgPig from '../img/pig.jpg';
const imgPig = new Image(100, 100);
imgPig.src = jpgPig;
const divPig = document.createElement('div');
divPig.appendChild(imgPig);
divWebpackES6.appendChild(divPig);

// import xml:
import xmlData from '../data/data.xml'; // xmlData is object type
const divXml = document.createElement('div');
divXml.innerText = JSON.stringify(xmlData);
divWebpackES6.appendChild(divXml);
