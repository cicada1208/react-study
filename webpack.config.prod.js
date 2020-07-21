const { merge } = require('webpack-merge');
const common = require('./webpack.config.com.js');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                test: /\.m?js(\?.*)?$/i,
                exclude: /(node_modules|bower_components)/
            })
        ]
    }
});
