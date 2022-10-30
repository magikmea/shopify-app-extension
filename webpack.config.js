const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./extensions/ikuzo-wallet-extension/crypto-wallet.js",
  output: {
    path: path.resolve(__dirname, "./extensions/ikuzo-wallet-extension/assets"),
    filename: "crypto-wallet.min.js",
    // publicPath,
  },
  plugins: [
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
  ],
  mode: "production",
 /*  module: {},
  resolve: {
    fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "util": false,
        "assert": false,
        "os": false,
        "browser": false,
        "url": false,
        buffer: require.resolve('buffer/')
      } 
  } */
};