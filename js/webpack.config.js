// install webpack: npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server
// install babel: npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react 

// 執行方法1:
// 1. bundle up moudle: npx webpack --config webpack.config.js
// 2. using html-webpack-plugin to add webpack_bundle.js to index.html
// and create index.html automatically
// 3. running by live server

// 執行方法2:
// 1. running by webpack-dev-server
// using package.json scripts: {"webpack-dev": "webpack-dev-server --devtool eval --progress --colors --content-base build"}
// 2. 不會重建 webpack_bundle.js 及建立 index.html，應是執行暫時建立的目錄 build 中的檔案

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: '../index.html', // 以此為樣本
    filename: 'index.html', // 產出該檔並包含 bundle 的 <script>
    inject: 'body', // 將 bundle 的 <script> 插入到 body
});

module.exports = {
    // mode: 'development' 開發模式
    // mode: 'production' 產品模式，自動壓縮及優化
    mode: 'development',
    // bundle 起點，可以多個檔案
    entry: './main.js',
    // 匯出 bundle 的檔案
    output: {
        path: __dirname,
        filename: 'webpack_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // 所有.js相關檔案
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader', // ES6 和 JSX 轉為瀏覽器可解析的 JavaScript 
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    devServer: { // webpack-dev-server 設定
        inline: true,
        port: 8008,
    },
    // plugins: 放置使用的外掛
    plugins: [HtmlWebpackPluginConfig]
}