module.exports = {
    entry: './src/App.jsx',
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
                test: /\.jsx?/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader','babel-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    resolve: {
        extensions: ['','.js','.jsx']
    }
};