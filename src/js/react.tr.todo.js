import React, { Component } from 'react'

export default class TrTodo extends Component {
    constructor(props) {
        super(props)
        this.todoComplete = this.todoComplete.bind(this)
        this.todoRemove = this.todoRemove.bind(this)
    }

    todoComplete() {
        this.props.todoComplete(this.props.id)
    }

    todoRemove() {
        this.props.todoRemove(this.props.id)
    }

    render() {
        // this.props: 父子元件透過此來傳資料
        const { name, desp, completed } = this.props
        return (
            <tr>
                <td>{name}</td>
                <td>{desp}</td>
                <td>{completed ? '已完成' : '未完成'}</td>
                <td>
                    <div className="btn btn-primary" onClick={this.todoComplete}>完成</div>
                    <div className="btn btn-danger" onClick={this.todoRemove}>刪除</div>
                </td>
            </tr>
        )
    }
}
