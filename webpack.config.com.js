// webpack: 瀏覽器不支援引用 CommonJS module 或 npm 安裝的模組時，可以此工具打包
// npm install --save-dev webpack webpack-cli

// webpack-dev-server: A development server that provides live reloading.
// This should be used for development only.
// npm install --save-dev webpack-dev-server

// html-webpack-plugin: Plugin that simplifies creation of HTML files to serve your bundles.
// npm install --save-dev html-webpack-plugin

// clean-webpack-plugin: A webpack plugin to remove/clean your build folder(s).
// clean the /dist folder before each build, so that only used files will be generated.
// npm install --save-dev clean-webpack-plugin

// webpack-merge: provides a merge function that concatenates arrays
// and merges objects creating a new object.
// npm install --save-dev webpack-merge

// terser-webpack-plugin: minify your JavaScript.
// npm install --save-dev terser-webpack-plugin

// babel: npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
// import css: npm install --save-dev style-loader css-loader
// import image, font: npm install --save-dev file-loader
// import JSON: 預設支持
// import csv: npm install --save-dev csv-loader
// import xml: npm install --save-dev xml-loader

// 執行方法1:
// 1. running by webpack-dev-server
// npm run webpack-dev by define package.json
// scripts: {"webpack-dev": "webpack-dev-server --devtool eval --progress --colors --content-base build"}
// 2. webpack-dev-server doesn't write any output files after compiling. 
// Instead, it keeps bundle files in memory 
// and serves them as if they were real files mounted at the server's root path.

// 執行方法2:
// 1. build: npx webpack --config webpack.config.js
// or npm run webpack-build by define package.json
// scripts: {"webpack-build": "webpack --config webpack.config.js"}
// 2. 指令 webpack: 一次性建置，產生 webpack_bundle.js, index.html
// 3. running by live server (CORS問題待解決？)

const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html', // 以此為樣本
    filename: 'index.html', // 產出該檔並包含 bundle 的 <script>
    inject: 'body', // 將 bundle 的 <script> 插入至 body
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    // // 'development': 開發模式
    // // 'production': 產品模式，自動壓縮及優化
    // mode: 'development',
    // // devtool: track down errors, map compiled code back to original source code
    // // 'source-map': most detailed at the expense of build speed.(ideal for production)
    // // "eval": has the best performance, but doesn't assist you for transpiled code.(ideal for development)
    // // Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.
    // devtool: 'source-map',
    entry: { // bundle 起點，可多個檔案
        main: './src/js/main.js',
        api_query: './src/js/api_query.js'
    },
    output: { // 匯出 bundle 檔案
        // path: must be an absolute path
        path: Path.resolve(__dirname, 'dist'),
        // [contenthash]: 如果內容改變檔名亦隨之變動，可在 browsers caching 機制下重載檔案
        filename: '[name].[contenthash].js' // '[name].bundle.js'
    },
    // devServer: { // webpack-dev-server setting
    //     // contentBase: Tell the server where to serve content from.
    //     // This is only necessary if you want to serve static files.
    //     // devServer.publicPath will be used to determine where
    //     // the bundles should be served from, and takes precedence.
    //     // It is recommended to use an absolute path.
    //     contentBase: Path.resolve(__dirname, 'dist'),
    //     // port: Specify a port number to listen for requests on
    //     port: 8008,
    //     // inline: A script will be inserted in your bundle to take care of live reloading,
    //     // and build messages will appear in the browser console.
    //     inline: true,
    //     // open: Tells dev-server to open the browser after server had been started.
    //     // set true to default browser, or specify 'Google Chrome'
    //     // (The browser application name is platform dependent.)
    //     open: true,
    //     // // headers: Adds headers to all responses
    //     // headers: {
    //     //     'X-Custom-Foo': 'bar'
    //     // }
    // },
    optimization: {
        // runtimeChunk: split runtime code into a separate chunk.
        runtimeChunk: 'single',
        // moduleIds: Tells webpack which algorithm to use when choosing module ids.
        moduleIds: 'hashed',
        // SplitChunksPlugin: 將各個 entry 重複引用的模組，獨立出一個 chunk，避免重複 bundle
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    // This might result in a large chunk containing all external packages.
                    // It is recommended to only include your core frameworks and utilities
                    // and dynamically load the rest of the dependencies.
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        },
        // minimize: true,
        // minimizer: [
        //     new TerserWebpackPlugin({
        //         test: /\.m?js(\?.*)?$/i,
        //         exclude: /(node_modules|bower_components)/
        //     })
        // ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // 指定轉換的檔案，這裡指所有.js or .mjs
                // exclude: takes preferrence over test and include
                exclude: /(node_modules|bower_components)/,
                use: { // 指定 loader
                    loader: 'babel-loader', // ES6 和 JSX 等轉為瀏覽器可解析的 ES5
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader',
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader',
                ]
            }
        ]
    },
    // plugins: 放置使用的外掛
    plugins: [new CleanWebpackPlugin(), HtmlWebpackPluginConfig]
};