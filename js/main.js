// // commomJS:
// var utils = require('./utils')
// console.log(utils.cal(30)) // 9
// console.log(utils.name) // hello

// // ES6:
// import utils from './utils.js'
// import pad from './node_modules/pad-left/index.js'
// console.log(utils.cal(30))
// console.log(utils.name)
// console.log(pad('4', 4, 0))

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
                <h1>Hello, World!</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('div_react'));
