const webpack = require("webpack")

module.exports = {
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
            { test : /\.ts$/, exclude: /node_modules|lib/, loader: "babel?presets[]=es2015&plugins[]=es6-promise!ts" }
        ]
    }
}