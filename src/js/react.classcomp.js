import React from 'react'

// React Component 撰寫的兩種方式之一:
// Class Component: stateful component
// 可進行較複雜操作和元件生命週期控制，較耗資源
// Component 由 Element 組成
export default class ClassComp extends React.Component {
    renderFun(i) {
        return <div>Class Component id: {i}</div>
    }

    render() {
        // this.props.match.params.id: 取得網址上的參數
        // <Route path="/classcomp/:id" component={ClassComp} />
        const id = this.props.match.params.id
        return (
            // <div>
            //     Class Component id: {id}
            // </div>

            // 該寫法每次渲染 render prop 值會是不同的(生成新函式)
            // 若 component DisplayId 繼承 React.PureComponent 則無法實現其優勢
            // <DisplayId id={id} render={i => (<div>Class Component id: {i}</div>)} />

            // 該寫法每次渲染 render prop 值皆指向同個函式this.renderFun
            // 若 component DisplayId 繼承 React.PureComponent 則能實現其優勢
            <DisplayId id={id} render={this.renderFun} />
        )
    }
}

class DisplayId extends React.Component {
    render() {
        return (
            <>
                {this.props.render(this.props.id)}
            </>
        )
    }
}


export class CounterButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = { count: 1 }
    }

    // shouldComponentUpdate: re-render 前觸發
    shouldComponentUpdate(nextProps, nextState) {
        // props.color 或 state.count 值變更才 re-render
        // if (this.props.color !== nextProps.color) {
        //     return true
        // }
        // if (this.state.count !== nextState.count) {
        //     return true
        // }

        //  特定條件後才 re-render
        if (nextState.count % 2 === 1)
            return true

        return false
    }

    render() {
        return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
                Count: {this.state.count}
            </button>
        )
    }
}


// React.PureComponent: 替代手動撰寫 shouldComponentUpdate，
// 並對 props、state 淺比較新舊值，不同則 re-render
// 因為淺比較，資料結構複時不適用
class WordList extends React.PureComponent {
    constructor(props) {
        super(props)
        // component ListOfWords constructor 只在第一次 render 時執行
        console.log('ListOfWords constructor')
    }

    render() {
        return <>{this.props.words.join(',')}</>
    }
}

export class WordAdder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            words: ['你是個']
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const words = this.state.words
        words.push('b')
        // WordAdder 的新舊 this.props.words 是同個參考 array(object)，故淺比較 return true，不會 re-render
        // this.setState({ words })
        // 可修改為 assign 新的 array(object)
        this.setState({ words: [].concat(words) })
    }

    render() {
        return (
            <>
                <button onClick={this.handleClick} >add word</button>
                <WordList words={this.state.words} />
                <br />
                <CounterButton />
            </>
        )
    }
}
