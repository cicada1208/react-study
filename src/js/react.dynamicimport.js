import React, { Suspense } from 'react'

// Code Splitting Dynamic Imports:
// Dynamically load modules.
// Calls to import() are treated as split points, meaning the requested module
// and its children are split out into a separate chunk.
// webpackChunkName: A name for the new chunk.
// importing a ES6 module:
import(
    /* webpackChunkName: "webpack.es6.utils" */
    './webpack.es6.utils.js'
).then(module => {
    const module_def = module.default;
    console.log('Code Splitting Dynamic Imports (ES6):', module_def.name, module.utils_x)
})
// importing a CommonJS module:
import(
    /* webpackChunkName: "webpack.cjs.utils" */
    './webpack.cjs.utils.js'
).then(({ name, x, default: module }) => {
    console.log('Code Splitting Dynamic Imports (CommonJS):', module.name, name, x)
})


// React.lazy: dynamic import component
// request module: react.clock.js 需是 default export
// React.lazy 和 Suspense 還無法在 server-side render 使用。
export const ClockLazyComp = React.lazy(() =>
    import(
        /* webpackChunkName: "react.clock.defexp" */
        './react.clock.defexp.js'
    )
)
// Lazy Component: 應在 suspense component 內 render，
// 同時可在等待 lazy component 載入時，顯示 fallback prop(可為 React element 像是載入中)。
// Suspense Component: 可包覆多個 lazy component。
export function ClockSuspComp() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClockLazyComp />
        </Suspense>
    )
}
