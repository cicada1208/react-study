import React from 'react'

// React Component 撰寫的兩種方式之一:
// Class Component: stateful component
// 可進行較複雜操作和元件生命週期控制，較耗資源
// Component 由 Element 組成
export default class ClassComp extends React.Component {
    render() {
        // this.props.match.params.id: 取得網址上的參數
        // <Route path="/classcomp/:id" component={ClassComp} />
        const id = this.props.match.params.id
        return (
            <div>
                Class Component id: {id}
            </div>
        )
    }
}
