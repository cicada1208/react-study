import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'

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

    // shouldComponentUpdate: re-render 前觸發，
    // 首次 mounting render 時不觸發，使用 forceUpdate() 時不觸發
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

        return false // 不 re-render
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
// 並對 props、state 各自淺比較新舊值，不同則 re-render
// 因為淺比較，資料結構複雜時不適用
class WordList extends React.PureComponent {
    constructor(props) {
        super(props)
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

// defaultProps: 指定 props 的默認值，propTypes check 在 defaultProps 賦值後，故也會 check
WordList.defaultProps = {
    words: ['def']
}

let aryList = [
    { id: '1', text: 'a' },
    { id: '2', text: 'aa' },
    { id: '3', text: 'b' },
    { id: '4', text: 'bc' },
    { id: '5', text: 'c' },
]

class FilterList extends React.Component {
    // state 保存當前 filter 值
    state = { filterText: "" }

    // list 或 filter 變化時，重新運行 filter
    // 每個 component 內各自引入 memoized 方法，避免互相影響
    // memoize-one 只緩存最後一次的參數和結果
    filter = memoize(
        (list, filterText) => list.filter(item => item.text.includes(filterText))
    )

    // this 綁定方法2: 使用 class fields 實驗性語法，確保 handleChange 內的 this 綁定
    handleChange = event => {
        this.setState({ filterText: event.target.value })
    }

    // this 綁定方法3: 不使用 class fields 語法，需在 callback 中使用 arrow function 做 this 綁定
    // handleChange(event) {
    //     this.setState({ filterText: event.target.value })
    // }

    render() {
        // 計算最新過濾後 list，如果和上次參數一樣，memoize-one 會複用上次的值
        const filteredList = this.filter(this.props.list, this.state.filterText)

        return (
            <>
                {/* this 綁定方法2: onChange={this.handleChange} */}
                {/* this 綁定方法3: onChange={(e) => this.handleChange(e)} */}
                <input onChange={this.handleChange} value={this.state.filterText} />
                <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
            </>
        )
    }
}

export class WordAdder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            words: ['你是個'],
            count: 0
        }

        // this 綁定方法1: 為了讓 this 能在 callback 中被使用，這裡的綁定是必要的
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

        // no matter how many setState() calls in how many components you do
        // inside a React event handler, they will produce only a single
        // re-render at the end of the event.
        this.setState(state => ({
            words: [...state.words, 'b'],
        }))
        this.setState(state => ({
            words: [...state.words, 'c'],
        }))

        // The this.state object is updated when we re-render the UI at the end of the batch.
        // So if you need to update state based on a previous state
        // (such as incrementing a counter), you should use the functional setState(fn)
        // version that gives you the previous state, instead of reading from this.state.
        // 下面案例 reading from this.state 無法取得前面累加值，this.state.count = １
        // this.setState({ count: this.state.count + 1 })
        // this.setState({ count: this.state.count + 1 })
        // this.setState 透過 updater 函式接收的參數 state 和 props 都保證為最新。
        // 下面案例正確累加前面值，this.state.count = 2
        this.setState(state => ({ count: state.count + 1 }))
        this.setState(state => ({ count: state.count + 1 }))
    }

    render() {
        return (
            <>
                <button onClick={this.handleClick} >Add Word</button>
                <WordList words={this.state.words} />
                <br />
                <CounterButton />
                <br />
                <FilterList list={aryList} />
            </>
        )
    }
}
