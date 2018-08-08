import path from 'path'
import HtmlWebpackPlugin  from 'html-webpack-plugin'
import webpack from 'webpack'

let isDev = !(process.env.NODE_ENV === 'production')

let webpackConfig = {
    
    entry: './src/main.js',
    
    output: {
        path: path.resolve(__dirname , 'dist/front'),
        filename: 'bundle.js'
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
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
        })
    ]
}

if(isDev){
    Object.assign(webpackConfig , {
        devtool: 'source-map',
    })
}

export default webpackConfig