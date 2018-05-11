const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let settings = require('./settings.' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'staging'));

let plugins = [];

plugins.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    '_': 'underscore',
    'moment': 'moment'
}));

plugins.push(new CopyWebpackPlugin([{
    from: './src/assets',
    to: 'assets'
}]));

plugins.push(new webpack.DefinePlugin(settings));

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

let config = {
    entry: {
        index: './src/index',
        vendor: './src/vendor'
    },
    plugins: plugins
};

if (process.env.NODE_ENV === 'staging') {
    config.devtool = 'source-map';
}

module.exports = Object.assign(require('./webpack.base.config'), config);

