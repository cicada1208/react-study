import React from 'react'
import { Route, Link } from "react-router-dom"
import TrTodo from './react.tr.todo.js'

class TbTodo extends React.Component {
    // constructor: 首先執行
    constructor(props) {
        super(props)

        // 這一行有點難解釋，想深入研究的麻煩自己查資料
        this.textChange = this.textChange.bind(this)
        this.todoAdd = this.todoAdd.bind(this)
        this.todoRemove = this.todoRemove.bind(this)
        this.todoComplete = this.todoComplete.bind(this)

        // this.state: 元件的狀態，可想成是資料，之後可在 render 裡取出
        this.state = {
            todos: [
                { id: 1, name: 'a', completed: false },
                { id: 2, name: 'b', completed: true },
                { id: 3, name: 'c', completed: false }
            ]
        }
    }

    // DOM input 改變，則設定 this.state.text
    textChange(e) {
        var objStateVal
        switch (e.target.name) {
            case 'name':
                objStateVal = { text: e.target.value }
                break
            default:
                objStateVal = { text: '' }
                break
        }
        // 設定 state
        this.setState(objStateVal)
        // this.setState({
        //     text: e.target.value
        // })
    }

    todoAdd() {
        const { todos, text } = this.state
        const newId = todos[todos.length - 1].id + 1

        this.setState({
            text: '',
            todos: [
                ...todos,
                { id: newId, name: text, completed: false }
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
        const { todos, text } = this.state
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
                <input name="name" type="text" value={text} onChange={this.textChange} />
                <button onClick={this.todoAdd}>Add item</button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>名稱</th>
                            <th>狀態</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <TrTodo id={todo.id} name={todo.name} completed={todo.completed}
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
