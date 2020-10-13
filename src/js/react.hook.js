import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from 'react'
import axios from 'axios'

// Hook: 重複使用 stateful 邏輯
// 生命週期方法對應Hook: render 即 function component body 本身
export function HookEx() {
    // # State Hook: 使 function component 能使用 React state。
    // # const [state, setState] = useState(initialState)
    //   initialState: state 起始值(可為 function 經複雜邏輯計算後回傳起始值)。
    //   state(return): 現在的 state，可為 number、string、object 等。
    //   setState(return): 更新 state 的 function，不像 class this.setState 會合併原本的 state object，
    //   hook 更新 state 變數會直接取代，除非利用 setState(prevState => {return {...prevState, ...updatedValues}})。
    // # useState() 首次 render 予 state 起始值，其後 render 回傳最後更新的 state。
    // # 可使用多個 useState() 宣告多個 state 變數。
    // # 如果用同樣的 state 值更新，則會跳過 child component render 及 effect 的執行(React 使用 Object.is 比較)。
    const [count, setCount] = useState(0)
    const time = useTime()

    // # Effect Hook: function component 中執行 side effect，預設每次 render 後執行。
    // # 生命週期方法對應Hook: componentDidMount、componentDidUpdate、componentWillUnmount 相似於 useEffect。
    // # side effect: fetch 資料、訂閱、手動改變 DOM。這些影響其他 component 且在 render 期間無法完成。
    // # useEffect(didUpdate, aryDeps)
    //   didUpdate: effect function，在每次 render 時都會傳入不同。
    //   aryDeps(optional): dependencies array，包含 component 內隨時間變化並被 effect 用到的值(props 或 state)，
    //   依據 aryDeps 改變，重新執行 effect。
    //   傳遞空 array([])，表示 effect 不依賴 props 或 state，因此不需重新執行，
    //   僅在 mount 執行一次 和 unmount 清除一次，effect 內部的 props 和 state 會一直為初始值。
    // # 可使用多個 useEffect() 故可區分相關邏輯在同一 effect function，並照指定順序執行。
    // useEffect(() => {
    //     // useEffect 兩種模式之一: 無需清除的 Effect。
    //     document.title = `You clicked ${count} times`
    // }, [count]) // 僅在計數改變時才重新執行 effect。

    // # useCallback: 避免在 component 內宣告的 function，因每次 render 不斷重新被宣告建立(得到不同的 function instance)，
    //   這樣 function 如果當成 props 傳給 child component，會致使重新 render。
    // # 但除非 child component 實作比對 props 做選擇性 render，不然就算傳遞 memoizedCallback，child component 仍會 render。
    //   故使用時機為當傳遞 memoizedCallback 至實作 PureComponent、shouldComponentUpdate、React.memo 的 component 或是提供給多個 useEffect。
    // # const memoizedCallback = useCallback(fn, aryDeps)
    //   fn: 通常引用 props 或 state，若無引用也不需使用 useCallback，直接定義於 component 外。
    //   memoizedCallback: 回傳 memoized callback。
    //   aryDeps: dependencies array，依賴改變時才更新，所有在 fn 的引用，都應出現在 aryDeps。
    const memoizedCallback = useCallback(
        () => {
            document.title = `useState Count: ${count}`
        }, [count]
    )
    // 只給單個 useEffect 使用，邏輯直接寫在 useEffect 裡即可，不需 useCallback，此處只是測試功能
    useEffect(() => {
        memoizedCallback()
    }, [memoizedCallback])

    // # useMemo: 避免重複進行昂貴計算，記住 memoized 值，但若只是簡單的計算，useMemo 所花費的成本可能較高。
    // # const expensiveResult = useMemo(fnExpensive, aryDeps)
    //   expensiveResult: 回傳 memoized 值。
    //   fnExpensive: 昂貴計算的函式，render 期間執行。
    //   aryDeps: dependencies array，依賴改變時才重新計算 memoized 值，所有在 fnExpensive 的引用，都應出現在 aryDeps。
    // const MemoizedCounter = useMemo(
    //     () => [...new Array(count + 1).keys()].map(item =>
    //         (<ReducerCounterEx key={item} initialCount={item} />)
    //     ), [count]
    // )
    const MemoizedCounter = useMemo(
        () => {
            if (count >= -1)
                return [...new Array(count + 1).keys()].map(item =>
                    (<ReducerCounterEx key={item} initialCount={item} />)
                )
            else
                return null
        }, [count]
    )

    // # useRef: ref DOM 或建立 JavaScript object 但每次 render 都會給同個 ref object。
    // # const refContainer = useRef(initialValue)
    //   refContainer: 回傳 mutable ref object。
    //   initialValue: .current 屬性初始值。
    // # 避免在 render 時設定 ref，可能造成非預期行為。通常是在 event handler 和 effect 中修改 ref。
    const refSetCountInput = useRef(null)
    const refSetCountVal = useRef(null) // 每次 render 保持 handleSetCount 中 assign 的值
    let intSetCountVal = null // 每次 render 無法保持 handleSetCount 中 assign 的值
    const handleSetCount = () => {
        if (refSetCountInput) {
            // refSetCountInput.current: points to the mounted text input element.
            intSetCountVal = parseInt(refSetCountInput.current.value)
            if (!isNaN(intSetCountVal)) {
                refSetCountVal.current = intSetCountVal
                setCount(intSetCountVal)
            }
            refSetCountInput.current.focus()
        }
    }

    return (
        <>
            <p>date: {time.toLocaleTimeString()}</p>
            <p>useState Count: {count}</p>

            {/* <button onClick={() => setCount(count + 1)}>+</button>
                <button onClick={() => setCount(count - 1)}>-</button> */}

            {/* 傳遞一個 function 到 setCount，接收先前的 state，並回傳更新值(基於先前的值來更新)。 */}
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <input type="text" ref={refSetCountInput} />
            <button onClick={handleSetCount}>Set Count</button>

            {/* RenderTimes is not React.memo: 即使 props 未改變仍重新 render */}
            <RenderTimes name="RenderTimes" refSetCountVal={refSetCountVal.current} />
            {/* MemoRenderTimes is React.memo: props 未改變會複用上次 render 結果 */}
            <MemoRenderTimes name="MemoRenderTimes" refSetCountVal={refSetCountVal.current} />

            {MemoizedCounter}
        </>
    )
}


