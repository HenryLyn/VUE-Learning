const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist/static'),
        publicPath: '/dist/static',
        filename: 'main.js'
    },
    module: {
        rules: [
            // 支持css
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     use: 'css-loader',
                //     fallback: 'style-loader'
                // })
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // 支持vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // loaders: {
                    //     css: ExtractTextPlugin.extract({
                    //         use: 'css-loader',
                    //         fallback: 'style-loader'
                    //     })
                    // }
                    loaders: {
                        css: [
                            process.env.NODE_ENV !== 'production'
                                ? 'vue-style-loader'
                                : MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                    }

                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                // 图片
                test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // limit=10000表示文件小于10000b则使用base64的格式加载，不生成文件
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 重命名提取后的 css 文件
        new MiniCssExtractPlugin({
           filename: 'main.css'
        }),
        // 加载 vue plugin
        new VueLoaderPlugin()
    ]
}

module.exports = config
