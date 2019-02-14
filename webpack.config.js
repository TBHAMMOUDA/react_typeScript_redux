const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './index.tsx'
    ],

    output: {
        filename: '[hash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },

    devtool: 'source-map',
    context: resolve(__dirname, 'src'),

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{ loader: 'awesome-typescript-loader' }],
                exclude: resolve(__dirname, 'node_modules'),
                include: resolve(__dirname, "src")
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        // options: {
                        //     modules: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        // }
                    }, {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },

    plugins: [
        new CheckerPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            chunksSortMode: 'dependency',
            template: resolve(__dirname, './src/index.html')
        }),
    ],

    devServer: {
        contentBase: __dirname + '/src',
        historyApiFallback: true,
        open: true,
        hot: true,
    },
}