var webpack = require('webpack');
var assign = require('lodash').assign;
var path = require('path');


module.exports = function(options) {
    var conf = {
        entry: {
            src: './src/entry.js',
            test: './test/tests.js'
        },
        resolve: {
            root: [
                path.resolve("./components"),
                path.resolve("./assets"),
                path.resolve("./test"),
                path.resolve("./views"),
                path.resolve("./styles"),
                path.resolve("./test")

            ],
            extensions: ["", ".js", ".jsx", ".json", ".scss"]
        },
        output: {
            path: process.cwd(),
            filename: './[name]/bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ["style", "css?sourceMap", "sass?sourceMap"]
                },
                { test: /\.css$/, loader: 'style!css' },
                { test: /\.srt/, loader: 'raw' },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: ['babel'],
                    query: {
                        presets: [
                            require.resolve('babel-preset-es2015'),
                            require.resolve('babel-preset-stage-0'),
                            require.resolve('babel-preset-react')
                        ]
                    }
                }
            ]
        },
        resolveLoader: {
              modulesDirectories: [
                  path.join(__dirname, '../', 'node_modules'),
                  path.join(process.cwd(), 'node_modules')
              ]
        },
        plugins: [
            // new webpack.ProgressPlugin(function handler(percentage, msg) {
            //     console.log(percentage * 100.toString().toFixed(2) + '% ' + msg);
            // })
        ]
    };
    if(options.minimize) {
        conf.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            })
            // new webpack.optimize.DedupePlugin()
        );
        conf.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.NoErrorsPlugin()
        );
    }

    conf = assign(conf, options);
    return conf;
};
