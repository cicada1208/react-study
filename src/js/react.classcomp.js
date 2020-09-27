import React from 'react'
import PropTypes from 'prop-types'

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
        // props、state 值變更才 re-render
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


// React.PureComponent: 替代手動撰寫 shouldComponentUpdate
// 並對 props、state 淺比較新舊值，不同則 re-render
// 因為淺比較，資料結構複雜時不適用
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

// propTypes: props 類型檢查，class component、function component 都可使用
// 當傳入的 props 類型不正確，會於 browser console 顯示 Warning
// propTypes 僅在開發模式下檢查
WordList.propTypes = {
    // PropTypes.array: 類型是否為 array
    // PropTypes.array.isRequired: 若無傳入該 prop 顯示 Warning
    words: PropTypes.array.isRequired
}

// 指定 props 的默認值，propTypes check 在 defaultProps 賦值後，故也會 check
WordList.defaultProps = {
    words: ['def']
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
        // 新舊 this.props.words 是同個參考 array(object)，故淺比較 return false，不會 re-render
        // const words = this.state.words
        // words.push('b')
        // this.setState({ words })

        // 可修改為 assign 新的 array(object)，使之 re-render
        // this.setState(state => ({
        //     words: state.words.concat(['b'])
        // }))
        this.setState(state => ({
            words: [...state.words, 'b'],
        }))
    }

    render() {
        return (
            <>
                <button onClick={this.handleClick} >Add Word</button>
                <WordList words={this.state.words} />
                <br />
                <CounterButton />
            </>
        )
    }
}
