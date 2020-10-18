import React from 'react'
import { Route, Link } from "react-router-dom"
import TrTodo from './react.tr.todo.js'

class TbTodo extends React.Component {
  // constructor: 只在 mounting 時執行一次，首先執行的函式。
  // 避免在 constructor 中產生任何 side effect 或 subscription，
  // 如需要請使用在 componentDidMount、componentDidUpdate、componentWillUnmount。
  // side effect: fetch 資料、訂閱、手動改變 DOM。這些影響其他 component 且在 render 期間無法完成。
  constructor(props) {
    super(props) // super: 呼叫父類別的 constructor

    // 為了讓 this 能在 callback 中被使用，這裡的綁定是必要的(綁定傳遞給其他 component 的方法)
    this.handleChange = this.handleChange.bind(this)
    this.todoAdd = this.todoAdd.bind(this)
    this.todoRemove = this.todoRemove.bind(this)
    this.todoComplete = this.todoComplete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this) // 若未加入此段會出現 TypeError: Cannot read property 'refFile' of undefined

    // this.state: 元件的狀態，可想成是資料，之後可在 render 裡取出
    // 需透過 this.setState 更改 this.state，重新 render component
    // this.state 只可在 constructor 初始
    // this.setState 不可在 constructor 裡調用
    this.state = {
      name: '', desp: '', slt: '', completed: false,
      todos: [
        { id: 1, name: 'a', desp: 'adesp', slt: 'aslt', completed: false },
        { id: 2, name: 'b', desp: 'bdesp', slt: 'bslt', completed: true },
      ],
      error: null
    }

    // ref 使用時機:
    // 管理 focus、選擇文字、或影音播放。
    // 觸發即時的動畫。
    // 與第三方 DOM 函式庫整合。

    // ref 使用地方: 關聯 HTML DOM element or class component instance
    // 無法關聯 function component 因為不是 instance

    // React.createRef: 創建 ref，之後用來關聯 HTML DOM element <input name="name" /> or class component instance
    this.refName = React.createRef()

    // Callback Refs: 設定 ref 的另種方式
    // 該 function 將 HTML DOM element 或 class component instance 當作參數
    // this.refName = null
    // this.setRefName = element => {
    //     this.refName = element
    // }

