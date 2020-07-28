console.log("process.env.NODE_ENV(main.js): " + process.env.NODE_ENV);

// // commomJS:
// var utils = require('./utils')
// console.log(utils.cal(30)) // 9
// console.log(utils.name) // hello


// // ES6:
import utils from './utils.js' // ES6 需明確給予副檔名
import padLeft from 'pad-left'
console.log(utils.cal(30))
console.log(utils.name)
console.log(padLeft('4', 4, 0))


// React:
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <h1>Hello, React!</h1>
            </div>
        );
    }
}

const divReact = document.createElement('div');
divReact.id = 'div_react';
ReactDOM.render(<App />, divReact);
document.body.appendChild(divReact);


// // import css:
// import '../css/style.css'
import '../css/style.scss'

// import image:
import jpgPig from '../img/pig.jpg'
const imgPig = new Image(100, 100);
imgPig.src = jpgPig;
const divPig = document.createElement('div');
divPig.id = 'divPig';
divPig.appendChild(imgPig);
document.body.appendChild(divPig);

// import xml:
import xmlData from '../data/data.xml'; // xmlData is object type
console.log(xmlData);
