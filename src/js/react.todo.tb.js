import React, { Component } from 'react';
import TodoTr from './react.todo.tr.js';

class TodoTb extends Component {

    // 建構子，每個 class 第一次產生時都會執行到這邊
    constructor(props) {
        super(props);

        // 這一行有點難解釋，想深入研究的麻煩自己查資料
        this.textChange = this.textChange.bind(this);
        this.todoAdd = this.todoAdd.bind(this);
        this.todoRemove = this.todoRemove.bind(this);
        this.todoComplete = this.todoComplete.bind(this);

        // state 是每個元件裡面的狀態，可想成是資料，之後可在 render 裡取出 this.state
        this.state = {
            todos: [
                { id: 1, name: 'a', completed: false },
                { id: 2, name: 'b', completed: true },
                { id: 3, name: 'c', completed: false }
            ]
        }
    }

    // DOM input 改變，設定 this.state.text
    textChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    todoAdd() {
        const { todos, text } = this.state;
        const newId = todos[todos.length - 1].id + 1;

        // 設定 state
        this.setState({
            text: '',
            todos: [
                ...todos,
                { id: newId, name: text, completed: false }
            ]
        })
    }

    todoRemove(id) {
        const { todos } = this.state;

        // 直接用 filter 把資料移除
        let newTodos = todos.filter((item) => item.id !== id);

        this.setState({
            todos: newTodos
        })
    }

    todoComplete(id) {
        const { todos } = this.state;

        // 直接用 map 來找到要更改的資料，其他不變
        let newTodos = todos.map((item) => {
            if (item.id === id) {
                item.completed = true;
            }
            return item;
        })

        this.setState({
            todos: newTodos
        })
    }

    // 若使用 this.setState 方式改變 state，便會重新呼叫一次 render 函式，只要資料改變，畫面就跟著改變
    render() {
        // 從 state 取出資料
        const { todos, text } = this.state;
        return (
            <div>
                <div>
                    <input name="name" type="text" value={text} onChange={this.textChange} />
                </div>
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
                                <TodoTr id={todo.id} name={todo.name} completed={todo.completed}
                                    todoRemove={this.todoRemove} todoComplete={this.todoComplete} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TodoTb;
