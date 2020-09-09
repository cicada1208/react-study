// React:

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Route, Link } from "react-router-dom"
import TbTodo from './react.tb.todo.js'
import { Clock, Clocks } from './react.clock.js'
import jpgPig from '../img/pig.jpg'


// React Element: 是單純的 object，與瀏覽器的 DOM Element 不同，很容易被建立。
// Component 由 Element 組成。
const time = new Date().toLocaleTimeString()
// const element = (<div>React Element {time}</div>)
const element = <div>React Element test {time}</div>

const divReactEx = document.createElement('div')
divReactEx.id = 'divReactEx'
document.body.appendChild(divReactEx)

// React DOM 負責更新 DOM 來符合 React Element。
ReactDOM.render(
    element,
    divReactEx
)


// React Component 撰寫的兩種方式:
// 1. Class Component: stateful component
// 可進行較複雜操作和元件生命週期控制，較耗資源
class Home extends React.Component {
    // render 是 Class Component 唯一必須的方法
    render() {
        return (
            <div>
                <div>Class Component test</div>
                <img width='100' src={jpgPig} />
                <ul>
                    {/* Link 組件需置於 HashRouter, BrowserRouter 組件中 */}
                    <li><Link to="/todo">Todo</Link ></li>
                    <li><Link to="/clock">Clock</Link ></li>
                    <li><Link to="/users/1">Users1</Link ></li>
                    <li><Link to="/users/2">Users2</Link ></li>
                    <li><Link to="/render1">render1</Link ></li>
                    <li><Link to="/render2">render2</Link ></li>
                    <li><Link to="/render3">render3</Link ></li>
                </ul>
                {/* {this.props.children} 對應的 component，例如：TbTodo，v5還有此用法嗎? */}
            </div>
        )
    }
}

class Users extends React.Component {
    render() {
        // this.props.match.params.userId: 取得網址上的參數
        // <Route path="/users/:userId" component={Users} />
        const id = this.props.match.params.userId
        return (
            <div>
                user id: {id}
            </div>
        )
    }
}


// 2. Function Component: stateless component
// 單純 render UI，沒有內部狀態、實作物件、ref和生命週期方法，有較好效能
// 使用 arrow function 設計 Functional Component 讓 UI 設計更單純(f(D) => UI)，減少副作用
// const Render2 = () => {
//     return (
//         <div>Function Component test</div>
//     )
// }
const Render2 = (props) => (
    <div>Function Component test2 {props.value}</div>
)

function Render2Parent() {
    return (
        <div>
            {/* props 唯讀 */}
            <Render2 value="props value1" />
            <Render2 value="props value2" />
        </div>
    )
}

const divReactEx2 = document.createElement('div')
divReactEx2.id = 'divReactEx2'
document.body.appendChild(divReactEx2)

// component 字首須大寫，React 將小寫開頭的組件視為原始 DOM 標籤，
// <div /> 視為 HTML 的 div 標籤，
// <Render2Parent /> 視為 component，且需在作用域中使用。
ReactDOM.render(
    <Render2Parent />,
    divReactEx2
)


function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        alert('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    );
}


const divReactEx3 = document.createElement('div')
divReactEx3.id = 'divReactEx3'
document.body.appendChild(divReactEx3)

// <Route path="/" component={Home} />:
// 此為非嚴格匹配，無論訪問什麼路徑，都會包含path="/"，故都會匹配到。

// <Route component={Home} />:
// 無指定 path，無論訪問什麼路徑，都會匹配到。結果同 <Route path="/" component={Home} />。

// <Route exact path="/" component={Home} />:
// 此為嚴格匹配，訪問根路徑 http://localhost:8008/ 才會匹配到。

// <Route path="/todo" component={TbTodo} />:
// 瀏覽器地址輸入 http://localhost:8008/todo，React Router 匹配到，會在當前位置渲染對應的 component，
// 相當於將 component TbTodo 內容替換掉 <Route path="/todo" component={TbTodo} /> 這行，
// 其他未匹配到的 Route 則刪去。
ReactDOM.render(
    <HashRouter>
        <Route path="/" component={Home} />
        <Route path="/todo" component={TbTodo} />
        <Route path="/clock" component={Clocks} />
        <Route path="/users/:userId" component={Users} />
        <Route path="/render1" render={() => { return <div>Function Component test1</div> }} />
        <Route path="/render2" render={Render2} />
        <Route path="/render3" render={ActionLink} />
    </HashRouter>,
    divReactEx3
)
