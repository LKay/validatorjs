const webpack = require("webpack")

module.exports = {
    plugins : [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ],
    entry : {
        es: "./src/lang/es.ts"
    },
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
            { test : /\.ts$/, exclude: /node_modules|lib/, loader: "babel?presets[]=es2015!ts" }
        ]
    }
}