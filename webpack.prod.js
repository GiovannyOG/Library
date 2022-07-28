import {dirname, resolve} from "path";
import common from "./webpack.common.js";
import {merge} from "webpack-merge";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
// Delete files in case of double bundle
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// Estract css from js
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
// Minimaize css files
import TerserPlugin from "terser-webpack-plugin";
// Minimaize js files
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
// HTML bundler

const __dirname = dirname(fileURLToPath(import.meta.url))

export default merge(common, {
  mode: "production",

  output: {
    filename: "main.[contentHash].bundle.js",
    path: resolve(__dirname, "dist")
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
