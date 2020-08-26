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
                    <li><Link to="/todo">Todo</Link></li>
                    <li><Link to="/users/1">Users 1</Link></li>
                    <li><Link to="/users/2">Users 2</Link></li>
                </ul>
                {this.props.children}
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
ReactDOM.render(
    <HashRouter>
        <Route path="/" component={Home} />
        <Route path="/todo" component={TodoTb} />
        <Route path="/users/:userId" component={Users} />
    </HashRouter>,
    divReactEx
);
