import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from 'react'

// Hook: 重複使用 stateful 邏輯
export function HookEx() {
    // # State Hook: 使 function component 能使用 React state。
    // # const [state, setState] = useState(initialState)
    //   initialState: state 起始值(可為 function 經複雜邏輯計算後回傳起始值)。
    //   state(return): 現在的 state，可為 number、string、object 等。
    //   setState(return): 更新 state 的 function，不像 class this.setState 會合併原本的 state object，
    //   hook 更新 state 變數會直接取代，除非利用 setState(prevState => {return {...prevState, ...updatedValues}})。
    // # useState() 首次 render 予 state 起始值，其後 render 回傳最後更新的 state。
    // # 可使用多個 useState() 宣告多個 state 變數。
    // # 如果用同樣的 state 值更新，則會跳過 child component render 及 effect 的執行(React 使用 Object.is 比較演算法)。
    const [count, setCount] = useState(0)

    // # Effect Hook: function component 中執行 side effect，預設每次 render 後執行。
    //   相似於 componentDidMount、componentDidUpdate、componentWillUnmount。
    // # side effect: fetch 資料、訂閱、手動改變 DOM。這些影響其他 component 且在 render 期間無法完成。
    // # useEffect(didUpdate, aryDeps)
    //   didUpdate: effect function，在每次 render 時都會傳入不同。
    //   aryDeps(optional): 依賴 array，包含 component 內隨時間變化並被 effect 用到的值(props 或 state)，
    //   若未完全包含 effect 用到的所有值，則未包含的部分會引用先前 render 的舊值。
    //   傳遞空 array([])，表示 effect 不依賴 props 或 state，因此不需重新執行，
    //   僅在 mount 執行一次 和 unmount 清除一次，effect 內部的 props 和 state 會一直為初始值。
    // # 可使用多個 useEffect() 故可區分相關邏輯在同一 effect function，並照指定順序執行。
    // useEffect(() => {
    //     // useEffect 兩種模式:
    //     // 需清除的 Effect: 會回傳清除用的 function，React 將在需要清除時執行，預設在下次執行 effect 前清除前個 render 的 effect。
    //     // 此為無需清除的 Effect: 使用瀏覽器 API 更新標題。
    //     document.title = `You clicked ${count} times`
    // }, [count]) // 僅在計數更改時才重新執行 effect。

    // # useCallback: 避免在 component 內宣告的 function，因每次 render 不斷重新被宣告建立(得到不同的 function instance)，
    //   這樣 function 如果當成 props 傳給 child component，會致使重新 render。
    // # 但除非 child component 實作比對 props 做選擇性 render，不然就算傳遞 memoizedCallback，child component 仍會 render。
    //   故大多時不用，當傳遞 memoizedCallback 至 PureComponent、shouldComponentUpdate 或是提供給多個 useEffect 時使用。
    // # const memoizedCallback = useCallback(fn, aryDeps)
    //   fn: 通常引用 props 或 state，若無引用也不需使用 useCallback，直接定義於 component 外。
    //   memoizedCallback: 回傳 memoized callback。
    //   aryDeps: 依賴 array，依賴改變時才更新，所有在 fn 的引用，都應出現在 aryDeps。
    const memoizedCallback = useCallback(
        () => {
            document.title = `useState Count: ${count}`
        }, [count]
    )
    // 只給單個 useEffect 使用，邏輯直接寫在 useEffect 裡即可，不需 useCallback，此處只是測試功能
    useEffect(() => {
        memoizedCallback()
    }, [memoizedCallback])

    // # useMemo: 避免重複進行耗時計算，但若只是簡單的計算，useMemo 所花費的成本可能較高。
    // # const expensiveResult = useMemo(funExpensive, aryDeps)
    //   expensiveResult: 回傳 memoized 值。
    //   funExpensive: 耗時計算的函式，render 期間執行。
    //   aryDeps: 依賴 array，依賴改變時才重新計算 memoized 值，所有在 funExpensive 的引用，都應出現在 aryDeps。
    const MemoizedCounter = useMemo(
        () => [...new Array(count + 1).keys()].map(item =>
            (<ReducerCounter key={item} initialCount={item} />)
        ), [count]
    )

    // # useRef: ref DOM 或建立 JavaScript object 但每次 render 都會給同個 ref object。
    // # const refContainer = useRef(initialValue)
    //   refContainer: 回傳 mutable ref object。
    //   initialValue: .current 屬性初始值。
    const refInputSet = useRef(null)
    const refObjSet = useRef(null) // 每次 render 保持 handleClick 中 assign 的值
    let objSet = null // 每次 render 無法保持 handleClick 中 assign 的值
    const handleClick = () => {
        if (refInputSet) {
            refObjSet.current = parseInt(refInputSet.current.value)
            objSet = parseInt(refInputSet.current.value)
            // `current` points to the mounted text input element
            setCount(parseInt(refInputSet.current.value))
            refInputSet.current.focus()
        }
    }

    return (
        <>
            <p>useState Count: {count}</p>
            {/* <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button> */}

            {/* 傳遞一個 function 到 setCount，接收先前的 state，並回傳更新值(基於先前的值來更新)。 */}
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <input type="text" ref={refInputSet} />
            <button onClick={handleClick}>Set Count</button>
            {MemoizedCounter}
        </>
    )
}

function init(initialCount) {
    return { count: initialCount }
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        case 'reset':
            return init(action.payload)
        default:
            throw new Error()
    }
}

function ReducerCounter({ initialCount }) {
    // # useReducer: useState 替代方案，適用於複雜的 state 邏輯。
    // # const [state, dispatch] = useReducer(reducer, initialArg, init)
    // # 初始 state 方法1:
    //   const initialArg = { count: initialCount }
    //   const [state, dispatch] = useReducer(reducer, initialArg)
    // # 初始 state 方法2:
    //   reducer: (state, action) => newState
    //   initialArg: initialCount
    //   init(optional): Lazy initialization. The initial state will be set to init(initialArg).
    //   state(return): 現在的 state
    //   dispatch(return): 配套的 dispatch
    const [state, dispatch] = useReducer(reducer, initialCount, init)

    return (
        <>
            <p>useReducer Count: {state.count}</p>
            <button
                onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
                Reset
            </button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    )
}
