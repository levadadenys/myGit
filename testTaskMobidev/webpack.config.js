module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: './public'
        
    },
    devServer: {
        inline: true,
        contentBase: './public',
        port: 8080
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
        ]
    },
    resolve: {
        extensions: ['','.js','.jsx']
    }
};