    this.listOption = [
      { value: '', name: '請選擇' },
      { value: 'aslt', name: 'aslt' },
      { value: 'bslt', name: 'bslt' },
    ]
  }

  handleChange(e) {
    // this.setState({
    //     name: e.target.value
    // })
    let strName = e.target.name
    let objVal = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    switch (strName) {
      case 'name':
      case 'desp':
      case 'slt':
      case 'completed':
        // this.setState: 設定 state，會淺層合併你提供的 object 到新的 state
        this.setState({ [strName]: objVal })
        break
      default:
        break
    }
  }

  todoAdd() {
    const { todos, name, desp, slt, completed } = this.state
    const newId = (todos.length === 0 ? 1 : todos[todos.length - 1].id + 1)

    this.setState({
      name: '', desp: '', slt: '', completed: false,
      todos: [
        ...todos,
        { id: newId, name, desp, slt, completed }
      ]
    })

    // React.createRef:
    if (this.refName) {
      this.refName.current.focus()
      console.log('Name:', this.refName.current.value)
    }

    // Callback Refs:
    // if (this.refName)
    //     this.refName.focus()
  }

  todoRemove(id) {
    const { todos } = this.state

    // 使用 filter 把資料移除
    let newTodos = todos.filter((item) => item.id !== id)

    this.setState({
      todos: newTodos
    })
  }

  todoComplete(id) {
    const { todos } = this.state

    // 使用 map 找到要更改的資料，其他不變
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = true
      }
      return todo
    })

    this.setState({
      todos: newTodos
    })
  }

  handleSubmit(e) {
    try {
      e.preventDefault()
      if (this.refFile && this.refFile.files.length > 0) {
        let strfiles = '', strSplit = ''
        for (var file of this.refFile.files) {
          strfiles += strSplit + file.name
          strSplit = ', '
        }
        alert(`Selected file: ${strfiles}`)
      }
    } catch (error) {
      this.setState({ error })
    }
  }

  // render: Class Component 唯一必須實現的方法，負責更新 DOM 來符合 React Component。
  // 若使用 this.setState 改變 state，便會重新執行 render，只要資料改變，畫面就跟著改變。
  // 如需與瀏覽器進行交互，請在 componentDidMount() 或其他生命週期方法中執行你的操作，
  // 保持 render() 為純函式，可以使組件更容易思考。
  render() {
    if (this.state.error) {
      const ErrorCatch = React.lazy(() =>
        import(
          /* webpackChunkName: "react.err.boundary" */
          './react.err.boundary.js'
        )
      )
      return <ErrorCatch error={this.state.error} />
    }

    // 從 state 取出資料
    const { todos, name, desp, slt, completed } = this.state
    // this.props.match.path: 該 component 匹配到的路徑，在此為 /todo，可用此配置第2層 Route and Link
    return (
      <>
        <div className="child-link">
          <ul>
            <li><Link to={`${this.props.match.path}/child/1`}>child1</Link></li>
            <li><Link to={`${this.props.match.path}/child/2`}>child2</Link></li>
          </ul>
        </div>
        <div className="child-router">
          <Route path={`${this.props.match.path}/child/1`} render={() => { return <div>child1 test</div> }} />
          <Route path={`${this.props.match.path}/child/2`} render={() => { return <div>child2 test</div> }} />
        </div>
        <form onSubmit={this.handleSubmit}>
          {/* 訊息 Warning: A component is changing an uncontrolled input of type text to be controlled.
                    React Controlled Component:
                    form element <input>, <textarea>, <select> 可將 value attribute 顯示為 this.state.name
                    並透過 this.handleChange 異動 this.state.name 的方式來達成繫結。
                        
                    React Uncontrolled Component:
                    也可使用 ref 取得 form element <input>, <textarea>, <select>，而不透過 this.state 繫結。
                    defaultValue='...'、defaultChecked attribute: Uncontrolled Componen 的預設值。 */}
          <label>名稱:</label>
          {/* ref: 將 <input name="name" /> 關聯到 this.refName，之後便可在 component 裡透過 this.refName 操作此 DOM */}
          {/* Callback Refs: <input ref={this.setRefName} /> or <input ref={element => this.refName = element} /> */}
          <input name="name" type="text" value={name} onChange={this.handleChange} ref={this.refName} />
          <br />
          <label>描述:</label>
          <textarea name="desp" value={desp} onChange={this.handleChange} />
          <br />
          <label>選取:</label>
          <select name="slt" value={slt} onChange={this.handleChange}>
            {this.listOption.map(op => (<option key={op.value} value={op.value}>{op.name}</option>))}
          </select>
          {' '} {/* 空白隔開 */}
          <label>狀態:</label>
          <input name="completed" type="checkbox" checked={completed} onChange={this.handleChange} />
          {' '}
          <button onClick={this.todoAdd}>Add item</button>
          <br />
          {/* <input type="file" /> 永遠都是 Uncontrolled Component */}
          <input type="file" multiple ref={element => this.refFile = element} />
          <button type="submit">Submit</button>
        </form>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>名稱</th>
              <th>描述</th>
              <th>選取</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              // 訊息 Warning: Each child in a list should have a unique "key" prop.
              // key: 幫助 React 分辨哪些項目被改變、增加或刪除，給予每個 element 一個固定的身份，故需唯一，
              // 這樣在 re-render 時，可依據 key 做比對更新，而不用重建每一 element，以提高效率，
              // 僅提示 React，但不會被傳遞到 TrTodo component。
              // React component 也能是個陣列 element。
              todos.map((todo) => (
                <TrTodo key={todo.id} id={todo.id} name={todo.name} desp={todo.desp} slt={todo.slt}
                  completed={todo.completed} todoRemove={this.todoRemove} todoComplete={this.todoComplete} />
              ))
            }
          </tbody>
        </table>
      </>
    )
  }

  componentDidMount() {
    // current: 取得 HTML DOM element or class component instance
    // React 在 component mount 時將 DOM element 賦值予 current 屬性，並在 unmount 時將它清空回 null。
    // ref 的更新發生在生命週期 componentDidMount 或 componentDidUpdate 之前。
    // focus: focus DOM element <input name="name" />
    if (this.refName)
      this.refName.current.focus()

    // Callback Refs:
    // if (this.refName)
    //     this.refName.focus()
  }
}

export default TbTodo
