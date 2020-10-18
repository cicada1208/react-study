import React from 'react'

const ErrorCatch = (props) => {
  return (
    <>
      <h2>ErrorCatch.</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {props.error && props.error.message}
        <br />
        {props.error && props.error.stack}
      </details>
    </>
  )
}
export default ErrorCatch

// ErrorBoundary:
// 截取 child component tree 中 JavaScript 錯誤、記錄錯誤、並顯示一個 fallback UI
// render 期間、生命週期方法、constructor 內都能截取到錯誤
// static getDerivedStateFromError()、componentDidCatch() 定義其一，即為 ErrorBoundary

// 無法捕捉到的錯誤:
// Event handlers(因不是發生在 render 的時候)
// 非同步的程式碼
// Server side rendering
// 錯誤邊界裡的錯誤
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      info: null
    }
  }

  // getDerivedStateFromError:
  // 該生命週期方法會在錯誤被 descendant component 拋出後被呼叫
  // 接收該錯誤為其參數並回傳一個值以更新 state
  // static getDerivedStateFromError(error) {
  //     // 更新 state，如此下次 render 時 React 才能顯示 fallback UI
  //     return { error: error }
  // }

  // componentDidCatch:
  // 該生命週期方法會在錯誤被 descendant component 拋出後被呼叫
  // error: 被拋出的錯誤
  // info: 有 componentStack key 的 object，該 key 包含有那個 component 拋出錯誤的資訊
  componentDidCatch(error, info) {
    // ComponentStack 的範例：
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // 可用來記錄錯誤
    // logComponentStackToMyService(info.componentStack)

    // re-render with error message
    this.setState({
      error: error,
      info: info
    })
  }

  render() {
    if (this.state.info) {
      // when error render 任何自訂的 fallback UI
      return (
        <>
          <h2>ErrorBoundary.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info.componentStack}
          </details>
        </>
      )
    }

    // Normally, just render children
    return this.props.children
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }))
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!')
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>
  }
}

export function BuggyDisplay() {
  return (
    <>
      <hr />
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </>
  )
}
