const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSsExtractPlugin = require('mini-css-extract-plugin')
    // const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        assetModuleFilename: 'images/[hash][ext][query]',
        chunkFilename: '[name].chunk.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9001,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: [MiniCSsExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.(scss|sass)$/,
            use: [MiniCSsExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        }, {
            test: /\.(jpg|png|svg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[hash:8][query].[ext]'
                }
            }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [{
                loader: 'url-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new MiniCSsExtractPlugin({
            filename: 'css/[name].min.css'
        }),
        new CleanWebpackPlugin(),
        // // 去除无用的样式
        // new PurgecssWebpackPlugin({
        //     paths: glob.sync('./src/css/common.scss', { nodir: true })
        // })
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            // new CssMinimizerPlugin(),
            // new UglifyJsPlugin(),
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         compress: false
            //     }
            // }),
            new TerserPlugin()
        ],

        splitChunks: {
            // include all types of chunks
            chunks: 'initial'
        },

    }
}