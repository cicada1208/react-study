// React:

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Route, Link } from "react-router-dom"
import TbTodo from './react.tb.todo.js'
import { Clock, Clocks } from './react.clock.js'
import jpgPig from '../img/pig.jpg'


const divReactEx = document.createElement('div')
divReactEx.id = 'divReactEx'
document.body.appendChild(divReactEx)
const divReactEx2 = document.createElement('div')
divReactEx2.id = 'divReactEx2'
document.body.appendChild(divReactEx2)


// React Element: 是單純的 object，與瀏覽器的 DOM Element 不同，容易被建立
const time = new Date().toLocaleDateString()
// const element = <div>React Element {time}</div>
const boolShow = true
const element = (
    <div>
        {
            // JavaScript:
            // true && expression 回傳 expression
            // false && expression 回傳 false
            boolShow && <div>{time}</div>
        }
        React Element test
    </div>
)
// React DOM 負責更新 DOM 來符合 React Element or React Component
ReactDOM.render(
    element,
    divReactEx
)


// React Component 撰寫的兩種方式:
// 1. Function Component: stateless component
// 單純 render UI，沒有內部狀態、實作物件、ref和生命週期方法，有較好效能
// const FCAF = (props) => (
//     <div>Function Component {props.value}</div>
// )
const FCAF = (props) => {
    return (
        <div>
            {!props.nshow ? <div>Function Component {props.value}</div> : null}
            {props.children}
            {props.bottom}
        </div>
    )
}

function FCAFS() {
    return (
        <div>
            {/* props: 唯讀，可為 primitive value、React element、function */}
            <FCAF nshow={false} value="props value1" />
            <FCAF nshow={true} value="props value2" >
                {/* 透過巢狀的 JSX 將任意的 props.children 傳遞給其他 component */}
                <div>Function Component props children</div>
            </FCAF>
            <FCAF nshow={true} bottom={<FCAF nshow={false} value="props value3" />} />
        </div>
    )
}

// component 字首須大寫，小寫開頭的組件視為原始 DOM tag，
// <div /> 視為 HTML div tag，
// <FCAFS /> 視為 component，且需在作用域中使用。
// ReactDOM.render(
//     <FCAFS />,
//     divReactEx
// )

function ClickLink() {
    function handleClick(e) {
        e.preventDefault(); // 避免瀏覽器預設行為(換頁)
        window.alert('The link was clicked.');
    }

    // 事件名稱: 在 React 是 camelCase；在 HTML DOM 是小寫。
    // 事件的值: 在 JSX 是 function；在 HTML DOM 是 string。
    // HTML範例: <button onclick="handleClick()">
    return (
        // HTML範例: <a href="#" onclick="window.alert('The link was clicked.'); return false"></a>
        // 在 React 需使用 preventDefault 達成此功能
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    );
}


// 2. Class Component: stateful component
// 可進行較複雜操作和元件生命週期控制，較耗資源
// Component 由 Element 組成
class User extends React.Component {
    render() {
        // this.props.match.params.userId: 取得網址上的參數
        // <Route path="/user/:userId" component={User} />
        const id = this.props.match.params.userId
        return (
            <div>
                user id: {id}
            </div>
        )
    }
}

class Home extends React.Component {
    // render 是 Class Component 唯一必須的方法
    render() {
        return (
            <div>
                <div>React Component test</div>
                <img width='100' src={jpgPig} />
                <ul>
                    {/* Link 組件需置於 HashRouter, BrowserRouter 組件中 */}
                    <li><Link to="/todo">todo</Link ></li>
                    <li><Link to="/clocks">clocks</Link ></li>
                    <li><Link to="/user/1">user1</Link ></li>
                    <li><Link to="/user/2">user2</Link ></li>
                    <li><Link to="/fcraf">fcraf</Link ></li>
                    <li><Link to="/fcaf">fcaf</Link ></li>
                    <li><Link to="/fcafs">fcafs</Link ></li>
                    <li><Link to="/clicklink">clicklink</Link ></li>
                </ul>
                {/* {this.props.children} 對應的 component，例如：TbTodo，? */}
            </div>
        )
    }
}

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
        <Route path="/clocks" component={Clocks} />
        <Route path="/user/:userId" component={User} />
        <Route path="/fcraf" render={() => { return <div>Function Component</div> }} />
        <Route path="/fcaf" render={FCAF} />
        <Route path="/fcafs" render={FCAFS} />
        <Route path="/clicklink" render={ClickLink} />
    </HashRouter>,
    divReactEx2
)
