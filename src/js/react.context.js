import React, { useContext } from 'react'

// Context: 提供 component 間共享值(全局)方式，
// 讓我們無須明確地傳遍每一個組件，就能將值深入傳遞進組件樹。

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
}

// React.createContext: 建立 Context
// 組件樹中若未提供 Context.Provider 才讀取預設值
const ThemeContext = React.createContext({
    // 預設值
    theme: themes.dark,
    toggleTheme: () => { },
})
// ThemeContext.displayName = 'MyThemeContext' // DevTools 中以此名稱顯示，例：MyThemeContext.Provider

const NameContext = React.createContext('Toggle Theme0')


function ThemeTogglerButton() {
    // Context Hook: 讀取 context 及訂閱其變更，相等於 class 中的 static contextType = ThemeContext 或 <ThemeContext.Consumer>。
    // 當上層最近的 ThemeContext.Provider 更新時，該 hook 會觸發重新 render，
    // 即便 ancestor 使用 React.memo 或 shouldComponentUpdate，
    // 重新 render 仍然從使用 useContext 的 component 本身開始
    // (呼叫 useContext 的 component 總在 context 值更新時重新 render)。
    const ThemeContextValue = useContext(ThemeContext)

    return (
        // Context.Consumer: 讀取值，會往上找到組件樹中最近的 Context.Provider，並返回 React Element
        // <ThemeContext.Consumer>
        //     {({ theme, toggleTheme }) => (
        //         <NameContext.Consumer>
        //             {name => (
        //                 <button onClick={toggleTheme}
        //                     style={{ backgroundColor: theme.background }}>
        //                     {name}
        //                 </button>
        //             )}
        //         </NameContext.Consumer>
        //     )}
        // </ThemeContext.Consumer>

        // Context Hook:
        <NameContext.Consumer>
            {name => (
                <button onClick={ThemeContextValue.toggleTheme}
                    style={{ backgroundColor: ThemeContextValue.theme.background }}>
                    {name}
                </button>
            )}
        </NameContext.Consumer>
    )
}

class ThemeTogglerButtonCls extends React.Component {
    // contextType: 讀取值，會往上找到組件樹中最近的 Context.Provider
    // 指定 contextType 後，以 this.context 讀取值，可在任何生命週期中訪問
    static contextType = ThemeContext
    render() {
        // this.context.theme = themes.dark // 更改 ThemeContext 後並不會觸發 render
        return (
            <NameContext.Consumer>
                {name => (
                    <button onClick={this.context.toggleTheme}
                        style={{ backgroundColor: this.context.theme.background }}>
                        {name}
                    </button>
                )}
            </NameContext.Consumer>
        )
    }
}
// ThemeTogglerButtonCls.contextType = ThemeContext

function ThemeTogglerContent() {
    return (
        <>
            <NameContext.Provider value='Toggle Theme1'>
                <ThemeTogglerButton />
            </NameContext.Provider>
            <NameContext.Provider value='Toggle Theme2'>
                <ThemeTogglerButtonCls />
            </NameContext.Provider>
        </>
    )
}

export default class ThemeToggler extends React.Component {
    constructor(props) {
        super(props)

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }))
        }

        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        }
    }

    render() {
        return (
            // Context.Provider: 提供值，以 this.state 傳入
            // Context.Provider 與 Context.Consumer 都不受制於 shouldComponentUpdate
            <ThemeContext.Provider value={this.state}>
                <ThemeTogglerContent />
            </ThemeContext.Provider>
        )
    }
}
