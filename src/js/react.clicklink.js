import React from 'react'

class BtnClick extends React.Component {
  render() {
    let props = this.props;
    return (
      <button {...props} />
    )
  }
}

export default function ClickLink() {
  function handleClick(e) {
    e.preventDefault() // 在 React 中使用，以避免瀏覽器預設行為(換頁)
    window.alert('The link was clicked.')
  }

  // 事件名稱: 在 React 是 camelCase；在 HTML DOM 是小寫。
  // 事件的值: 在 JSX 是 function；在 HTML DOM 是 string。
  // HTML範例: <button onclick="handleClick()">
  return (
    // HTML範例: <a href="#" onclick="window.alert('The link was clicked.') return false"></a>
    <>
      <a href="#" onClick={handleClick}>Anchor Click</a>
      <br />
      <BtnClick onClick={handleClick} >Button Click</BtnClick>
    </>
  )
}
