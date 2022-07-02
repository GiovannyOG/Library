import {dirname, resolve} from "path";
import {fileURLToPath} from 'url';
import common from "./webpack.common.js";
import {merge} from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader",
          "css-loader"  
        ]
      }
    ]
  }
});
