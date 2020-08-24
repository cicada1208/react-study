// React:

import React from 'react';
import ReactDOM from 'react-dom';
import jpgPig from '../img/pig.jpg';

class App2 extends React.Component {
    constructor(props) {
        super(props);
        // state 是每個元件裡面的狀態，可想成是資料，之後可在 render 裡取出 this.state
        this.state = {
        };
    }
    // 若使用 this.setState 等方式改變 state，便會重新呼叫一次 render 函式，只要資料改變，畫面就跟著改變
    // this.props: 父子元件透過此來溝通傳資料
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
ReactDOM.render(<App2 />, divReactEx);
document.body.appendChild(divReactEx);

import App from './react.app.js';

const divReactEx2 = document.createElement('div');
divReactEx2.id = 'divReactEx2';
ReactDOM.render(
    <App />,
    divReactEx2
);
document.body.appendChild(divReactEx2);
