// webpack：瀏覽器不支援引用 CommonJS module 或 npm 安裝的模組時，可以此工具打包
// install webpack: npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server
// install babel: npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react 

// 執行方法1:
// 1. running by webpack-dev-server
// npm run webpack-dev by define package.json
// scripts: {"webpack-dev": "webpack-dev-server --devtool eval --progress --colors --content-base build"}
// 2. 不會建置 webpack_bundle.js 及 index.html，應是執行暫時建立目錄 build 中的檔案

// 執行方法2:
// 1. bundle up moudle: npx webpack --config webpack.config.js
// or npm run webpack-build by define package.json
// scripts: {"webpack-build": "webpack --config webpack.config.js"}
// 2. 指令 webpack: 一次性建置
// 因使用 html-webpack-plugin，故建置 webpack_bundle.js 後，會加入及建置 index.html
// 3. running by live server (CORS問題待解決？)

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: '../index.html', // 以此為樣本
    filename: 'index.html', // 產出該檔並包含 bundle 的 <script>
    inject: 'body', // 將 bundle 的 <script> 插入至 body
});

module.exports = {
    // development: 開發模式
    // production: 產品模式，自動壓縮及優化
    mode: 'development',
    // track down errors, map compiled code back to original source code
    devtool: 'inline-source-map',
    // bundle 起點，可多個檔案
    entry: {
        main: './main.js',
        api_query: './api_query.js'
    },
    // 匯出 bundle 檔案
    output: {
        path: path.join(__dirname, '..', 'dist'), // `${__dirname}/dist`
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // 指定轉換的檔案，這裡指所有.js or .mjs
                exclude: /(node_modules|bower_components)/,
                use: { // 指定 loader
                    loader: 'babel-loader', // ES6 和 JSX 等轉為瀏覽器可解析的 ES5
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
    // 放置使用的外掛
    plugins: [HtmlWebpackPluginConfig]
}