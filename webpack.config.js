const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        master: "./src/config/js/jsmaster.js",
        treatment: "./src/config/js/jstreatment.js"
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    mode: "development",
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist/assets/js'),
        sourceMapFilename: "./[name].js.map"
    },
    devtool: "source-map",
    externals: {
        jquery: 'jQuery'
    }
};