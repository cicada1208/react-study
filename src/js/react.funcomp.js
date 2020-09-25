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
            {/* null, undefined, false, 與 true 不會被 render */}
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

function Type3rd(props) {
    return <button {...props} />
}

function Type4th(props) {
    let items = []
    for (let i = 1; i <= props.times; i++)
        items.push(props.children(i))
    return <>{items}</>
}

const typecomponents = {
    tp1st: Type1st,
    tp2nd: Type2nd,
    tp3rd: Type3rd,
    tp4th: Type4th,
}

function Type(props) {
    // 使用展開運算子來分開並挑選 component 所需的 props
    const { type, ...other } = props
    // JSX 類型可以是大寫開頭的變數
    const TypeComp = typecomponents[type]
    return <TypeComp {...other} />
}

export function RuntimeComp() {
    const objProps = { type: 'tp2nd', content: 'Runtime Component 2nd.' }
    return (
        <>
            <Type type='tp1st' content='Runtime Component 1st.&lt;3' />
            <br />
            {/* {使用 ... 作為展開運算子來傳遞 objProps */}
            <Type {...objProps} />
            <br />
            <Type type='tp3rd' onClick={() => alert("clicked!")} >
                {/* props.children: string */}
                Runtime Component 3rd.
            </Type>
            <Type type='tp4th' times={2} >
                {/* props.children: callback function */}
                {(idx) => <div key={idx}>{idx}. Runtime Component 4th.</div>}
            </Type>
        </>
    )
}



class ListOfWords extends React.PureComponent {
    render() {
        // this.props.words.join(',')   this.props.words
        return <div>{this.props.words.join(',')}</div>;
    }
}

export class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
            // words: 'marklar'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // 这部分代码很糟，而且还有 bug
        const words = this.state.words;
        words.push('markla');
        // let { words } = this.state
        // words = 'aaa'
        this.setState({ words: words });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick} />
                <ListOfWords words={this.state.words} />
            </div>
        );
    }
}
