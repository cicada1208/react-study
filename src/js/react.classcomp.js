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
