import React from 'react'

// React Element: 是單純的 object，與瀏覽器的 DOM Element 不同，容易被建立
const time = new Date().toLocaleDateString()
const boolShow = true
// export const ReactElmt = <div>React Element {time}</div>
const ReactElmt = (
  <div>
    {/* {} 內為 JavaScript expression */}
    {
      // JavaScript:
      // true && expression 回傳 expression
      // false && expression 回傳 false
      boolShow && <div>{time}</div>
    }
        React Element test
  </div>
)

export default ReactElmt
