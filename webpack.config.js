var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = [
  {
    name: 'browser',
    entry: './app/client/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                },
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: process.env.NODE_ENV
            }
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    watch: NODE_ENV.trim() == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool:  NODE_ENV.trim() == 'development' ? "inline-source-map" : null,
},
{
    name: "server-side rendering",
    entry: "./server.js",
    // entry: ["./server.js", "./app/server/handleRander.js"],
    target: "node",
    externals: [nodeExternals()],
    output: {
        path: __dirname + '/public',
        filename: 'server.js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [ 'isomorphic-style-loader', 'css-loader']
                //   }),
                use: [
                    'isomorphic-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                },
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
      ]
}]

if (NODE_ENV.trim() == 'production') {
    module.exports[0].plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
                warnings    : false,
                drop_console: true,
                unsafe      : true
            }
        })
    );
}
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// const NODE_ENV = process.env.NODE_ENV || 'development';

// module.exports = {
//     entry: './app/client/index.js',
//     output: {
//         path: __dirname + '/public',
//         filename: 'bundle.js'
//     },
//     resolve: {
//         extensions: ['.js', '.jsx']
//     },
//     module: {
//         rules: [
//             {
//                 test: /.(jsx|js)?$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['es2015', 'react']
//                     }
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /\.(png|svg|jpg|gif)$/,
//                 use: [
//                     'file-loader'
//                 ]
//             },
//             {
//                 test: /\.(html)$/,
//                 use: {
//                     loader: 'html-loader',
//                 },
//             }
//         ]
//     },
//     plugins: [
//         new webpack.DefinePlugin({
//             "process.env": {
//                 NODE_ENV: process.env.NODE_ENV
//             }
//         }),
//         new webpack.NoEmitOnErrorsPlugin(),
//         new HtmlWebpackPlugin({
//             template: './app/client/index.html',
//             inject: "body"
//         }),
//     ],
//     watch: NODE_ENV.trim() == 'development',
//     watchOptions: {
//         aggregateTimeout: 100
//     },
//     devtool:  NODE_ENV.trim() == 'development' ? "inline-source-map" : null,
// };

// if (NODE_ENV.trim() == 'production') {
//     module.exports.plugins.push(
//         new webpack.optimize.UglifyJsPlugin({
//             beautify: false,
//             comments: false,
//             compress: {
//                 sequences     : true,
//                 booleans      : true,
//                 loops         : true,
//                 unused      : true,
//                 warnings    : false,
//                 drop_console: true,
//                 unsafe      : true
//             }
//         })
//     );
// }
