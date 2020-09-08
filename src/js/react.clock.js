import React from 'react'

export default class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date() }
    }

    // 生命週期方法 componentDidMount: Clock component 被 render 到 DOM 後才執行。
    componentDidMount() {
        // this.timerID: 不需重新 render 的資料，可不用設定於 this.state
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    // 生命週期方法 componentWillUnmount: Clock component 從 DOM 移除後執行。
    componentWillUnmount() {
        // timer 停止
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div>
                It is {this.state.date.toLocaleTimeString()}.
            </div>
        )
    }
}
