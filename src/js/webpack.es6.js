// webpack bundle ES6:

// ES6 module:
import utils, { utils_x, utils_y, utils_z } from './webpack.es6.utils.js' // ES6 自定義需明確給予副檔名
// import padLeft from 'pad-left' // node_modules 不需副檔名

// run in browser
// import css:
// import '../css/style.css'
import '../css/style.scss'
import style2 from '../css/style2.module.scss' // CSS Modules

const divWebpackES6 = document.createElement('div')
// divWebpackES6.id = 'divWebpackES6'
divWebpackES6.id = style2.divWebpackES6
divWebpackES6.innerText = `${utils.name} ${utils.prt()} ${utils_x} ${utils_y()} ${utils_z}`
document.body.appendChild(divWebpackES6)

// import image:
import jpgPig from '../img/pig.jpg'
const imgPig = new Image(100, 100)
imgPig.src = jpgPig
const divPig = document.createElement('div')
divPig.appendChild(imgPig)
divWebpackES6.appendChild(divPig)

// import xml:
import xmlData from '../data/data.xml' // xmlData is object type
const divXml = document.createElement('div')
divXml.innerText = JSON.stringify(xmlData)
divWebpackES6.appendChild(divXml)
