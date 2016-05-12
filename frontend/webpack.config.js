/* global require, module, __dirname */

var webpack = require('webpack');

var common = [
    'jquery',
    'react',
    'react-dom',
    'react-redux',
    'redux-thunk',
    'redux',
    'spin'
];

module.exports = {
    context: __dirname + '/scripts',
    // Not sure why uglify "sourceMap" doesn't work.
    devtool: 'source-map',
    entry: {
        'todo': './todo/index.js',
        'todo.min': './todo/index.js',
        'common': common,
        'common.min': common
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
