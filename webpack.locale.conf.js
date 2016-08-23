'use strict'

const webpack = require("webpack")
const glob = require("glob")

const entry = glob.sync("./src/lang/*.ts", { ignore : ["./src/lang/en.ts"] }).reduce((r, path) => {
    r[path.match(/\/([a-z]+)\.ts$/i)[1]] = path
    return r
}, {})

module.exports = {
    plugins : [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ],
    entry,
    output : {
        path          : "dist/lang",
        filename      : "[name].js",
        library       : ["Validator", "Messages", "messages", "[name]"],
        libraryOutput : "var"

    },

    resolve : {
        extensions : ["", ".js", ".ts"]
    },

    module : {
        loaders : [
            { test : /\.ts$/, exclude: /node_modules|lib/, loaders: ["babel", "awesome-typescript"] }
        ]
    }
}