// // commomJS:
// var utils = require('./utils')
// console.log(utils.cal(30)) // 9
// console.log(utils.name) // hello


// // ES6:
// import utils from './utils.js' // ES6 需明確給予副檔名
// import pad from 'pad-left'
// console.log(utils.cal(30))
// console.log(utils.name)
// console.log(pad('4', 4, 0))


// React:
import React from 'react';
import ReactDom from 'react-dom';

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

const elt_div_react = document.createElement('div');
elt_div_react.id = 'div_react';
document.body.appendChild(elt_div_react);
ReactDom.render(<App />, document.getElementById('div_react'));


// import images:
import jpgPig from '../img/pig.jpg'
const elt_div_jpg_pig = document.createElement('div');
elt_div_jpg_pig.id = 'div_jpg_pig';
const imgPig = new Image(100, 100);
imgPig.src = jpgPig;
elt_div_jpg_pig.appendChild(imgPig);
document.body.appendChild(elt_div_jpg_pig);
