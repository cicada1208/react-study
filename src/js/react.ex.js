// React:

import React from 'react';
import ReactDOM from 'react-dom';
import jpgPig from '../img/pig.jpg';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>react.ex</h1>
                <img width='100' src={jpgPig} />
            </div>
        );
    }
}

const divReactEx = document.createElement('div');
divReactEx.id = 'divReactEx';
ReactDOM.render(<App />, divReactEx);
document.body.appendChild(divReactEx);


import TodoTb from './react.todo.tb.js';

const divReactEx2 = document.createElement('div');
divReactEx2.id = 'divReactEx2';
ReactDOM.render(<TodoTb />, divReactEx2);
document.body.appendChild(divReactEx2);
