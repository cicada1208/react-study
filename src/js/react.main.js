// React:

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Route, Link } from "react-router-dom"
import ReactElmt from './react.elmt.js'
import { FunComp, FunComps, RuntimeComp } from './react.funcomp.js'
import ClassComp, { WordAdder } from './react.classcomp.js'
import TbTodo from './react.tb.todo.js'
import { Clocks } from './react.clock.js'
import ClickLink from './react.clicklink.js'
import { ClockLazyComp, ClockSuspComp } from './react.dynamic.import.js'
import ThemeToggler from './react.context.js'
import { ErrorBoundary, BuggyDisplay } from './react.err.boundary.js'
import { HocFetchEx } from './react.hoc.js'
import { HookEx, ReducerFetchEx, PreviousCounter, PreviousCounterAryDeps } from './react.hook.js'
import jpgPig from '../img/pig.jpg'


const divReactEx = document.createElement('div')
divReactEx.id = 'divReactEx'
document.body.appendChild(divReactEx)


class Home extends React.Component {
  render() {
    return (
      // React.Fragment: 能在不額外增加 html dom 情況下，重新組合多個 child component
      // 簡寫: <></>
      <React.Fragment>
        <div>React</div>
        <img width='100' src={jpgPig} />
        <ul>
          {/* Link 組件需置於 HashRouter, BrowserRouter 組件中 */}
          <li><Link to="/reactelmt">reactelmt</Link ></li>
          <li><Link to="/funcompr">funcompr</Link ></li>
          <li><Link to="/funcomp">funcomp</Link ></li>
          <li><Link to="/funcomps">funcomps</Link ></li>
          <li><Link to="/classcomp/1">classcomp1</Link ></li>
          <li><Link to="/classcomp/2">classcomp2</Link ></li>
          <li><Link to="/tbtodo">tbtodo</Link ></li>
          <li><Link to="/clocks">clocks</Link ></li>
          <li><Link to="/clicklink">clicklink</Link ></li>
          <li><Link to="/lazycomp">lazycomp</Link ></li>
          <li><Link to="/reactcontext">reactcontext</Link ></li>
          <li><Link to="/errboundary">errboundary</Link ></li>
          <li><Link to="/runtimecomp">runtimecomp</Link ></li>
          <li><Link to="/purecomp">purecomp</Link ></li>
          <li><Link to="/hoc">hoc</Link ></li>
          <li><Link to="/hook">hook</Link ></li>
          <li><Link to="/hookfetch">hookfetch</Link ></li>
          <li><Link to="/useprevious">useprevious</Link ></li>
        </ul>
        {/* {this.props.children} 對應的 component，例如：TbTodo? */}
      </React.Fragment>
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

// ReactDOM.render: 負責更新 DOM 來符合 React Element or React Component
// 第一次渲染時，container 內的 DOM element 都會被替換，
// 之後呼叫會使用 React DOM diffing 演算法進行高效率的更新。
ReactDOM.render(
  // React.StrictMode: 在開發模式下會予以額外的檢查與警告，生命週期函式可能會被多次調用
  // <React.StrictMode>
  <ErrorBoundary>
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/" component={Home} />
        <Route path="/reactelmt" render={() => (ReactElmt)} />
        <Route path="/funcompr" render={() => { return <div>Function Component render</div> }} />
        <Route path="/funcomp" render={FunComp} />
        <Route path="/funcomps" render={FunComps} />
        <Route path="/classcomp/:id" component={ClassComp} />
        <Route path="/tbtodo" component={TbTodo} />
        <Route path="/clocks" component={Clocks} />
        <Route path="/clicklink" render={ClickLink} />
        <Route path="/lazycomp" component={ClockLazyComp} />
        <Route path="/reactcontext" component={ThemeToggler} />
        <Route path="/errboundary" component={BuggyDisplay} />
        <Route path="/runtimecomp" component={RuntimeComp} />
        <Route path="/purecomp" component={WordAdder} />
        <Route path="/hoc" component={HocFetchEx} />
        <Route path="/hook" component={HookEx} />
        <Route path="/hookfetch" component={ReducerFetchEx} />
        <Route path="/useprevious" component={PreviousCounter} />
      </Suspense>
    </HashRouter >
  </ErrorBoundary>,
  // </React.StrictMode>,
  divReactEx
)

// 從 DOM 中移除已經 mount 的 React component 並清除其 event handler 和 state。
// return true if unmount success
// let boolUnmount = ReactDOM.unmountComponentAtNode(divReactEx)
