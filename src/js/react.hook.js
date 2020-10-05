import React, { useState, useEffect } from 'react'

// Hook: 重複使用 stateful 邏輯
export function HookEx() {
    // State Hook: 使 function component 能使用 React state。
    // useState(): 傳入 state 起始值(可為 function 複雜邏輯計算後回傳起始值)，
    // 回傳目前的 state 與更新 state 的 function，
    // 首次 render 予 state 起始值，其後 render 回傳最後更新的 state。
    // 可使用多個 useState() 宣告多個 state 變數。
    // count: 宣告的一個 state 變數，可為 number、string、object 等。
    // setCount: 不像 class this.setState 會合併原本的 state object，
    // hook 更新 state 變數會直接取代，除非利用 setState(prevState => {return {...prevState, ...updatedValues}})。
    // 如果用同樣的 state 值更新，則會跳過 render 及 effect 的執行。
    const [count, setCount] = useState(0)

    // side effect: fetch 資料、訂閱、手動改變 DOM。這些影響其他 component 且在 render 期間無法完成。
    // Effect Hook: function component 中執行 side effect，預設每次 render 後執行。
    // 相似於 componentDidMount、componentDidUpdate、componentWillUnmount。
    // useEffect(): 傳入的第一個參數 effect function，在每次 render 時都會傳入不同，
    // 傳入的第二個可選參數 array 僅在計數更改時才重新執行 effect，
    // array 包括 component 內隨時間變化並被 effect 用到的值(props 或 state)。
    // 傳遞空 array([])，告訴 React 你的 effect 不依賴 props 或 state，因此不需重新執行，僅在 mount 和 unmount 時執行一次。
    // 可使用多個 useEffect() 故可區分相關邏輯在同一 effect function，並照指定順序執行。
    useEffect(() => {
        // 需清除的 Effect: 會回傳清除用的 function，React 將在需要清除時執行，預設在下次執行 effect 前清除前個 render 的 effect。
        // 此為無需清除的 Effect: 使用瀏覽器 API 更新標題。
        document.title = `You clicked ${count} times`
    }, [count])

    return (
        <>
            <p>You clicked {count} times</p>
            {/* <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button> */}

            {/* 傳遞一個 function 到 setCount，接收先前的 state，並回傳更新值(基於先前的值來更新)。 */}
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
        </>
    )
}
