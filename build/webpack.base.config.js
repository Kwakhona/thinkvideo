let path = require("path");

module.exports = {
    output: {
        path: path.join(__dirname, '/..', '/dist/'),
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'ng-annotate-loader'
                }, {
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(scss|css)/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.eot(\?.*)?$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|ttf|svg)(\?.*)?$/,
                use: 'url-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader'
            },
        ],
    },
};

