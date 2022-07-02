const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// Delete files in case of double bundle
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Estract css from js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// Minimaize css files
const TerserPlugin = require("terser-webpack-plugin");
// Minimaize js files
var HtmlWebpackPlugin = require("html-webpack-plugin");
// HTML bundler

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "main.[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin() // Delete dist before recreate
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          //"sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
