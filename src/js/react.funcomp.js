import React from 'react'

// React Component 撰寫的兩種方式之一:
// Function Component: stateless component
// 單純 render UI，沒有內部狀態、實作物件、ref和生命週期方法，有較好效能
// const FunComp = (props) => (
//     <div>Function Component {props.value}</div>
// )
export const FunComp = (props) => {
    let x = 'test'
    return (
        <>
            {!props.nshow ? <div>Function Component {props.value}</div> : null}
            {props.render && props.render(x)}
            {props.children}
            {props.bottom}
        </>
    )
}

// component composition
export function FunComps() {
    return (
        <>
            {/* props: 唯讀，可為 primitive value、function、React element */}
            <FunComp nshow={false} value="props value1" />
            {/* props.render 返回 React element 的 function */}
            <FunComp nshow={true} render={(x) => (<div>Function Component props render: {x}</div>)} />
            <FunComp nshow={true} value="props value2" >
                {/* 透過巢狀的 JSX 將任意的 props.children 傳遞給 component */}
                <div>Function Component props children</div>
            </FunComp>
            {/* 自定義 props bottom 並傳入 React element */}
            <FunComp nshow={true} bottom={<FunComp nshow={false} value="props value3" />} />
        </>
    )
}

// <div />: 字首小寫視為原始 DOM HTML div tag
// <FunComps />: 字首大寫視為 component，且需在作用域中使用(import 'react' 及 component FunComps)
// ReactDOM.render(
//     <FunComps />,
//     divReactEx
// )


function Type1st(props) {
    return <>{props.content}</>
}

class Type2nd extends React.Component {
    render() {
        return <>{this.props.content}</>
    }
}

const typecomponents = {
    tp1st: Type1st,
    tp2nd: Type2nd
}

function Type(props) {
    // JSX 類型可以是大寫開頭的變數
    const TypeComp = typecomponents[props.type]
    return <TypeComp content={props.content} />
}

export function RuntimeComp() {
    return (
        <>
            <Type type='tp2nd' content='Runtime Component 2nd.' />
            <br />
            <Type type='tp1st' content='Runtime Component 1st.' />
        </>
    )
}
