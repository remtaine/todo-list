const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/javascript/main.js',
        // header: './src/javascript/header.js',
        // footer: './src/javascript/footer.js',
        // nav: './src/javascript/nav.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "To-Do List",
            template: './src/html/main.html',
            filename: 'index.html',
            favicon: './src/images/favicon.png',
            chunks: ['main'] //, 'header', 'footer', 'nav']
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
    rules: [
        {
            test: /\.scss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'images/[name][ext]',
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
    ]
    }
};