import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props)
        // 修改 this.state，不會異動 this.props (唯讀)
        this.state = {
            date: this.props.date,
            dates: this.props.dates
        }
    }

    // 生命週期方法 componentDidMount: Clock component 被 render 到 DOM 後才執行。
    componentDidMount() {
        // this.timerID: 不需重新 render 的資料，可不用設定於 this.state
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )

        // const { dates } = this.state
        // this.setState({
        //     dates: [
        //         ...dates,
        //         { date: new Date() }
        //     ]
        // })
        // 若 state 的更新是非同步，透過 callback 來設定值
        this.setState(state => ({
            dates: [
                ...state.dates,
                { date: new Date() }
            ]
        }))
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
                date: {this.state.date.toLocaleTimeString()}.
                last date in dates: {this.state.dates[this.state.dates.length - 1].date.toLocaleTimeString()}.
            </div>
        )
    }
}

export class Clocks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            dates: [{ date: new Date() }]
        }
    }

    render() {
        return (
            <>
                {/* 上至下的「單向」資料流，parent state as props to child */}
                <Clock date={this.state.date} dates={this.state.dates} />
                <Clock date={this.state.date} dates={this.state.dates} />
            </>
        )
    }
}
