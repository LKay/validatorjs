const webpack = require("webpack")

const plugins = [
    new webpack.ProvidePlugin({
        "Promise" : "exports?global.Promise!es6-promise"
    })
]

module.exports = {
    plugins,
    entry : "./src/index.ts",
    output : {
        path          : "dist",
        filename      : "validatorjs.js",
        library       : "Validator",
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