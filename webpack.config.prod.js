console.log("process.env.NODE_ENV(webpack.config.prod): " + process.env.NODE_ENV);

const { merge } = require('webpack-merge');
const common = require('./webpack.config.com.js');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const TerserWebpackPluginConfig = new TerserWebpackPlugin({
  test: /\.m?js(\?.*)?$/i,
  exclude: /(node_modules|bower_components)/
})

const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [TerserWebpackPluginConfig, new OptimizeCSSAssetsWebpackPlugin({})]
  }
});
