// install webpack: npm install --save-dev webpack webpack-cli
// bundle up moudle: npx webpack --config webpack.config.js

module.exports = {
    // mode: 'development' 開發模式
    // mode: 'production' 產品模式，自動壓縮及優化
    mode: 'development',
    entry: './main.js',
    output: {
        path: __dirname,
        filename: 'webpack_bundle.js'
    }
}