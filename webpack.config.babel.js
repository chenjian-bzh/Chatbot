import path from 'path'
import HtmlWebpackPlugin  from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import webpack from 'webpack'

let isDev = !(process.env.NODE_ENV === 'production')

let webpackConfig = {

    mode: isDev ? 'development': 'production',
    
    entry: './src/main.js',
    
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'bundle.js',
        //publicPath: 'http://localhost:8080'
    },

    devServer: {
        contentBase: ['dist'],
        
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [
                    path.resolve(__dirname, "src")
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    isDev ? 'style-loader':MiniCssExtractPlugin.loader,  //生产环境将css文件抽离
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                include: [
                    path.resolve(__dirname, "src")
                ]
            },

            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 8100
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin ({template: 'index.html'}) , 

        new webpack.DefinePlugin({
            'process.env' : {NODE_ENV : JSON.stringify(process.env.NODE_ENV)}
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        new CleanWebpackPlugin(['dist']),

        new CopyWebpackPlugin([{from: 'src/assets' , to: 'assets'}])
    ]
}

if(isDev){
    Object.assign(webpackConfig , {
        devtool: 'source-map',
    })
}

export default webpackConfig