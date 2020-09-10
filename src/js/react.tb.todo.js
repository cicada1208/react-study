import React from 'react'
import { Route, Link } from "react-router-dom"
import TrTodo from './react.tr.todo.js'

class TbTodo extends React.Component {
    // constructor: 首先執行
    constructor(props) {
        super(props)

        // 為了讓 this 能在 callback 中被使用，例如 onChange={this.textChange}，這裡的綁定是必要的
        this.textChange = this.textChange.bind(this)
        this.todoAdd = this.todoAdd.bind(this)
        this.todoRemove = this.todoRemove.bind(this)
        this.todoComplete = this.todoComplete.bind(this)

        // this.state: 元件的狀態，可想成是資料，之後可在 render 裡取出
        // 只可在 constructor 初始
        // 之後需透過 this.setState 更改 this.state，重新 render component
        this.state = {
            name: '',
            desp: '',
            todos: [
                { id: 1, name: 'a', desp: 'a content', completed: false },
                { id: 2, name: 'b', desp: 'b content', completed: true },
            ]
        }
    }

    // DOM input 改變，則設定 this.state.name
    textChange(e) {
        // this.setState({
        //     name: e.target.value
        // })
        var objStateVal
        switch (e.target.name) {
            case 'name':
                objStateVal = { name: e.target.value }
                break
            case 'desp':
                objStateVal = { desp: e.target.value }
                break
            default:
                objStateVal = { name: '', desp: '' }
                break
        }
        // this.setState: 設定 state，會 merge 你提供的 object 到目前的 state
        this.setState(objStateVal)
    }

    todoAdd() {
        const { todos, name, desp } = this.state
        const newId = (todos.length === 0 ? 1 : todos[todos.length - 1].id + 1)

        this.setState({
            name: '',
            desp: '',
            todos: [
                ...todos,
                { id: newId, name: name, desp: desp, completed: false }
            ]
        })
    }

    todoRemove(id) {
        const { todos } = this.state

        // 使用 filter 把資料移除
        let newTodos = todos.filter((item) => item.id !== id)

        this.setState({
            todos: newTodos
        })
    }

    todoComplete(id) {
        const { todos } = this.state

        // 使用 map 找到要更改的資料，其他不變
        let newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = true
            }
            return todo
        })

        this.setState({
            todos: newTodos
        })
    }

    // render: 負責更新 DOM 來符合 React Component
    // 若使用 this.setState 改變 state，便會重新執行 render，只要資料改變，畫面就跟著改變
    render() {
        // 從 state 取出資料
        const { todos, name, desp } = this.state
        // this.props.match.path: 該 component 匹配到的路徑，在此為 /todo，可用此配置第2層 Route and Link
        return (
            <div>
                <div className="child-link">
                    <ul>
                        <li><Link to={`${this.props.match.path}/child/1`}>child1</Link></li>
                        <li><Link to={`${this.props.match.path}/child/2`}>child2</Link></li>
                    </ul>
                </div>
                <div className="child-router">
                    <Route path={`${this.props.match.path}/child/1`} render={() => { return <div>child1 test</div> }} />
                    <Route path={`${this.props.match.path}/child/2`} render={() => { return <div>child2 test</div> }} />
                </div>
                {/* 訊息 Warning: A component is changing an uncontrolled input of type text to be controlled.
                React Controlled Component: form element <input>, <textarea>, <select>
                可將 value attribute 顯示為 this.state.text 並透過 this.textChange 異動 this.state.text 的方式來達成繫結 */}
                <input name="name" type="text" value={name} onChange={this.textChange} /><br />
                <textarea name="desp" value={desp} onChange={this.textChange} /><br />
                <button onClick={this.todoAdd}>Add item</button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>名稱</th>
                            <th>描述</th>
                            <th>狀態</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // 訊息 Warning: Each child in a list should have a unique "key" prop.
                            // key: 幫助 React 分辨哪些項目被改變、增加或刪除，給予每個 element 一個固定的身份，
                            // 僅提示 React，但不會被傳遞到 TrTodo component。
                            todos.map((todo) => (
                                <TrTodo key={todo.id} id={todo.id} name={todo.name} desp={todo.desp} completed={todo.completed}
                                    todoRemove={this.todoRemove} todoComplete={this.todoComplete} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TbTodo