// custom Hook
function useTime() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        // useEffect 兩種模式之一: 需清除的 Effect。
        // 會回傳清除用的 function，React 將在需要清除時執行，
        // 預設在下次執行 effect 前清除前個 render 的 effect。
        let timerID
        timerID = setInterval(
            () => setTime(new Date()),
            1000
        )
        return () => clearInterval(timerID)
    }, [])

    return time
}


const RenderTimes = ({ name }) => {
    const refCount = React.useRef(0)
    refCount.current++

    return (
        <p>
            Component {name}: render times = {refCount.current}
        </p>
    )
}

// React.memo: 是個 higher order component，若 component MemoRenderTimes 的 props 未改變會複用上次 render 結果。
// 只確認 props 是否改變，但若 component 內有使用 useState 或 useContext，
// 雖被 wrap 在 React.memo，當 state 或 context 改變時，仍會重新 render。
// 預設對 props 進行 shallow compare(Number、String: 比較數值，Object: 比較記憶體位置 reference)，
// 可自定義比較方法 React.memo(component, areEqual)
// function areEqual(prevProps, nextProps) { props 相等回傳 true(不 re-render)，不等回傳 false(re-render) }
const MemoRenderTimes = React.memo(RenderTimes)


function init(initialCount) {
    return { count: initialCount }
}

function reducerCounter(state, action) {
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

function ReducerCounterEx({ initialCount }) {
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
    const [state, dispatch] = useReducer(reducerCounter, initialCount, init)

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


const url = 'http://hn.algolia.com/api/v1/search?query='

export function HookFetch() {
    const [data, setData] = useState({ hits: [] })
    const [query, setQuery] = useState('react')

    useEffect(() => {
        let ignore = false

        async function fetchData() {
            const result = await axios(url + query)
            if (!ignore) setData(result.data) // re-render affter setData
        }

        fetchData()
        return () => { ignore = true }
    }, [query])

    return (
        <>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            <ul>
                {data.hits.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                        {' '}
                        <button type="button" onClick={() => { alert(item.objectID) }}>
                            Show Id
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}


const reducerFetch = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error()
    }
}

const useFetch = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl)

    const [state, dispatch] = useReducer(reducerFetch, {
        isLoading: false,
        isError: false,
        data: initialData,
    })

    useEffect(() => {
        let didCancel = false

        const fetchData = async () => {
            // re-render affter dispatch
            dispatch({ type: 'FETCH_INIT' })

            try {
                const result = await axios(url)

                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' })
                }
            }
        }

        fetchData()

        return () => {
            didCancel = true // 因為非同步 await
        }
    }, [url]) // url 改變才重新執行 effect

    return [state, setUrl]
}

export function ReducerFetchEx() {
    const [query, setQuery] = useState('redux')
    const [{ data, isLoading, isError }, setUrl] = useFetch(
        url + query,
        { hits: [] },
    )

    return (
        <>
            <form
                onSubmit={event => {
                    setUrl(url + query)
                    event.preventDefault()
                }}
            >
                <input
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {isError && <div>Something went wrong ...</div>}

            {isLoading ? (<div>Loading ...</div>) : (
                <ul>
                    {data.hits.map(item => (
                        <li key={item.objectID}>
                            <a href={item.url}>{item.title}</a>
                            {' '}
                            <button type="button" onClick={() => { alert(item.objectID) }}>
                                Show Id
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}


// 藉由 ref 取得先前的 prop 或 state 值
export function PreviousCounter() {
    const [count, setCount] = useState(0)
    const prevCount = usePrevious(count)

    return (
        <p>
            <button onClick={() => setCount(prev => prev + 1)}>Click</button>
            Now: {count}, before: {prevCount}
        </p>
    )
}

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    }) // aryDeps: 有無傳入 [value] 結果相同，應該是自動補入 [value]
    return ref.current
}


export function PreviousCounterAryDeps() {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)

    const ref = useRef() // 記錄先前的值
    useEffect(() => {
        ref.current = `${count}-${count2}`
    }, [count]) // aryDeps: 缺少 count2，故 count2 改變時 effect 不會重新執行

    return (
        <p>
            <button onClick={() => {
                setCount(prev => prev + 1)
            }}>Click</button>
            <button onClick={() => {
                setCount2(prev => prev + 1)
            }}>Click2</button>
            Now: count={count} count2={count2}, before: {ref.current}
        </p>
    )
}

