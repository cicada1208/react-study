import React from 'react'
import { Route, Link } from "react-router-dom"
import TrTodo from './react.tr.todo.js'

class TbTodo extends React.Component {
    // constructor: 首先執行
    constructor(props) {
        super(props)

        // 為了讓 this 能在 callback 中被使用，例如 onChange={this.handleChange}，這裡的綁定是必要的
        this.handleChange = this.handleChange.bind(this)
        this.todoAdd = this.todoAdd.bind(this)
        this.todoRemove = this.todoRemove.bind(this)
        this.todoComplete = this.todoComplete.bind(this)

        // this.state: 元件的狀態，可想成是資料，之後可在 render 裡取出
        // 只可在 constructor 初始
        // 之後需透過 this.setState 更改 this.state，重新 render component
        this.state = {
            name: '', desp: '', slt: '',
            todos: [
                { id: 1, name: 'a', desp: 'adesp', slt: 'aslt', completed: false },
                { id: 2, name: 'b', desp: 'bdesp', slt: 'bslt', completed: true },
            ]
        }
    }

    // DOM input 改變，則設定 this.state.name
    handleChange(e) {
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
            case 'slt':
                objStateVal = { slt: e.target.value }
                break
            default:
                objStateVal = { name: '', desp: '', slt: '' }
                break
        }
        // this.setState: 設定 state，會 merge 你提供的 object 到目前的 state
        this.setState(objStateVal)
    }

    todoAdd() {
        const { todos, name, desp, slt } = this.state
        const newId = (todos.length === 0 ? 1 : todos[todos.length - 1].id + 1)

        this.setState({
            name: '', desp: '', slt: '',
            todos: [
                ...todos,
                { id: newId, name, desp, slt, completed: false }
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
        const { todos, name, desp, slt } = this.state
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
                可將 value attribute 顯示為 this.state.name 並透過 this.handleChange 異動 this.state.name 的方式來達成繫結 */}
                <input name="name" type="text" value={name} onChange={this.handleChange} /><br />
                <textarea name="desp" value={desp} onChange={this.handleChange} /><br />
                <select name="slt" value={slt} onChange={this.handleChange}>
                    <option value="">請選擇</option>
                    <option value="aslt">aslt</option>
                    <option value="bslt">bslt</option>
                </select>
                <button onClick={this.todoAdd}>Add item</button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>名稱</th>
                            <th>描述</th>
                            <th>選取</th>
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
                                <TrTodo key={todo.id} id={todo.id} name={todo.name} desp={todo.desp} slt={todo.slt}
                                    completed={todo.completed} todoRemove={this.todoRemove} todoComplete={this.todoComplete} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TbTodo
