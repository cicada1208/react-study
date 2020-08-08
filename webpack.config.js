// webpack: 瀏覽器不支援引用 CommonJS module 或 npm 安裝的模組時，可以此工具打包
// npm install --save-dev webpack webpack-cli

// cross-env: 定義環境參數 process.env.NODE_ENV，使其可在 webpack.config 中使用
// process.env.NODE_ENV 預設即可在 bundle.js 中使用，透過參數 mode 設置
// npm install --save-dev cross-env

// webpack-dev-server: A development server that provides live reloading.
// This should be used for development only.
// npm install --save-dev webpack-dev-server

// webpack-merge: provides a merge function that concatenates arrays
// and merges objects creating a new object.
// npm install --save-dev webpack-merge

// babel: npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
// import css: npm install --save-dev style-loader css-loader sass-loader node-sass
// import image, font...: npm install --save-dev file-loader url-loader
// import JSON: 預設支持
// import csv: npm install --save-dev csv-loader
// import xml: npm install --save-dev xml-loader

// 執行方法1:
// 1. running by webpack-dev-server:
// npm run webpack-dev-build by package.json
// scripts: {"webpack-dev-build": "webpack-dev-server --config webpack.config.dev.js --progress --color"}
// 2. webpack-dev-server doesn't write any output files after compiling.
// Instead, it keeps bundle files in memory
// and serves them as if they were real files mounted at the server's root path.
// 3. debug:
// browser chrome devtool -> Sources page

// 執行方法2:
// 1. build:
// npx webpack --config webpack.config.prod.js
// or npm run webpack-prod-build by package.json
// scripts: {"webpack-prod-build": "webpack --config webpack.config.prod.js"}
// after building it will create webpack_bundle.js, index.html.
// 2. running by http-server:
// npm install --save-dev http-server
// there is CORS problem?
// 3. debug:
// browser chrome devtool -> Sources page

console.log("process.env.NODE_ENV(webpack.config): " + process.env.NODE_ENV);
const boolModeDev = process.env.NODE_ENV !== 'production';
const path = require('path');

// clean-webpack-plugin: A webpack plugin to remove/clean your build folder(s).
// clean the /dist folder before each build, so that only used files will be generated.
// npm install --save-dev clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// html-webpack-plugin: Plugin that simplifies creation of HTML files to serve your bundles.
// npm install --save-dev html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html', // 以此為樣本
    filename: 'index.html', // 產出該檔並包含 bundle 的 <script>
    inject: 'body', // 將 bundle 的 <script> 插入至 body
    // minify: {
    //     collapseBooleanAttributes: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true,
    //     removeComments: true,
    //     removeEmptyAttributes: true,
    //     removeRedundantAttributes: true,
    //     removeScriptTypeAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     sortAttributes: true,
    //     useShortDoctype: true
    // },
    minify: 'auto',
});

// terser-webpack-plugin: minify your JavaScript.
// npm install --save-dev terser-webpack-plugin
const TerserWebpackPlugin = require('terser-webpack-plugin');
const TerserWebpackPluginConfig = new TerserWebpackPlugin({
    test: /\.m?js(\?.*)?$/i,
    exclude: /(node_modules|bower_components)/
})

// mini-css-extract-plugin: This plugin extracts CSS into separate files. 
// It creates a CSS file per JS file which contains CSS.
// It supports On-Demand-Loading of CSS and SourceMaps.
// npm install --save-dev mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: boolModeDev ? './css/[name].css' : './css/[name].[contenthash].css',
    // chunkFilename: boolModeDev ? '[id].css' : '[id].[contenthash].css',
    // ignoreOrder: false, // Enable to remove warnings about conflicting order
})

