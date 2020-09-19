import React from 'react'

// React Component 撰寫的兩種方式之一:
// Function Component: stateless component
// 單純 render UI，沒有內部狀態、實作物件、ref和生命週期方法，有較好效能
// const FunComp = (props) => (
//     <div>Function Component {props.value}</div>
// )
export const FunComp = (props) => {
    return (
        <>
            {!props.nshow ? <div>Function Component {props.value}</div> : null}
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
            <FunComp nshow={true} value="props value2" >
                {/* 透過巢狀的 JSX 將任意的 props.children 傳遞給其他 component */}
                <div>Function Component props children</div>
            </FunComp>
            <FunComp nshow={true} bottom={<FunComp nshow={false} value="props value3" />} />
        </>
    )
}

// component 字首須大寫，小寫開頭的組件視為原始 DOM tag，
// <div /> 視為 HTML div tag，
// <FunComps /> 視為 component，且需在作用域中使用。
// ReactDOM.render(
//     <FunComps />,
//     divReactEx
// )
