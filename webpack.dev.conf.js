const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        title : "Validator JS - DEV",
        cache : true
    })
]

module.exports = {
    plugins,
    entry : [
        "webpack-dev-server/client?http://localhost:8080/",
        "webpack/hot/only-dev-server",
        path.join(__dirname, "dev/index.ts")
    ],
    output : {
        path          : path.join(__dirname, "build"),
        publicPath    : "http://localhost:8080/",
        filename      : "bundle.js"
    },

    devtool : "eval-source-maps",
    devServer : {
        contentBase        : path.join(__dirname, "build"),
        port               : 8080,
        hot                : true
    },

    resolve : {
        extensions : ["", ".js", ".ts"]
    },

    module : {
        loaders : [
            { test : /\.ts$/, exclude: /node_modules/, loader: "ts" }
        ]
    }
}