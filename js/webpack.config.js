// install webpack: npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server
// install babel: npm install --save-dev babel-core babel-eslint babel-loader babel-preset-es2015 babel-preset-react
// npm install -D babel-loader @babel/core @babel/preset-env babel-preset-es2015
// bundle up moudle: npx webpack --config webpack.config.js

// 將 bundle 好的 <script> 插入到 body
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: '../index.html',
    filename: 'index.html',
    inject: 'body',
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
                        presets: ['@babel/preset-env']
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