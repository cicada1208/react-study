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
            <h1>react.ex</h1>
        );
    }
}

const divReactEx = document.createElement('div');
divReactEx.id = 'divReactEx';
ReactDOM.render(<App />, divReactEx);
document.body.appendChild(divReactEx);
