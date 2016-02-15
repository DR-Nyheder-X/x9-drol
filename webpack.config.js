var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  entry: {
    "app": "./src/js/index.js"
  },
  output: {
    path: "dist",
    filename: "[name].js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        include: path.resolve("./"), // necessary to avoid including symlinks pointing out of ./node_modules/
        exclude: path.resolve("./external")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("css?minimize!less")
      },
      {
        test: /\.(svg|png|gif|woff|woff2|eot|ttf)(\?.*)?$/, 
        loader: "file-loader?name=[name].[ext]"
      },
      { 
        test: /\.hbs$/, 
        loader: "handlebars-loader?rootRelative=" + path.join(__dirname, "/src/hbs/partials/")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", { allChunks: true })
  ],
  babel: {
    presets: ["es2015"],
    cacheDirectory: true
  }
};
