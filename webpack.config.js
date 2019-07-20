const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const package = require("./package.json");

module.exports = function(env, argv) {
  const mode = argv.mode || "development";

  const BASE_CONFIG = {
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: package.description,
        mode: mode,
        template: path.resolve(__dirname, "public", "index.html"),
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      new CopyPlugin([
        { from: path.resolve(__dirname, "public") },
        {
          from: path.resolve(__dirname, "src", "components", "templates.xml")
        }
      ])
    ]
  };

  const DEV_CONFIG = {
    mode: "development",
    watch: true,
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 9000,
      historyApiFallback: true,
      stats: "minimal"
    }
  };

  const PROD_CONFIG = {
    mode: "production"
  };
  const EXTRA_CONFIG = mode === "development" ? DEV_CONFIG : PROD_CONFIG;
  return Object.assign({}, BASE_CONFIG, EXTRA_CONFIG);
};
