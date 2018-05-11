const webpack = require('webpack');
let settings = require('./settings.test');

let config = {
    entry: {
        test: './app/test'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            '_': 'underscore',
            'moment': 'moment',
            'Highcharts': 'highcharts',
            'io': 'socket.io-client'
        }),
        new webpack.DefinePlugin(settings),
    ]
};

module.exports = Object.assign(require('./webpack.base.config'), config);