// optimize-css-assets-webpack-plugin: A Webpack plugin to optimize \ minimize CSS assets.
// npm install --save-dev optimize-css-assets-webpack-plugin
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // 'development': 開發模式
    // 'production': 產品模式，自動壓縮及優化
    mode: boolModeDev ? 'development' : 'production',
    // devtool: track down errors, map compiled code back to original source code
    // 'source-map': most detailed at the expense of build speed.(ideal for production)
    // "eval": has the best performance, but doesn't assist you for transpiled code.(ideal for development)
    // Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.
    devtool: 'source-map',
    entry: { // bundle 起點，可多個檔案
        webpack_es6: './src/js/webpack.es6.js',
        webpack_cjs: './src/js/webpack.cjs.js',
        react_ex: './src/js/react.ex.js',
        api_query: './src/js/api.query.js'
    },
    output: { // 匯出 bundle 檔案
        // [contenthash]: 如果內容改變檔名亦隨之變動，可在 browsers caching 機制下重載檔案
        filename: boolModeDev ? './js/[name].js' : './js/[name].[contenthash].js',
        // path: The output directory as an absolute path.
        path: path.resolve(__dirname, 'dist'),
        // path: path.resolve(__dirname, 'dist/assets'),
        // // publicPath: This option specifies the public URL of the output directory when referenced in a browser.
        // // A relative URL is resolved relative to the HTML page
        // publicPath: '/assets/',
    },
    optimization: {
        // runtimeChunk: split runtime code into a separate chunk.
        runtimeChunk: 'single',
        // moduleIds: Tells webpack which algorithm to use when choosing module ids.
        moduleIds: 'hashed',
        // SplitChunksPlugin: 將各個 entry 重複引用的模組，獨立出一個 chunk，避免重複 bundle
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                // vendor: {
                //     // This might result in a large chunk containing all external packages.
                //     // It is recommended to only include your core frameworks and utilities
                //     // and dynamically load the rest of the dependencies.
                //     test: /[\\/]node_modules[\\/]/,
                //     name: 'vendors',
                //     chunks: 'all',
                // },
                // styles: {
                //     // the CSS can be extracted in one CSS file
                //     test: /\.(sa|sc|c)ss$/i, // /\.css$/i
                //     name: 'styles',
                //     chunks: 'all',
                //     enforce: true,
                // },
            }
        },
        // minimize and minimizer for production
        minimize: boolModeDev ? false : true,
        minimizer: [TerserWebpackPluginConfig, new OptimizeCSSAssetsWebpackPlugin({})]
    },
    module: {
        rules: [
            {
                // 篩選條件: test, include, exclude
                test: /\.m?jsx?$/, // 指定轉換的檔案，.js or .mjs or jsx
                // exclude: takes preferrence over test and include
                exclude: /(node_modules|bower_components)/,
                // use: 使用 loader
                use: {
                    // Loads ES2015+ code(ES6) and transpiles to ES5 using Babel
                    loader: 'babel-loader',
                    options: { // '@babel/preset-react': 支援JSX
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i, // /\.css$/i
                // loader 需按順序擺放，由後往前讀取
                use: [
                    // // style-loader: Creates `style` nodes from JS strings.
                    // // Inject CSS into the DOM.
                    // 'style-loader',
                    {
                        // mini-css-extract-plugin should be used only on production builds
                        // without style-loader in the loaders chain, especially if you 
                        // want to have HMR in development.
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: boolModeDev,
                        },
                    },
                    // css-loader: Translates CSS into CommonJS.
                    // interprets @import and url() like import/require() and will resolve them.
                    'css-loader',
                    // sass-loader: Compiles Sass to CSS
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [
                    {
                        // The file-loader resolves import/require() on a file into a url 
                        // and emits the file into the output directory.
                        loader: 'file-loader',
                        options: {
                            // name: default is [contenthash].[ext]
                            // By default the filename of the resulting file
                            // is the hash of the file's contents with the original extension of
                            // the required resource.
                            name: boolModeDev ? '[name].[ext]' : '[name].[contenthash].[ext]', // '[folder][name].[ext]'
                            // outputPath: Specify a filesystem path where the target file(s) will be placed.
                            outputPath: './img',
                            publicPath: '../img/'
                        }
                    },
                    // {
                    //     // A loader for webpack which transforms files into base64 URIs.
                    //     // 可壓縮檔案 for production
                    //     loader: 'url-loader',
                    //     options: {
                    //         // limit: Boolean|Number|String Default: undefined (no limit)
                    //         // If the file size is equal or greater than the limit file-loader
                    //         // will be used (by default) and all query parameters are passed to it.
                    //         limit: true,
                    //         name: '[name].[ext]'
                    //     }
                    // }
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
    plugins: [
        new CleanWebpackPlugin(),
        HtmlWebpackPluginConfig,
        MiniCssExtractPluginConfig
    ],
    devServer: { // webpack-dev-server setting // for development
        // contentBase: Tell the server where to serve content from.
        // This is only necessary if you want to serve static files.
        // It is recommended to use an absolute path.
        // devServer.publicPath will be used to determine where
        // the bundles should be served from, and takes precedence.
        contentBase: path.resolve(__dirname, 'src'),
        // port: Specify a port number to listen for requests on
        port: 8008,
        // inline: A script will be inserted in your bundle to take care of live reloading,
        // and build messages will appear in the browser console.
        inline: true,
        // open: Tells dev-server to open the browser after server had been started.
        // set true to default browser, or specify 'Google Chrome'
        // (The browser application name is platform dependent.)
        open: true,
        // // headers: Adds headers to all responses
        // headers: {
        //     'X-Custom-Foo': 'bar'
        // }
    }
};
