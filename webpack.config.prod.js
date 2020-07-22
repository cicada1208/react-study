const { merge } = require('webpack-merge');
const common = require('./webpack.config.com.js');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const TerserWebpackPluginConfig = new TerserWebpackPlugin({
    test: /\.m?js(\?.*)?$/i,
    exclude: /(node_modules|bower_components)/
})

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [TerserWebpackPluginConfig]
    }
});
