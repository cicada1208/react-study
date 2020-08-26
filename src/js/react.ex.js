// React:

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Route, Link } from "react-router-dom";
import TodoTb from './react.todo.tb.js';
import jpgPig from '../img/pig.jpg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>react.ex</h1>
                <img width='100' src={jpgPig} />
                <ul>
                    {/* Link 組件需置於 HashRouter 組件中 */}
                    <li><Link to="/todo">Todo</Link></li>
                    <li><Link to="/users/1">Users 1</Link></li>
                    <li><Link to="/users/2">Users 2</Link></li>
                </ul>
                {this.props.children} {/* 對應的 component，例如：TodoTb */}
            </div>
        );
    }
}

class Users extends React.Component {
    render() {
        const id = this.props.match.params.userId;
        return (
            <div>
                user id: {id}
            </div>
        )
    }
}

const divReactEx = document.createElement('div');
divReactEx.id = 'divReactEx';
document.body.appendChild(divReactEx);

// <Route path="/" component={Home} />：
// 此為非嚴格匹配，無論訪問什麼路徑，都會包含path="/"，故都會匹配到。

// <Route exact path="/" component={Home} />：
// 此為嚴格匹配，訪問根路徑 http://localhost:8008/ 才會匹配到。

// <Route path="/todo" component={TodoTb} />：  
// 瀏覽器地址輸入 http://localhost:8008/todo，React Router 匹配到，會在當前位置渲染對應的 component，
// 相當於將 component TodoTb 內容替換掉 < Route path = "/todo" component = { TodoTb } /> 這行。
ReactDOM.render(
    <HashRouter>
        <Route path="/" component={Home} />
        <Route path="/todo" component={TodoTb} />
        <Route path="/users/:userId" component={Users} />
    </HashRouter>,
    divReactEx
);
