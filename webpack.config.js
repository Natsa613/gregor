const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        publicPath:'/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: "raw-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml|mp3)$/i,
                loader: "file-loader",
                options:{
                    outputPath:"assets/",
                    name:"[name].[ext]"
                }
            }
        ]
    },
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist'),
        },
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html', 
        })
    ],
    mode:'development'
};