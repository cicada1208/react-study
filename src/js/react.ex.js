// React:

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Route, Link } from "react-router-dom"
import TodoTb from './react.todo.tb.js'
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


// React Component 撰寫的主要兩種方式:
// 1. Class Component: 可進行較複雜操作和元件生命週期控制，相對於 stateless components 耗資源
class Home extends React.Component {
    // render 是 Class based 元件唯一必須的方法
    render() {
        return (
            <div>
                <div>Class Component test</div>
                <img width='100' src={jpgPig} />
                <ul>
                    {/* Link 組件需置於 HashRouter, BrowserRouter 組件中 */}
                    <li><Link to="/todo">Todo</Link ></li>
                    <li><Link to="/users/1">Users1</Link ></li>
                    <li><Link to="/users/2">Users2</Link ></li>
                    <li><Link to="/render1">render1</Link ></li>
                    <li><Link to="/render2">render2</Link ></li>
                </ul>
                {/* {this.props.children} 對應的 component，例如：TodoTb，v5還有此用法嗎? */}
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


// 2. Function Component: 單純地 render UI 的 stateless components
// 沒有內部狀態、沒有實作物件和 ref，沒有生命週期函數
// 若非需要控制生命週期的話建議多使用 stateless components 獲得較好的效能
// 使用 arrow function 來設計 Functional Component 讓 UI 設計更單純（f(D) => UI），減少副作用（side effect）
// const Render2 = () => {
//     return (
//         <div>Function Component test</div>
//     )
// }
const Render2 = (props) => (
    <div>Function Component test {props.value}</div>
)

function Render2Parent() {
    return (
        <div>
            {/* props 是唯讀的 */}
            <Render2 value="props value1" />
            <Render2 value="props value2" />
        </div>
    )
}

const divReactEx2 = document.createElement('div')
divReactEx2.id = 'divReactEx2'
document.body.appendChild(divReactEx2)

// Component 字首須為大寫，React 將小寫字母開頭的組件視為原始 DOM 標籤，
// 舉例來說，<div /> 會被視為是 HTML 的 div 標籤，
// 但是 <Render2 /> 則視為 component，且需在作用域中使用 Render2。
ReactDOM.render(
    <Render2Parent />,
    divReactEx2
)


const divReactEx3 = document.createElement('div')
divReactEx3.id = 'divReactEx3'
document.body.appendChild(divReactEx3)

// <Route path="/" component={Home} />:
// 此為非嚴格匹配，無論訪問什麼路徑，都會包含path="/"，故都會匹配到。

// <Route component={Home} />:
// 無指定 path，無論訪問什麼路徑，都會匹配到。結果同 <Route path="/" component={Home} />。

// <Route exact path="/" component={Home} />:
// 此為嚴格匹配，訪問根路徑 http://localhost:8008/ 才會匹配到。

// <Route path="/todo" component={TodoTb} />:
// 瀏覽器地址輸入 http://localhost:8008/todo，React Router 匹配到，會在當前位置渲染對應的 component，
// 相當於將 component TodoTb 內容替換掉 <Route path="/todo" component={TodoTb} /> 這行，
// 其他未匹配到的 Route 則刪去。
ReactDOM.render(
    <HashRouter>
        <Route path="/" component={Home} />
        <Route path="/todo" component={TodoTb} />
        <Route path="/users/:userId" component={Users} />
        <Route path="/render1" render={() => { return <div>render1 test</div> }} />
        <Route path="/render2" component={Render2} />
    </HashRouter>,
    divReactEx3
)
