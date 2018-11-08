const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 清空基本配置的插件列表
webpackBaseConfig.plugins = []

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: './static/',
        // 将入口文件重命名为带有20位hash值的唯一文件
        filename: '[name].[hash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 提取css，并重命名为带有20位hash值的唯一文件
            filename: '[name].[hash].css',
            allChunks: true
        }),
        // 定义当前node 为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩 js
        // new webpack.optimize.minimize({
        //     compress: {
        //         warnings: fadistlse
        //     }
        // }),
        // 提取模板， 并保存入口html文件
        new HtmlwebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        }),
        // 加载 vue plugin
        new VueLoaderPlugin()
    ],
    // 压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
})
